import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { useUser } from "../hooks/useUser";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { Loader } from "./Loader";

const Avatar = () => {
  const { data: me, isLoading } = useUser();
  const navigate = useNavigate();

  return (
    <div
      className="flex justify-center items-center gap-3 hover:cursor-pointer"
      onClick={() => navigate("/")}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <img
          src="https://www.freecodecamp.org/news/content/images/2020/12/DSC08166-2.jpg"
          alt="avatar"
          className="w-12 h-12 rounded-full"
        />
      )}
      <p>{me.username}</p>
    </div>
  );
};

export const Header = () => {
  const navigate = useNavigate();
  const title = useDocumentTitle();

  const handleLogout = async () => {
    await api.logout().then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="bg-gray-100 sticky top-0 text-gray-700 font-mono text-xl font-bold text-center flex flex-row items-center justify-between p-2 shadow-md">
      <Avatar />
      <h1 className="text-center text-4xl font-bold">{title}</h1>
      {/* avatar */}
      <div className="flex flex-row gap-3">
        <div className="flex justify-center items-center gap-3">
          <button
            className="bg-blue-500 p-1 rounded-md text-white"
            onClick={handleLogout}
          >
            <span>Выйти</span>
            <i className="fa-solid fa-right-from-bracket ml-2"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
