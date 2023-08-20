import { Outlet } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { Header } from "../components/Header";

export const MainLayout = () => {
  const { data: me, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(me);

  return (
    <div className="flex flex-col text-gray-700 font-mono text-xl font-bold text-center">
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-10">
        <Outlet />
      </main>
    </div>
  );
};
