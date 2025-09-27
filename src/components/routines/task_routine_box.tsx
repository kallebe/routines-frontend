import { Pen, Trash2 } from "lucide-react";
import { Card } from "../ui/card";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import ActionsMenu from "./actions_menu";
import type { TaskRoutine } from "@/interfaces/task_routine";

function TaskRoutineBox({ task, onDelete }: { task: TaskRoutine, onDelete: (taskId: number) => void }) {
  return (
    <Card className="max-w-screen w-full flex flex-row justify-between items-center gap-6 px-6">
      <span className="w-2/5">{task.task.title}</span>
      <span className="w-1/5">{task.start}</span>
      <span className="w-1/5">{task.end}</span>
      <ActionsMenu>
        <DropdownMenuItem>
          <Pen />
          <span>Editar</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDelete(task.task.id)}>
          <Trash2 />
          <span>Excluir</span>
        </DropdownMenuItem>
      </ActionsMenu>
    </Card>
  )
}

export { TaskRoutineBox };
