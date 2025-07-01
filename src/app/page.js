import Image from "next/image";
import TodoBoard from "./components/TodoBoard";
import SortableListPage from "./components/Animate-List";

export default function Home() {
  return (
    <main className="p-4 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold my-4 text-gray-800">Multi-List Todo App</h1>
      {/* <TodoBoard /> */}
      <SortableListPage />
    </main>
  );
}
