import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { Recipe } from './entities/recipe.entity';
import { User } from '../user/entities/user.entity';
import { Category } from '../category/entities/category.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recipe, User, Category]),
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? 'receitas_secret_key',
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class RecipeModule {}
