
# Mysql Provider

This is a Mysql provider for underflag (feature flag/feature toggle)

> ⚠️ This repository has been **archived** for visual organization on GitHub.  
> It is part of the [`underflag`](https://github.com/diemsouza/underflag) monorepo, where it's maintained and updated.  
> The package is still available on [NPM](https://www.npmjs.com/package/underflag-mysql).

## Install

Using npm:

```bash
npm install underflag-mysql
```

Using yarn:

```bash
yarn add underflag-mysql
```

## How to use

Import the underflag and prepare to load data provider

```js
import { Underflag } from "underflag";
import { MysqlDataProvider } from "underflag-mysql";
import { createConnection } from 'mysql2';

const connection = createConnection({/* config... */})
connection.connect();
const dataProvider = new MysqlDataProvider({ connection });
const underflag = new Underflag({ dataProvider });
if (await underflag.isOn("feature")) {
    // ...
}
```

_Attention: Do not forget of create the features table in mysql with the key and value columns._

Example of table:
```sql 
CREATE TABLE `features` (
  `id` int NOT NULL AUTO_INCREMENT,
  `key` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `value` varchar(1000) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `features_key_IDX` (`key`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
```

Know more on [underflag npm page](https://www.npmjs.com/package/underflag)

### License

[MIT](LICENSE)
