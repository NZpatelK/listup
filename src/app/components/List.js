'use client';

import { useState, useRef, useEffect } from 'react';
import Item from './Item';

export default function List({
  list,
  updateList,
  deleteList,
  onItemDropFromOtherList,
}) {
  const [title, setTitle] = useState(list.name);
  const [items, setItems] = useState(list.items);

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  useEffect(() => {
    setTitle(list.name);
    setItems(list.items);
  }, [list]);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    updateList({ ...list, name: newTitle, items });
  };

  const addItem = () => {
    const newItem = { id: Date.now().toString(), content: 'New Item' };
    const newItems = [...items, newItem];
    setItems(newItems);
    updateList({ ...list, items: newItems });
  };

  const updateItem = (updatedItem) => {
    const newItems = items.map((i) => (i.id === updatedItem.id ? updatedItem : i));
    setItems(newItems);
    updateList({ ...list, items: newItems });
  };

  const deleteItem = (id) => {
    const newItems = items.filter((i) => i.id !== id);
    setItems(newItems);
    updateList({ ...list, items: newItems });
  };

  const handleDragStart = (item, index) => {
    dragItem.current = index;
    window.dragPayload = { item, fromListId: list.id };
  };

  const handleDrop = () => {
    const payload = window.dragPayload;
    if (!payload) return;

    if (payload.fromListId === list.id) {
      const reorderedItems = [...items];
      const [draggedItem] = reorderedItems.splice(dragItem.current, 1);
      reorderedItems.splice(dragOverItem.current, 0, draggedItem);
      setItems(reorderedItems);
      updateList({ ...list, items: reorderedItems });
    } else {
      const newItems = [...items, payload.item];
      setItems(newItems);
      updateList({ ...list, items: newItems });
      onItemDropFromOtherList(payload.fromListId, payload.item.id);
      
    }

    dragItem.current = null;
    dragOverItem.current = null;
    window.dragPayload = null;
  };

  return (
    <div
      className="bg-white rounded-xl shadow p-4 relative w-[300px] min-h-[300px]"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <input
        className="text-xl font-bold mb-2 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-2"
        value={title}
        onChange={handleTitleChange}
      />
      <button
        className="text-lg w-8 h-8 text-white bg-red-500 mb-2 rounded-full absolute top-[-10px] right-[-10px]"
        onClick={() => deleteList(list.id)}
      >
        x
      </button>
      <div>
        {items.map((item, index) => (
          <div
            key={item.id}
            draggable
            onDragStart={() => handleDragStart(item, index)}
            onDragEnter={() => (dragOverItem.current = index)}
            onDragOver={(e) => e.preventDefault()}
            className="mb-2 transition-transform duration-200 hover:scale-[1.05]"
          >
            <Item item={item} updateItem={updateItem} deleteItem={deleteItem} />
          </div>
        ))}
      </div>
      <button
        className="mt-4 px-2 py-1 bg-green-500 text-white rounded w-full"
        onClick={addItem}
      >
        Add Item
      </button>
    </div>
  );
}
