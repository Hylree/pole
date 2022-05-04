import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('auth_api')
export class AuthApiTiers {

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ name: 'name', type: 'varchar', length: 120 })
  public name: string;

  @Column({ name: 'grant_type', type: 'varchar', length: 120 })
  public grantType: string;

  @Column({ name: 'client_id', type: 'varchar', length: 255 })
  public clientId: string;

  @Column({ name: 'client_secret', type: 'varchar', length: 255 })
  public clientSecret: string;

  @Column({ name: 'scope', type: 'varchar', length: 150 })
  public scope: string;

  @Column({ name: 'date_token', type: 'timestamp', nullable: true })
  public dateToken: Date;

  @Column({ name: 'access_token', type: 'varchar', length: 100, nullable: true })
  public accessToken: string;

  @Column({ name: "token_type", type: 'varchar', length: 10, nullable: true })
  public tokenType: string;

  @Column({ name: "expires_in", type: 'int', nullable: true })
  public expiresIn: number;

  @CreateDateColumn({ name: "created_at", type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: 'timestamp' })
  public updatedAt!: Date;

}