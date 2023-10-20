import { DataSource, DataSourceOptions, createConnection } from 'typeorm';
import { createDatabase } from 'typeorm-extension';

import { dbOptions } from 'config';

class DBController {
  connection: DataSource | null = null;

  dbCreate = async () => {
    const options: DataSourceOptions = dbOptions;
    await createDatabase({
      ifNotExist: true,
      options,
    });
    this.connection = await this.dbConnection();
  };

  dbConnection = async (): Promise<DataSource> => {
    return await createConnection(dbOptions);
  };

  getConnection = async (): Promise<DataSource> => {
    if (this.connection === null) {
      this.connection = await this.dbConnection();
      return this.connection;
    } else {
      return this.connection;
    }
  };
}

export const DBConnect = new DBController();
