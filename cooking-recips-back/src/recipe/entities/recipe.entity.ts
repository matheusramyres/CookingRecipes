import { Category } from '../../category/entities/category.entity';
import { User } from '../../user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('receitas')
export class Recipe {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_usuarios' })
  user!: User;

  @ManyToOne(() => Category, { nullable: true })
  @JoinColumn({ name: 'id_categorias' })
  category?: Category;

  @Column({ name: 'nome', length: 45, nullable: true })
  name!: string;

  @Column({
    name: 'tempo_preparo_minutos',
    type: 'int',
    unsigned: true,
    nullable: true,
  })
  prepTimeMinutes?: number;

  @Column({ name: 'porcoes', type: 'int', unsigned: true, nullable: true })
  servings?: number;

  @Column({ name: 'modo_preparo', type: 'text' })
  preparationMethod!: string;

  @Column({ name: 'ingredientes', type: 'text', nullable: true })
  ingredients?: string;

  @Column({ name: 'criado_em', type: 'datetime' })
  createdAt!: Date;

  @Column({ name: 'alterado_em', type: 'datetime' })
  updatedAt!: Date;
}
