import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTodoDto } from './dto/todo.dto';
import { TodoItem } from '@prisma/client';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async createTodoItem(dto: CreateTodoDto): Promise<TodoItem | never> {
    try {
      const todo = await this.prisma.todoItem.create({
        data: {
          name: dto.name,
          status: dto.status,
          deadline: dto.deadline,
        },
      });
      return todo;
    } catch (err) {
      throw err;
    }
  }

  async readAllTodo(userId: number): Promise<TodoItem[] | never> {
    try {
      const todos = await this.prisma.todoItem.findMany({
        where: {
          TodoItemUser: {
            some: {
              userId,
            },
          },
        },
      });
      return todos;
    } catch (err) {
      throw err;
    }
  }
}
