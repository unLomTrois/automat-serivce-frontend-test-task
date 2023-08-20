import { useNavigate, useParams } from "react-router-dom";
import { useNote } from "../../hooks/useNotes";
import { api } from "../../api";
import { Loader } from "../../components/Loader";
import useSWRMutation from "swr/mutation";

export const NoteView = () => {
  const navigate = useNavigate();

  const { id } = useParams() as { id: string };

  const { data: note, isLoading } = useNote(id);

  const { trigger: updateNote, isMutating } = useSWRMutation(
    `/notes/${id}`,
    (url, { arg }: { arg: FormData }) => api.client.patch(url, arg)
  );

  if (isLoading) {
    return (
      <div className="flex flex-row gap-2 justify-center items-center w-full">
        <Loader className="inline mr-3 text-white animate-spin w-10 h-10" />
        <span>Загрузка заметки...</span>
      </div>
    );
  }

  if (!note) {
    return <div>Заметка не найдена</div>;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form_data = new FormData(e.currentTarget);

    await updateNote(form_data).then((res) => {
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
        {isMutating && <Loader />}
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
