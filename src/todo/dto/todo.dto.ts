import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

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
