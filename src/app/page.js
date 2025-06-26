import Image from "next/image";
import TodoBoard from "./components/TodoBoard";

export default function Home() {
  return (
    <main className="p-4 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Multi-List Todo App</h1>
      <TodoBoard />
    </main>
  );
}
