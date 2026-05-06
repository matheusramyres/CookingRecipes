import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Category } from './category/entities/category.entity';
import { Recipe } from './recipe/entities/recipe.entity';
import { RecipeModule } from './recipe/recipe.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Category, Recipe],
      synchronize: false,
    }),
    RecipeModule,
    UserModule,
    CategoryModule,
    AuthModule,
  ],
})
export class AppModule {}
