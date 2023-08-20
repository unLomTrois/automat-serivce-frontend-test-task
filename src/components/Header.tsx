import { useNavigate } from "react-router-dom";
import { api } from "../api";

export const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await api.logout().then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="bg-gray-100 text-gray-700 font-mono text-xl font-bold text-center flex flex-row items-center justify-between p-4 shadow-md">
      <h1 className="text-center text-4xl font-bold">Header</h1>
      {/* avatar */}
      <div className="flex flex-row gap-3">
        <div className="flex justify-center items-center gap-3">
          <img
            src="https://www.freecodecamp.org/news/content/images/2020/12/DSC08166-2.jpg"
            alt="avatar"
            className="w-12 h-12 rounded-full"
          />
          <p>*username*</p>
        </div>
        <div className="flex justify-center items-center gap-3">
          <button
            className="bg-blue-500 p-2 rounded-md text-white"
            onClick={handleLogout}
          >
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
};
