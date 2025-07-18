import PrivateRoute from "@/components/PrivateRoute";
import Categories from "@/pages/Categories";
import Login from "@/pages/Login";
import NewUser from "@/pages/NewUser";
import Routines from "@/pages/Routines";
import Tasks from "@/pages/Tasks";
import { Route, Routes } from "react-router-dom";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/new-user" element={<NewUser />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Tasks />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/routines" element={<Routines />} />
      </Route>
    </Routes>
  );
}
