import { MySqlRawQueryResult } from 'drizzle-orm/mysql-core';

declare module 'drizzle-orm/mysql-core' {
  interface MySqlRawQueryResult {
    insertId?: number;
  }
}