import { Pen, Trash2 } from "lucide-react";
import { Card } from "../ui/card";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import ActionsMenu from "./actions_menu";
import type { Category } from "@/interfaces/category";

function CategoryBox({ category, onDelete }: { category: Category, onDelete: (categoryId: number) => void }) {
  return (
    <Card className="max-w-screen w-full flex flex-row justify-between items-center gap-6 px-6">
      <div className="flex justify-start">
        <span
          className="h-6 w-6 rounded-full border-2"
          style={{ backgroundColor: category.color, display: "inline-block" }}
        />
      </div>
      <span className="grow">{category.title}</span>
      <ActionsMenu>
      <DropdownMenuItem>
        <Pen />
        <span>Editar</span>
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => onDelete(category.id)}>
        <Trash2 />
        <span>Excluir</span>
      </DropdownMenuItem>
      </ActionsMenu>
    </Card>
  )
}

export { CategoryBox };
