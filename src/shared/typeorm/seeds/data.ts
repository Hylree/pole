import { EntityManager } from "typeorm";
import { User } from "../../../api/entities/user/user.entity";
import * as usersJson from "../json/data/users.data.json";
import { Commune } from "../../../api/entities/commune/commune.entity";
import * as communesJson from "../json/data/communes.data.json";
import { AuthApiTiers } from "../../../api/entities/auth-api/auth-api.entity";
import * as apisJson from "../json/data/auth-api-tiers.data.json";



export class Data {
    em: EntityManager;
  
    constructor(em: EntityManager) {
      this.em = em;
    }

  public async insert() {
    await this.createUsers();
    await this.createCommunes();
    await this.createAuthApi();
  }

  private async createUsers(){
    const users = this.em.create(User, usersJson as User[]);
    await this.em.save(User, users);
  }

  private async createCommunes(){
    const communes = this.em.create(Commune, communesJson as Commune[]);
    await this.em.save(Commune, communes, { chunk: 30 });
  }
  
  private async createAuthApi(){
    const apis = this.em.create(AuthApiTiers, apisJson as AuthApiTiers[]);
    await this.em.save(AuthApiTiers, apis, { chunk: 30 });
  }
}