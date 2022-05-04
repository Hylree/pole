import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('commune')
export class Commune {

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ name: 'code_commune', type: 'varchar', length: 7 })
  public code_commune: string;

  @Column({ name: 'nom_commune', type: 'varchar', length: 50 })
  public nom_commune: string;

  @Column({ name: 'code_postal', type: 'varchar', length: 7 })
  public code_postal: string;

}