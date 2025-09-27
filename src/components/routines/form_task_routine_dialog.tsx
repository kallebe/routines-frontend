import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import React, { useEffect, useState } from "react";
import { getTasks } from "@/api/api";
import { toast } from "sonner";
import type { Task } from "@/interfaces/task";
import type { TaskRoutine } from "@/interfaces/task_routine";

function FormTaskRoutineDialog({
  children,
  className,
  onTaskSaved
}: {
  children: React.ReactNode,
  className?: string,
  onTaskSaved?: (task: TaskRoutine) => void
 }) {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [open, setOpen] = useState(false);

  const saveTask = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedTask == null) return;

    const taskRoutine: TaskRoutine = { start: start, end: end, task: selectedTask }

    setOpen(false);
    setStart('')
    setEnd('')

    if (onTaskSaved) onTaskSaved(taskRoutine);
      toast.success('Tarefa salva com sucesso!');
  }

  const selectTask = (id: string) => {
    const task = tasks.find(task => task.id.toString() == id);
    if (task) setSelectedTask(task);
  }

  useEffect(() => {
    getTasks()
      .then(data => setTasks(data))
      .catch(err => toast.error(`Erro ao buscar tarefas: ${err.message}`));
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className={className}>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={saveTask}>
          <DialogHeader>
            <DialogTitle>Adicionar Tarefa</DialogTitle>
            <DialogDescription>Adicione uma nova tarefa para usar em suas rotinas diárias</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-6 my-4">
            <div className="grid gap-2">
              <Label htmlFor="task">Tarefa</Label>
              <Select value={selectedTask?.id.toString()} onValueChange={selectTask}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma tarefa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {tasks.map(task => (
                        <SelectItem key={task.id} value={task.id.toString()}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                          <span
                          style={{
                            display: 'inline-block',
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            border: '2px solid #000',
                            backgroundColor: task.category.color,
                            marginRight: 8,
                          }}
                          />
                          {task.title}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="start">Início</Label>
              <Input
                id="start"
                type="time"
                value={start}
                onChange={e => setStart(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="start">Fim</Label>
              <Input
                id="end"
                type="time"
                value={end}
                onChange={e => setEnd(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="neutral">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default FormTaskRoutineDialog;
