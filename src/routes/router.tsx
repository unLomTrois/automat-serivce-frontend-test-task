import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { NotesPage } from "../pages/NotesPage";
import { MainLayout } from "../layouts/MainLayout";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <NotesPage /> },
      { path: "notes", element: <NotesPage /> },
    ],
  },
]);
