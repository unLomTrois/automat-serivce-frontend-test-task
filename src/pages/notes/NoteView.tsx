import { useNavigate, useParams } from "react-router-dom";
import { useNote } from "../../hooks/useNotes";
import { api } from "../../api";

export const NoteView = () => {
  const navigate = useNavigate();

  const { id } = useParams() as { id: string };

  const { data: note, isLoading } = useNote(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!note) {
    return <div>Note not found</div>;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form_data = new FormData(e.currentTarget);

    await api.client.patch(`notes/${id}`, form_data).then((res) => {
      console.log(res.status);
      navigate(-1);
    });
  };

  const handleDelete = async (_id: string) => {
    await api.client.delete(`/notes/${_id}`).then(() => {
      navigate(-1);
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col p-4 w-96 shadow-xl rounded-md items-stretch gap-5"
    >
      <input
        type="text"
        name="title"
        placeholder="Название заметки"
        className="text-2xl"
        defaultValue={note?.title}
      />
      <textarea
        className="rounded-md text-2xl resize-y"
        name="description"
        placeholder="Описание"
        defaultValue={note?.description}
      />

      <button className="bg-green-500 p-1 rounded-md text-white" type="submit">
        Сохранить
      </button>

      <button
        className="bg-red-500 p-1 rounded-md text-white"
        onClick={() => handleDelete(note?._id)}
      >
        Delete
      </button>
    </form>
  );
};
