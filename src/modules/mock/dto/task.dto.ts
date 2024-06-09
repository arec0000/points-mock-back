import { IsString } from "class-validator";

export class TaskDto {
  @IsString()
  taskId: string;
}
