export interface Task {
  id: number;
  title: string;
  duration: number;
  category: { title: string; color: string };
}
