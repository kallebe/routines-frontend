import PageTitle from "@/components/routines/page_title";
import { TaskBox } from "@/components/routines/tasks";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";


function Tasks() {
  const tasks = [
    {
      id: 1,
      title: "Preparar Almoço",
      duration: 120,
      category: { title: "Dia-a-dia", color: "#FFD700" }
    },
    {
      id: 2,
      title: "Estudar React",
      duration: 45,
      category: { title: "Estudos", color: "#7AFFB6" }
    },
    {
      id: 3,
      title: "Ir ao mercado",
      duration: 30,
      category: { title: "Compras", color: "#7A83FF" }
    }
  ]

  return (
    <div>
      <PageTitle title="Minhas Tarefas" />
      <div className="flex flex-col gap-6 items-center p-8 w-6xl mx-auto">
        <Button className="w-fit self-end"><PlusIcon className="w-4 h-4" /> Adicionar Tarefa</Button>
        <div className="flex flex-col gap-6 w-full">
          {tasks.map(task => (
            <TaskBox key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks;
