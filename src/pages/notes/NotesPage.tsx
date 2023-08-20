import { Link, useNavigate } from "react-router-dom";
import { Note } from "../../types/Note";
import { useNotes } from "../../hooks/useNotes";
import { DateTime } from "luxon";
import { api } from "../../api";
import { Loader } from "../../components/Loader";
import { toast } from "react-hot-toast";

// shows a list with flex elements
export const NotesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center p-4 w-2/3 shadow-xl rounded-md">
      <div className="flex flex-row gap-2 justify-start w-full pb-5">
        <button
          className="bg-green-600 p-1 rounded-md text-white"
          onClick={() => navigate("/notes/new")}
        >
          Создать
        </button>
        <button
          className="bg-gray-500 p-1 rounded-md text-white line-through"
          onClick={() => toast.error("Пока что недоступно", {position: "bottom-right"})}
        >
          Экспорт
        </button>
      </div>
      <NoteTable />
    </div>
  );
};

const NoteTable = () => {
  const { data: notes, isLoading, mutate } = useNotes();

  if (isLoading) {
    return (
      <div className="flex flex-row gap-2 justify-center items-center w-full">
        <Loader className="inline mr-3 text-white animate-spin w-10 h-10" />
        <span>Загрузка заметок...</span>
      </div>
    );
  }

  const handleDelete = async (_id: string) => {
    await api.client.delete(`/notes/${_id}`).then(() => {
      mutate();
      toast.success("Заметка удалена", { position: "bottom-right" });
    });
  };

  if (!notes.length) {
    return (
      <div className="flex flex-row gap-2 justify-center items-center w-full">
        <span>Заметки отсутствуют</span>
      </div>
    );
  }

  return (
    <table className="table-fixed text-left w-full">
      <thead>
        <tr>
          <th>Заголовок</th>
          <th>Описание</th>
          <th>Дата создания</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} note={note} handleDelete={handleDelete} />
          );
        })}
      </tbody>
    </table>
  );
};

const NoteItem = ({
  note,
  handleDelete,
}: {
  note: Note;
  handleDelete: (id: string) => void;
}) => {
  const navigate = useNavigate();

  const date = DateTime.fromMillis(note.timestamp).toFormat("dd.MM.yyyy HH:mm");

  return (
    <tr>
      <td className="pt-5 overflow-hidden whitespace-nowrap text-overflow-ellipsis pr-5">
        <Link to={`/notes/${note._id}`}>{note.title}</Link>
      </td>
      <td className="pt-5 overflow-hidden whitespace-nowrap text-overflow-ellipsis pr-5">
        {note.description}
      </td>
      <td className="pt-5">{date}</td>
      <td className="pt-5">
        <div className="flex flex-row gap-2">
          <button
            className="bg-blue-500 px-2 py-1 rounded-md text-white"
            onClick={() => navigate(`/notes/${note._id}`)}
          >
            <i className="fa-solid fa-pen-to-square fa-xs"></i>
          </button>
          <button
            className="bg-red-500 px-2 py-1 rounded-md text-white"
            onClick={() => handleDelete(note._id)}
          >
            <i className="fa-solid fa-trash fa-xs"></i>
          </button>
        </div>
      </td>
    </tr>
  );
};
