import { Connection, getConnection } from "typeorm";

export abstract class PostgresService {

  getConnection(): Connection {
    return getConnection('POSTGRES');
  }
}