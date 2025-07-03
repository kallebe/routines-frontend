import { deleteTask, getTasks } from "@/api/api";
import FormTaskDialog from "@/components/routines/form_task_dialog";
import PageTitle from "@/components/routines/page_title";
import { TaskBox } from "@/components/routines/tasks";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import type { Task } from "@/interfaces/task";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";


function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = () => {
    getTasks()
      .then(data => setTasks(data))
      .catch(err => toast.error(`Erro ao buscar tarefas: ${err.message}`));
  }

  const handleDeleteTask = (taskId: number) => {
    deleteTask(taskId)
      .then(() => {
        toast.success('Tarefa excluída com sucesso!');
        fetchTasks();
      })
      .catch(err => toast.error(`Erro ao excluir tarefa: ${err.message}`));
  };

  useEffect(() => {
    document.title = 'Routine | Minhas Tarefas';
    fetchTasks();
  }, []);

  return (
    <div>
      <Toaster />
      <PageTitle title="Minhas Tarefas" />
      <div className="flex flex-col gap-6 items-center p-8 w-6xl mx-auto">
        <FormTaskDialog onTaskSaved={fetchTasks} className="self-end"><Button className="w-fit"><PlusIcon className="w-4 h-4" /> Adicionar Tarefa</Button></FormTaskDialog>
        <div className="flex flex-col gap-6 w-full">
          {tasks.map(task => (
            <TaskBox key={task.id} task={task} onDelete={handleDeleteTask} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks;
