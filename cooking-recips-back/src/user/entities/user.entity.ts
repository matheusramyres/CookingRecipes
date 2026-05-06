import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuarios')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'nome', length: 100, nullable: true })
  name!: string;

  @Column({ length: 100, unique: true })
  login!: string;

  @Column({ name: 'senha', length: 100 })
  password!: string;

  @Column({ name: 'criado_em', type: 'datetime' })
  createdAt!: Date;

  @Column({ name: 'alterado_em', type: 'datetime' })
  updatedAt!: Date;
}
