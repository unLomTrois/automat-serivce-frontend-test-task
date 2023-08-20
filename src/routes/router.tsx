import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { NotesPage } from "../pages/notes/NotesPage";
import { MainLayout } from "../layouts/MainLayout";
import { NoteView } from "../pages/notes/NoteView";
import { NoteNew } from "../pages/notes/NoteNew";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <NotesPage /> },
      {
        path: "notes",
        children: [
          { index: true, element: <NotesPage /> },
          { path: "new", element: <NoteNew /> },
          { path: ":id", element: <NoteView /> },
        ],
      },
    ],
  },
]);
