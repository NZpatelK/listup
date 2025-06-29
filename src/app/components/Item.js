'use client';

export default function Item({ item, updateItem, deleteItem }) {
  const handleChange = (e) => {
    updateItem({ ...item, content: e.target.value });
  };

  return (
    <div className="p-3 flex items-center justify-between gap-2 border-b border-gray-200 hover:bg-gray-100">
      <input
        className="flex-grow bg-transparent outline-none text-gray-800"
        value={item.content}
        onChange={handleChange}
      />
      <button
        onClick={() => deleteItem(item.id)}
        className=" w-6 h-6 rounded-full flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-gray-500 hover:text-red-500 transition-colors duration-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
