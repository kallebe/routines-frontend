import { SidebarTrigger } from "../ui/sidebar";

function PageTitle({ title }: { title: string }) {
  return (
    <div className="p-8 border-b-2 border-border flex align-middle">
      <SidebarTrigger className="mr-5" />
      <h1>{title}</h1>
    </div>
  );
}

export default PageTitle;