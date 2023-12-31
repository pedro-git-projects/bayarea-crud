import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateTodoDto,
  CreateTodoItemUserDto,
  DeleteTodoDto,
  UpdateTodoDto,
} from './dto/todo.dto';
import { TodoItem, TodoItemUser } from '@prisma/client';

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

  async createTodoItemUser(
    dto: CreateTodoItemUserDto,
  ): Promise<TodoItemUser | never> {
    try {
      const todoItemUser = await this.prisma.todoItemUser.create({
        data: {
          userId: dto.userId,
          todoItemId: dto.todoItemId,
          assignedBy: 'root',
        },
      });
      return todoItemUser;
    } catch (err) {
      throw err;
    }
  }

  async createTodo(
    createDto: CreateTodoDto,
    userId: number,
  ): Promise<TodoItem | never> {
    const todoItem = await this.createTodoItem(createDto);
    const createTodoItemuserDto = new CreateTodoItemUserDto();
    createTodoItemuserDto.userId = userId;
    createTodoItemuserDto.todoItemId = todoItem.id;
    await this.createTodoItemUser(createTodoItemuserDto);
    return todoItem;
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

  async deleteTodo(dto: DeleteTodoDto, userId: number): Promise<void | never> {
    await this.prisma.todoItemUser.delete({
      where: {
        userId_todoItemId: {
          todoItemId: dto.todoId,
          userId: userId,
        },
      },
    });

    await this.prisma.todoItem.delete({
      where: {
        id: dto.todoId,
      },
    });
  }

  async updateTodo(dto: UpdateTodoDto): Promise<TodoItem | never> {
    try {
      const todo = await this.prisma.todoItem.update({
        where: {
          id: dto.id,
        },
        data: dto,
        select: {
          id: true,
          name: true,
          status: true,
          deadline: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return todo;
    } catch (err) {
      throw err;
    }
  }
}
