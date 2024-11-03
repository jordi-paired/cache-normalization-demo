import { TodoDto } from "../api/dtos/todoDto";

export interface Todo extends TodoDto {
  custom?: true;
}
