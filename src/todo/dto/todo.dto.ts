import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsDate()
  deadline: string;

  @IsNotEmpty()
  @IsString()
  status: string;
}
