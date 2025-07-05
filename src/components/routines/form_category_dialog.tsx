import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import React from "react";
import { createCategory } from "@/api/api";
import { toast } from "sonner";

function FormCategoryDialog({
  children,
  className,
  onSaved
}: {
  children: React.ReactNode,
  className?: string,
  onSaved?: () => void
 }) {
  const [title, setTitle] = React.useState('');
  const [color, setColor] = React.useState('#BFFF7A');
  const [open, setOpen] = React.useState(false);

  const saveCategory = (e: React.FormEvent) => {
    e.preventDefault();

    createCategory(title, color)
      .then(() => {
        setOpen(false);
        setTitle('');
        setColor('#BFFF7A');
        
        if (onSaved) onSaved();
        toast.success('Categoria salva com sucesso!');
      })
      .catch(err => {
        toast.error(`Erro ao salvar categoria: ${err.message}`);
      });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className={className}>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={saveCategory}>
          <DialogHeader>
            <DialogTitle>Adicionar Categoria</DialogTitle>
            <DialogDescription>Adicione uma nova categoria para organizar suas tarefas.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-6 my-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Nome</Label>
              <Input
                id="title"
                placeholder='Produtividade'
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="color">Cor</Label>
              <Input
                id="color"
                type="color"
                value={color}
                onChange={e => setColor(e.target.value)}
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

export default FormCategoryDialog;
