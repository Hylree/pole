import { PostgresService } from "./postgres.service"
import { EntityTarget, Repository } from "typeorm";

export abstract class BaseService<T> extends PostgresService {

  protected constructor(
    private repo: EntityTarget<T>
  ) {
    super();
  }

  getRepository(): Repository<T> {
    return this.getConnection().getRepository(this.repo);
  }

}