'use client';
import { useState } from "react";

export default function Item({ item, updateItem, deleteItem }) {
    const [text, setText] = useState(item.content);

    const handleChange = (e) => {
        setText(e.target.value);
        updateItem({ ...item, content: e.target.value });
    };

    return (
        <div className="flex items-center gap-2">
            <input
                className="flex-grow p-2 border rounded"
                value={text}
                onChange={handleChange}
            />
            <button className="text-red-500" onClick={() => deleteItem(item.id)}>
                ❌
            </button>
        </div>
    )
};