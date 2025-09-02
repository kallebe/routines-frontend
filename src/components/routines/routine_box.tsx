import { Pen, Trash2 } from "lucide-react";
import { Card } from "../ui/card";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import ActionsMenu from "./actions_menu";
import type { Routine } from "@/interfaces/routine";

function RoutineBox({ routine, onDelete }: { routine: Routine, onDelete: (routineId: number) => void }) {
  return (
    <Card className="max-w-screen w-full flex flex-row justify-between items-center gap-6 px-6">
      <span className="w-2/5">{routine.title}</span>
      <span className="w-2/5">{routine.days_of_week}</span>
      <ActionsMenu>
        <DropdownMenuItem>
          <Pen />
          <span>Editar</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDelete(routine.id)}>
          <Trash2 />
          <span>Excluir</span>
        </DropdownMenuItem>
      </ActionsMenu>
    </Card>
  )
}

export { RoutineBox };
