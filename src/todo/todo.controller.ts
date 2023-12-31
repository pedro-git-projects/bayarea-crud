import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto, DeleteTodoDto, UpdateTodoDto } from './dto/todo.dto';

@Controller('todo')
@UseGuards(JwtGuard)
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post()
  async postTodo(@Body() dto: CreateTodoDto, @Request() req: any) {
    const userId = req.user.id;
    return this.todoService.createTodo(dto, userId);
  }

  @Get()
  async getAllTodos(@Request() req: any) {
    const userId = req.user.id;
    return this.todoService.readAllTodo(userId);
  }

  @Patch()
  async updateTodo(@Body() dto: UpdateTodoDto) {
    return this.todoService.updateTodo(dto);
  }

  @Delete()
  async deleteTodo(@Body() dto: DeleteTodoDto, @Request() req: any) {
    const userId = req.user.id;
    return this.todoService.deleteTodo(dto, userId);
  }
}
