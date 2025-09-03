import { SidebarTrigger, useSidebar } from "../ui/sidebar";

function PageTitle({ title }: { title: string }) {
  const { state } = useSidebar();

  return (
    <div
      className={`fixed top-0 left-0 right-0 w-full z-20 p-8 border-b-2 border-border flex items-center transition-all duration-200
        ${state === "expanded" ? "md:pl-[18rem]" : "md:pl-[5rem]"}
      `}
      style={{
        background: 'linear-gradient(135deg, var(--main) 15%, var(--chart-3) 150%)',
      }}
    >
      <SidebarTrigger className="mr-5" />
      <h1 className="text-2xl">{title}</h1>
    </div>
  );
}

export default PageTitle;