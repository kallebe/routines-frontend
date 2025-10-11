import { createRoutine } from "@/api/api";
import FormTaskRoutineDialog from "@/components/routines/form_task_routine_dialog";
import PageTitle from "@/components/routines/page_title";
import { TaskRoutineBox } from "@/components/routines/task_routine_box";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import type { TaskRoutine } from "@/interfaces/task_routine";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function NewRoutine() {
  const [tasks, setTasks] = useState<TaskRoutine[]>([]);
  const [title, setTitle] = useState('');

  const handleDeleteRoutine = () => {} // TODO
  const navigate = useNavigate();

  const onTaskSaved = (task: TaskRoutine) => {
    const newTasks = [...tasks, task].sort((a, b) => {
      if (a.start < b.start) return -1;
      if (a.start > b.start) return 1;
      return 0;
    });
    setTasks(newTasks);
  }

  const saveRoutine = () => {
    if (!title) {
      toast.error('Preencha o título da Rotina!');
      return;
    }

    createRoutine(title, tasks)
      .then(() => {
        setTitle('');
        setTasks([]);
        toast.success('Rotina criada com sucesso!');
        navigate('/routines');
      })
      .catch(err => toast.error(`Erro ao criar rotina: ${err.message}`));
  }

  useEffect(() => {
    document.title = 'Routine | Minhas Rotinas';
  }, []);

  return (
    <div>
      <Toaster />
      <PageTitle title="Adicionar Rotina" />
      <div className="flex flex-col gap-6 items-center p-8 w-6xl mx-auto">
        <div className="flex justify-between w-full">
          <input type="text" className="text-2xl" placeholder="Nome da rotina" value={title} onChange={e => setTitle(e.target.value)} />
          <FormTaskRoutineDialog onTaskSaved={onTaskSaved}><Button className="w-fit self-end"><PlusIcon className="w-4 h-4" /> Adicionar Tarefa</Button></FormTaskRoutineDialog>
        </div>
        <div className="flex flex-col gap-6 w-full">
          {tasks.map(task => (
            <TaskRoutineBox key={task.task.id} task={task} onDelete={handleDeleteRoutine} />
          ))}
          <Button className={`w-fit self-end ${!tasks.length && 'hidden'}`} onClick={saveRoutine}>Salvar Rotina</Button>
        </div>
      </div>
    </div>
  )
}

export default NewRoutine;
