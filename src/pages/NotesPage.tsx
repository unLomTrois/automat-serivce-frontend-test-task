type Note = {
  title: string;
  description: string;
};

// shows a list with flex elements
export const NotesPage = () => {
  // fetch notes from api

  // temp notes
  const notes: Note[] = [
    { title: "note 1", description: "lorem ipsum" },
    { title: "note 2", description: "lorem ipsum" },
    { title: "note 3", description: "lorem ipsum" },
  ];

  return (
    <div className="flex flex-col space-y-4 p-4 items-center">
      <NotesList notes={notes} />
    </div>
  );
};

const NotesList = ({ notes }: { notes: Note[] }) => {
  return (
    <div className="flex flex-col space-y-4 w-2/3">
      <h2 className="text-center text-4xl font-bold">Notes List</h2>
      <div className="flex flex-col space-y-4 items-center">
        {notes.map((note) => (
          <NoteItem key={note.title} note={note} />
        ))}
      </div>
    </div>
  );
};

// flex row
const NoteItem = ({ note }: { note: Note }) => {
  return (
    <div className="flex flex-row space-x-4">
      <h2 className="text-xl font-bold">{note.title}</h2>
      <p className="text-gray-500">{note.description}</p>
      {/* change button */}
      <button className="bg-blue-500 p-1 text-sm rounded-md text-white">Change</button>
      {/* delete button  */}
      <button className="bg-red-500 p-1 text-sm rounded-md text-white">Delete</button>
    </div>
  );
};
