import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function useDocumentTitle() {
  const location = useLocation();
  const [title, setTitle] = useState("Заметки");

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setTitle("Заметки");
        break;
      case "/notes":
        setTitle("Заметки");
        break;
      case "/notes/new":
        setTitle("Новая заметка");
        break;
    }

    document.title = title;
  }, [title, location]);

  return title;
}

export default useDocumentTitle;
