import { deleteTask, getRoutines } from "@/api/api";
import PageTitle from "@/components/routines/page_title";
import { RoutineBox } from "@/components/routines/routine_box";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import type { Routine } from "@/interfaces/routine";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


function Routines() {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const navigate = useNavigate();

  const fetchTasks = () => {
    getRoutines()
      .then(data => setRoutines(data))
      .catch(err => toast.error(`Erro ao buscar rotinas: ${err.message}`));
  }

  const handleDeleteRoutine = (routineId: number) => {
    deleteTask(routineId)
      .then(() => {
        toast.success('Rotina excluída com sucesso!');
        fetchTasks();
      })
      .catch(err => toast.error(`Erro ao excluir rotina: ${err.message}`));
  };

  useEffect(() => {
    document.title = 'Routine | Minhas Rotinas';
    fetchTasks();
  }, []);

  return (
    <div>
      <Toaster />
      <PageTitle title="Minhas Rotinas" />
      <div className="flex flex-col gap-6 items-center p-8 w-6xl mx-auto">
        <Button className="w-fit self-end" onClick={() => navigate('/new-routine')}><PlusIcon className="w-4 h-4" /> Adicionar Rotina</Button>
        <div className="flex flex-col gap-6 w-full">
          {routines.map(routine => (
            <RoutineBox key={routine.id} routine={routine} onDelete={handleDeleteRoutine} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Routines;
