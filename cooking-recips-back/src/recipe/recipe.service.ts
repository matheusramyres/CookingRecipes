import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../category/entities/category.entity';
import { User } from '../user/entities/user.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './entities/recipe.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  async create(dto: CreateRecipeDto, userId: number): Promise<Recipe> {
    const recipe = new Recipe();

    recipe.name = dto.name;
    recipe.prepTimeMinutes = dto.prepTimeMinutes;
    recipe.servings = dto.servings;
    recipe.preparationMethod = dto.preparationMethod;
    recipe.ingredients = dto.ingredients;

    recipe.user = { id: userId } as User;

    if (dto.categoryId) {
      recipe.category = { id: dto.categoryId } as Category;
    }

    recipe.createdAt = new Date();
    recipe.updatedAt = new Date();

    return this.recipeRepository.save(recipe);
  }

  async findAll(): Promise<Recipe[]> {
    return this.recipeRepository.find({
      relations: ['user', 'category'],
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOne({
      where: { id },
      relations: ['user', 'category'],
    });

    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }

    return recipe;
  }

  async update(id: number, updateRecipeDto: UpdateRecipeDto): Promise<Recipe> {
    const recipe = await this.findOne(id);

    if (updateRecipeDto.name !== undefined) {
      recipe.name = updateRecipeDto.name;
    }

    if (updateRecipeDto.prepTimeMinutes !== undefined) {
      recipe.prepTimeMinutes = updateRecipeDto.prepTimeMinutes;
    }

    if (updateRecipeDto.servings !== undefined) {
      recipe.servings = updateRecipeDto.servings;
    }

    if (updateRecipeDto.preparationMethod !== undefined) {
      recipe.preparationMethod = updateRecipeDto.preparationMethod;
    }

    if (updateRecipeDto.ingredients !== undefined) {
      recipe.ingredients = updateRecipeDto.ingredients;
    }

    if (updateRecipeDto.categoryId !== undefined) {
      recipe.category = { id: updateRecipeDto.categoryId } as Category;
    }

    recipe.updatedAt = new Date();

    return this.recipeRepository.save(recipe);
  }

  async remove(id: number): Promise<void> {
    const recipe = await this.findOne(id);
    await this.recipeRepository.remove(recipe);
  }
}
