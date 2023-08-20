import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import { useState } from "react";
import { HttpStatusCode } from "axios";
import { Loader } from "../../components/Loader";
import toast from "react-hot-toast";

export type CreateNoteDto = {
  title: string;
  description: string;
};

export const NoteNew = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const form_data = new FormData(e.currentTarget);

    const response = await api.client.post("notes", form_data);

    console.log(response.status);
    if (response.status === HttpStatusCode.Created) {
      setLoading(false);
      navigate(-1);
      toast.success("Заметка создана", { position: "bottom-right" });
    } else {
      toast.error("Ошибка создания заметки", { position: "bottom-right" });
      navigate(-1);
    }
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
        required
      />
      <textarea
        className="rounded-md text-2xl resize-y"
        name="description"
        placeholder="Описание"
      />

      <button className="bg-green-500 p-1 rounded-md text-white" type="submit">
        {loading && <Loader />}
        Создать
      </button>
    </form>
  );
};
