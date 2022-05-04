import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('user')
export class User {

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ name: 'name', type: 'varchar', length: 120 })
  public name: string;

  @Column({ name: 'first_name', type: 'varchar', length: 120, nullable: true})
  public firstName: string;

  @Index('login-email-index')
  @Column({ name: 'login_email', type: 'varchar', length: 120, unique: true})
  public loginEmail: string;

  @Column({ name: 'password', type: 'varchar',  length: 255 })
  public password: string;

  @Column({ name: 'until_valid_token_access', type: 'timestamp', nullable: true})
  public untilValidTokenAccess?: Date;

  @Column({ name: 'access_token', type: 'varchar', length: 255, nullable: true })
  public accessToken?: string;

  @Column({ name: "try_connection", type: 'smallint', default: 0 })
  public tryConnection: number;

  @Column({ name: "account_blocked", type: 'boolean', default: false })
  public accountBlocked: boolean;

  @Column({ name: "counter", type: 'int', default: 20 })
  public counter: number;

  @Column({ name: "counter_try", type: 'int', default: 0 })
  public counterTry: number;

  @Column({ name: "last_login_at", type: 'timestamp', nullable: true })
  public lastLoginAt: Date;
  
  @Column({ name: "date_validity_counter", type: 'timestamp', nullable: true })
  public dateValidityCounter: Date;

  @Column({ name: "delay_validity_counter", type: 'int', default: 1 })
  public delayValidityCounter: number;

  @Column({ name: "is_desactivate", type: 'boolean', default: false })
  public isDesactivate: boolean;

  @Column({ name: "is_deleted", type: 'boolean', default: false })
  public isDeleted: boolean;

  @CreateDateColumn({ name: "created_at", type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: 'timestamp' })
  public updatedAt!: Date;

}