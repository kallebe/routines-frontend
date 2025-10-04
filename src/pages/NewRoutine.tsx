import FormTaskRoutineDialog from "@/components/routines/form_task_routine_dialog";
import PageTitle from "@/components/routines/page_title";
import { TaskRoutineBox } from "@/components/routines/task_routine_box";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import type { TaskRoutine } from "@/interfaces/task_routine";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";

function NewRoutine() {
  const [tasks, setTasks] = useState<TaskRoutine[]>([]);

  const handleDeleteRoutine = () => {} // TODO

  const onTaskSaved = (task: TaskRoutine) => {
    const newTasks = [...tasks, task].sort((a, b) => {
      if (a.start < b.start) return -1;
      if (a.start > b.start) return 1;
      return 0;
    });
    setTasks(newTasks);
  }

  useEffect(() => {
    document.title = 'Routine | Minhas Rotinas';
  }, []);

  return (
    <div>
      <Toaster />
      <PageTitle title="Adicionar Rotina" />
      <div className="flex flex-col gap-6 items-center p-8 w-6xl mx-auto">
        <FormTaskRoutineDialog onTaskSaved={onTaskSaved} className="self-end"><Button className="w-fit self-end"><PlusIcon className="w-4 h-4" /> Adicionar Tarefa</Button></FormTaskRoutineDialog>
        <div className="flex flex-col gap-6 w-full">
          {tasks.map(task => (
            <TaskRoutineBox key={task.task.id} task={task} onDelete={handleDeleteRoutine} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default NewRoutine;
