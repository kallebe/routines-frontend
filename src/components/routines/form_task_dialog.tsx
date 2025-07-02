import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import React, { useEffect } from "react";
import { createTask, getCategories } from "@/api/api";
import type { Category } from "@/interfaces/category";

function FormTaskDialog({
  children,
  className,
  onTaskSaved
}: {
  children: React.ReactNode,
  className?: string,
  onTaskSaved?: () => void
 }) {
  const [title, setTitle] = React.useState('');
  const [duration, setDuration] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('');
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [open, setOpen] = React.useState(false);

  const saveTask = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving task with:', { title, duration, selectedCategory });

    await createTask(title, parseInt(duration), selectedCategory);

    setOpen(false);
    setTitle('');
    setDuration('');
    setSelectedCategory('');
    if (onTaskSaved) onTaskSaved();
  }

  useEffect(() => {
    getCategories()
      .then(data => setCategories(data))
      .catch(err => console.error(`Erro ao buscar categorias: ${err.message}`));
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
              <Label htmlFor="title">Nome</Label>
              <Input
                id="title"
                placeholder='Estudar'
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="duration">Duração (minutos)</Label>
              <Input
                id="duration"
                type="number"
                placeholder='45'
                value={duration}
                onChange={e => setDuration(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="duration">Categoria</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories.map(category => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                          <span
                          style={{
                            display: 'inline-block',
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            border: '2px solid #000',
                            backgroundColor: category.color,
                            marginRight: 8,
                          }}
                          />
                          {category.title}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
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

export default FormTaskDialog;
