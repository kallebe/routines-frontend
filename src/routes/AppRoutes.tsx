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
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Tasks />
          </PrivateRoute>
        }
      />
      <Route
        path="/tasks"
        element={
          <PrivateRoute>
            <Tasks />
          </PrivateRoute>
        }
      />
      <Route
        path="/categories"
        element={
          <PrivateRoute>
            <Categories />
          </PrivateRoute>
        }
      />
      <Route
        path="/routines"
        element={
          <PrivateRoute>
            <Routines />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
