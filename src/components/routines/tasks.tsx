import { Pen, Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import ActionsMenu from "./actions_menu";
import type { Task } from "@/interfaces/task";

function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  let result = '';
  if (h > 0) result += `${h}h`;
  if (m > 0) result += `${m}m`;
  if (result === '') result = '0m';
  return result;
}

function TaskBox({ task, onDelete }: { task: Task, onDelete: (taskId: number) => void }) {
  return (
    <Card className="max-w-screen w-full flex flex-row justify-between items-center gap-6 px-6">
      <span className="w-2/5">{task.title}</span>
      <span className="w-1/5">{formatDuration(task.duration)}</span>
      <span className="w-1/5">
        <Badge style={{ backgroundColor: task.category.color }}>
          {task.category.title}
        </Badge>
      </span>
      <ActionsMenu>
        <DropdownMenuItem>
          <Pen />
          <span>Editar</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDelete(task.id)}>
          <Trash2 />
          <span>Excluir</span>
        </DropdownMenuItem>
      </ActionsMenu>
    </Card>
  )
}

export { TaskBox };