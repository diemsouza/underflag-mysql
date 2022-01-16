import { Underflag, isOn } from 'underflag';
import { MysqlDataProvider } from '../../src/providers';
import { createConnection } from 'mysql2';
import config from './config.json';

/**
 * create mysql table
CREATE TABLE `features` (
  `id` int NOT NULL AUTO_INCREMENT,
  `key` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `value` varchar(1000) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `features_key_IDX` (`key`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
 */

const print = async (underflag: Underflag, key: string) => {
    const data = await underflag.get(key);
    return {
        key,
        status: isOn(data) ? 'on' : 'off',
        value: data && data.value,
        origin: data && data.origin
    };
};

(async () => {
    // config data provider
    const connection = createConnection({
        host: config.host,
        user: config.user,
        password: config.pass,
        database: config.database
    });
    connection.connect();

    // use data privider
    const dataProvider = new MysqlDataProvider({ connection });
    const underflag = new Underflag({ dataProvider });

    try {
        // check feature flags
        const list: any[] = [];
        for (const key of config.features) {
            list.push(await print(underflag, key));
        }
        list.push(await print(underflag, 'other'));
        console.table(list);
    } finally {
        await connection.end();
    }
})();