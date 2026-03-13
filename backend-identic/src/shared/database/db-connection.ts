import mssql from "mssql";
import { dbConfig } from "../../config/db.config";

export class DbConnection {
  private static pool: mssql.ConnectionPool | null = null;

  static async getConnection(): Promise<mssql.ConnectionPool> {
    if (this.pool && this.pool.connected) {
      return this.pool;
    }

    try {
      console.log("Connecting to SQL Server...");
      // @ts-ignore
      this.pool = await new mssql.ConnectionPool(dbConfig).connect();
      console.log("SQL Server connected successfully.");
      return this.pool;
    } catch (err) {
      console.error("Database Connection Failed! Bad Config: ", err);
      this.pool = null;
      throw err;
    }
  }

  static async closePool(): Promise<void> {
    if (this.pool) {
      await this.pool.close();
      this.pool = null;
    }
  }
}
