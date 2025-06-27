'use client';

export default function Item({ item, updateItem, deleteItem }) {
  const handleChange = (e) => {
    updateItem({ ...item, content: e.target.value });
  };

  return (
    <div className="bg-gray-100 p-2 rounded flex items-center justify-between gap-2">
      <input
        className="flex-grow bg-transparent outline-none text-gray-800"
        value={item.content}
        onChange={handleChange}
      />
      <button
        onClick={() => deleteItem(item.id)}
        className="text-white bg-red-500 px-2 py-1 rounded"
      >
        x
      </button>
    </div>
  );
}
