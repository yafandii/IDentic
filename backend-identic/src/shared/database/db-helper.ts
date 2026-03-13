import mssql from "mssql";
import { DbConnection } from "./db-connection";

export class DbHelper {
  /**
   * Execute a raw SQL query
   */
  static async query<T = any>(
    sql: string,
    params: Record<string, any> = {},
  ): Promise<T[]> {
    try {
      const pool = await DbConnection.getConnection();
      const request = pool.request();

      // Add parameters
      for (const key in params) {
        request.input(key, params[key]);
      }

      const result = await request.query(sql);
      return result.recordset;
    } catch (error) {
      console.error("DbHelper.query Error:", error);
      throw error;
    }
  }

  /**
   * Execute a stored procedure
   */
  static async execute<T = any>(
    procedureName: string,
    params: Record<string, any> = {},
  ): Promise<T[]> {
    try {
      const pool = await DbConnection.getConnection();
      const request = pool.request();

      // Add parameters
      for (const key in params) {
        request.input(key, params[key]);
      }

      const result = await request.execute(procedureName);
      return result.recordset;
    } catch (error) {
      console.error(`DbHelper.execute (${procedureName}) Error:`, error);
      throw error;
    }
  }

  /**
   * Execute a query and return a single record
   */
  static async queryOne<T = any>(
    sql: string,
    params: Record<string, any> = {},
  ): Promise<T | null> {
    const results = await this.query<T>(sql, params);
    return results.length > 0 ? results[0] : null;
  }
}
