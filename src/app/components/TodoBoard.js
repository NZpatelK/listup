'use client';

import { useState, useRef } from 'react';
import List from '@/app/components/List';
import { v4 as uuidv4 } from 'uuid';

export default function TodoBoard() {
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const [lists, setLists] = useState([
    {
      id: uuidv4(),
      // orderNo: 1,
      name: 'To Do',
      items: [],
    },
    {
      id: uuidv4(),
      // orderNo: 2,
      name: 'In Progress',
      items: [],
    },
    {
      id: uuidv4(),
      // orderNo: 3,
      name: 'Done',
      items: [],
    },
  ]);

  const handleDragStart = (index) => {
    dragItem.current = index;
  };

  const handleDragEnter = (index) => {
    dragOverItem.current = index;
  };

  const handleDrop = () => {
    const copyLists = [...lists];
    const dragIndex = dragItem.current;
    const dropIndex = dragOverItem.current;

    if (dragIndex === dropIndex || dragIndex === null || dropIndex === null) return;

    const draggedList = copyLists[dragIndex];
    copyLists.splice(dragIndex, 1);
    copyLists.splice(dropIndex, 0, draggedList);

    setLists(copyLists);
    dragItem.current = null;
    dragOverItem.current = null;
  };

  const updateList = (updatedList) => {
    setLists((prevLists) =>
      prevLists.map((list) => (list.id === updatedList.id ? updatedList : list))
    );
  };

  const deleteList = (id) => {
    setLists((prev) => prev.filter((list) => list.id !== id));
  };

  const removeItemFromList = (listId, itemId) => {
    setLists((prevLists) =>
      prevLists.map((list) => {
        if (list.id === listId) {
          const newItems = list.items.filter((item) => item.id !== itemId);
          return { ...list, items: newItems };
        }
        return list;
      })
    );
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center p-4">
      {lists.map((list, index) => (
        <div
          key={list.id}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragEnter={() => handleDragEnter(index)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <List
            list={list}
            updateList={updateList}
            deleteList={deleteList}
            onItemDropFromOtherList={removeItemFromList}
          />
        </div>
      ))}
      <div className="bg-gray-200 border border-dashed border-gray-500 rounded-xl p-4 relative w-[300px] min-h-[300px] flex items-center justify-center">
        <button className='text-lg text-blue-500 font-bold' onClick={() => setLists([...lists, { id: uuidv4(), name: 'New List', items: [] }])}>
          Add List
        </button>
      </div>
    </div>
  );
}
