import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { Data } from "./data";

export default class DevelopmentSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.transaction(async em => {
      await new Data(em).insert();
    });
  }
}
