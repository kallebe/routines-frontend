function PageTitle({ title }: { title: string }) {
  return (
    <div className="p-8 border-b-2 border-border">
      <h1>{title}</h1>
    </div>
  );
}

export default PageTitle;