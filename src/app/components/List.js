'use client';
import { useState, useRef } from "react";
import Item from "@/app/components/Item";

export default function List({ list, updateList, deleteList }) {
    const [title, setTitle] = useState(list.name);
    const [items, setItems] = useState(list.items);
    const dragItem = useRef();
    const dragOverItem = useRef();

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        updateList({ ...list, name: e.target.value, items });
    };

    const addItem = () => {
        const newItem = { id: Date.now().toString(), content: "New Item" };
        const newItems = [...items, newItem];
        setItems(newItems);
        updateList({ ...list, name: title, items: newItems });
    };

    const updateItem = (updatedItem) => {
        const newItems = items.map((i) => (i.id === updatedItem.id ? updatedItem : i));
        setItems(newItems);
        updateList({ ...list, name: title, items: newItems });
    };

    const deleteItem = (id) => {
        const newItems = items.filter((i) => i.id !== id);
        setItems(newItems);
        updateList({ ...list, name: title, items: newItems });
    };

    const handleSort = () => {
        const _items = [...items];
        const draggedItemContent = _items.splice(dragItem.current, 1)[0];
        _items.splice(dragOverItem.current, 0, draggedItemContent);
        setItems(_items);
        updateList({ ...list, name: title, items: _items });
    };

    return (
        <div className="bg-white rounded-xl shadow p-4">
            <input
                className="text-xl font-semibold mb-2 w-full"
                value={title}
                onChange={handleTitleChange}
            />
            <button className="text-sm text-red-500 mb-2" onClick={() => deleteList(list.id)}>
                Delete List
            </button>
            <button className="mb-2 px-2 py-1 bg-green-500 text-white rounded" onClick={addItem}>
                Add Item
            </button>
            <div>
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        draggable
                        onDragStart={() => (dragItem.current = index)}
                        onDragEnter={() => (dragOverItem.current = index)}
                        onDragEnd={handleSort}
                        onDragOver={(e) => e.preventDefault()}
                        className="mb-2 transition-transform duration-200 hover:scale-[1.01]"
                    >
                        <Item item={item} updateItem={updateItem} deleteItem={deleteItem} />
                    </div>
                ))}
            </div>
        </div>
    );
}