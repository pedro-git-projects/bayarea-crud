import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  deadline: string;

  @IsNotEmpty()
  @IsString()
  status: string;
}

export class CreateTodoItemUserDto {
  @IsString()
  @IsNumberString()
  userId: number;

  @IsString()
  @IsNumberString()
  todoItemId: number;
}

export class DeleteTodoDto {
  @IsNumber()
  todoId: number;
}

class UpdateTodoDtoBase {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  name?: string;

  @IsString()
  status?: string;

  @IsDate()
  @Type(() => Date)
  deadline?: Date;
}

export type UpdateTodoDto = Partial<UpdateTodoDtoBase>;
