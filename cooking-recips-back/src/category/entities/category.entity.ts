import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categorias')
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'nome', length: 100, unique: true, nullable: true })
  name!: string;
}
