import type { Task } from "./task";

export interface TaskRoutine {
  task: Task;
  start: string;
  end: string;
}
