import { HttpStatusCode } from "axios";
import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { LoginDTO, api } from "../api";
import { Loader } from "../components/Loader";

export const LoginPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const form_data = new FormData(e.currentTarget);

    setLoading(true);
    const response = await api.login(form_data as unknown as LoginDTO);

    console.log(response.status);
    if (response.status === HttpStatusCode.Created) {
      setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 1000);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 text-gray-700 font-mono text-xl font-bold text-center flex-col space-y-4 p-4  ">
      <h1 className="text-center text-4xl font-bold">Login Page</h1>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="p-2 border-2 border-gray-400 rounded-md"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="p-2 border-2 border-gray-400 rounded-md"
        />

        <button
          className="bg-blue-500 p-2 rounded-md text-white"
          onClick={() => redirect("/notes")}
        >
          {loading && <Loader />}
          Вход
        </button>
      </form>
    </div>
  );
};
