import { getTasks } from "@/api/api";
import FormTaskDialog from "@/components/routines/form_task_dialog";
import PageTitle from "@/components/routines/page_title";
import { TaskBox } from "@/components/routines/tasks";
import { Button } from "@/components/ui/button";
import type { Task } from "@/interfaces/task";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";


function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [alert, setAlert] = useState('');

  const fetchTasks = () => {
    getTasks()
      .then(data => setTasks(data))
      .catch(err => setAlert(`Erro ao buscar tarefas: ${err.message}`));
  }

  useEffect(() => {
    document.title = 'Routine | Minhas Tarefas';
    fetchTasks();
  }, []);

  return (
    <div>
      <PageTitle title="Minhas Tarefas" />
      <div className="flex flex-col gap-6 items-center p-8 w-6xl mx-auto">
        <FormTaskDialog onTaskSaved={fetchTasks} className="self-end"><Button className="w-fit"><PlusIcon className="w-4 h-4" /> Adicionar Tarefa</Button></FormTaskDialog>
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
