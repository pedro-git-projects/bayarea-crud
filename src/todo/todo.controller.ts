import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/todo.dto';

@Controller('todo')
@UseGuards(JwtGuard)
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post()
  async postTodo(@Body() dto: CreateTodoDto) {
    return this.todoService.createTodoItem(dto);
  }

  @Get()
  async getAllTodos(@Request() req: any) {
    const userId = req.user.id;
    return this.todoService.readAllTodo(userId);
  }
}
