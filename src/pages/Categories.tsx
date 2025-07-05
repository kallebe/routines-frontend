import { deleteCategory, getCategories } from "@/api/api";
import { CategoryBox } from "@/components/routines/category_box";
import FormCategoryDialog from "@/components/routines/form_category_dialog";
import PageTitle from "@/components/routines/page_title";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import type { Category } from "@/interfaces/category";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = () => {
    getCategories()
      .then(data => setCategories(data))
      .catch(err => toast.error(`Erro ao buscar categorias: ${err.message}`));
  };

  const handleDeleteCategory = (categoryId: number) => {
    deleteCategory(categoryId)
      .then(() => {
        toast.success('Categoria excluída com sucesso!');
        fetchCategories();
      })
      .catch(err => toast.error(`Erro ao excluir categoria: ${err.message}`));
  };

  useEffect(() => {
    document.title = 'Routine | Minhas Categorias';
    fetchCategories();
  }, []);
  
  return (
    <div>
      <Toaster />
      <PageTitle title="Minhas Categorias" />
      <div className="flex flex-col gap-6 items-center p-8 w-6xl mx-auto">
        <FormCategoryDialog onSaved={fetchCategories} className="self-end"><Button className="w-fit"><PlusIcon className="w-4 h-4" /> Adicionar Categoria</Button></FormCategoryDialog>
        <div className="flex flex-col gap-6 w-full">
          {categories.map(category => (
            <CategoryBox key={category.id} category={category} onDelete={handleDeleteCategory} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;
