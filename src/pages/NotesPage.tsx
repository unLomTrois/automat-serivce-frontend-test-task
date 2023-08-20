import { Link, redirect } from "react-router-dom";
import { Note } from "../types/Note";
import { useNotes } from "../hooks/useNotes";

// shows a list with flex elements
export const NotesPage = () => {
  const { data: notes, isLoading } = useNotes();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center p-4 w-2/3 shadow-xl rounded-md">
      <div className="flex flex-row gap-2 justify-start w-full pb-5">
        <button className="bg-green-600 p-1 rounded-md text-white" onClick={() => redirect("/notes/new")}>
          Create
        </button>
        <button className="bg-gray-500 p-1 rounded-md text-white line-through">
          export
        </button>
      </div>
      <table className="table-auto text-left w-full">
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
            return <NoteItem note={note} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

// const NotesList = ({ notes }: { notes: Note[] }) => {
//   return (
//     <div className="flex flex-col space-y-4 w-2/3">
//       <h2 className="text-center text-4xl font-bold">Notes List</h2>
//       <div className="flex flex-col space-y-4 items-center">
//         {notes.map((note) => (
//           <NoteItem key={note.title} note={note} />
//         ))}
//       </div>
//     </div>
//   );
// };

// // flex row
const NoteItem = ({ note }: { note: Note }) => {
  return (
    <tr>
      <td className="pt-5">
        <Link to={`/notes/${note._id}`}>{note.title}</Link>
      </td>
      <td className="pt-5">{note.description}</td>
      <td className="pt-5">{note.timestamp}</td>
      <td className="pt-5">
        <div className="flex flex-row gap-2">
          <button className="bg-blue-500 p-1 rounded-md text-white">
            Change
          </button>
          <button className="bg-red-500 p-1 rounded-md text-white">
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};
