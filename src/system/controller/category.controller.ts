import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GetAuthUser } from 'src/auth/decorators/user.decorators';
import { JwtAuthGuard } from 'src/auth/helpers/guard/auth.guard';
import { IAuthUser } from 'src/auth/interfaces/auth.interface';
import { CreateCategoryDto } from '../dto/category.dto';
import { CategoryService } from '../services/category.service';

const user = {};

@UseGuards(JwtAuthGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(
    @GetAuthUser() user: IAuthUser,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoryService.create(user.id, createCategoryDto);
  }

  @Get()
  findAll(@GetAuthUser() user: IAuthUser) {
    return this.categoryService.getCategories(user.id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @GetAuthUser() user: IAuthUser,
    @Body() updateCategoryDto: CreateCategoryDto,
  ) {
    return this.categoryService.update(id, user.id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@GetAuthUser() user: IAuthUser, @Param('id') id: string) {
    return this.categoryService.remove(id, user);
  }
}
