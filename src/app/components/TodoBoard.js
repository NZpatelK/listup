'use client';

import { useState, useRef } from 'react';
import List from '@/app/components/List';
import { v4 as uuidv4 } from 'uuid';

export default function TodoBoard() {
  const[isItemDragging, setIsItemDragging] = useState(false);
  const dragListStartIndex = useRef(null);
  const dragListOverIndex = useRef(null);

  const [lists, setLists] = useState([
    {
      id: uuidv4(),
      name: 'To Do',
      items: [],
    },
    {
      id: uuidv4(),
      name: 'In Progress',
      items: [],
    },
    {
      id: uuidv4(),
      name: 'Done',
      items: [],
    },
  ]);

  const handleListDragStart = (e, index) => {
    if(isItemDragging) return; // ignore if an item is being dragged
    dragListStartIndex.current = index;
    e.dataTransfer.setData('type', 'list');
  };

  const handleListDragEnter = (index) => {
    dragListOverIndex.current = index;
  };

  const handleListDrop = (e) => {
    if(isItemDragging) return; 
    const type = e.dataTransfer.getData('type');
    if (type !== 'list') return; // ignore if not dragging a list

    const dragIndex = dragListStartIndex.current;
    const dropIndex = dragListOverIndex.current;
    if (dragIndex === dropIndex || dragIndex == null || dropIndex == null) return;

    const copy = [...lists];
    const draggedList = copy[dragIndex];
    copy.splice(dragIndex, 1);
    copy.splice(dropIndex, 0, draggedList);

    setLists(copy);
    dragListStartIndex.current = null;
    dragListOverIndex.current = null;
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
      prevLists.map((list) =>
        list.id === listId
          ? { ...list, items: list.items?.filter((item) => item.id !== itemId) }
          : list
      )
    );
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center p-4">
      {lists.map((list, index) => (
        <div
          key={list.id}
          draggable
          onDragStart={(e) => handleListDragStart(e, index)}
          onDragEnter={() => handleListDragEnter(index)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleListDrop}
        >
          <List
            list={list}
            updateList={updateList}
            deleteList={deleteList}
            onItemDropFromOtherList={removeItemFromList}
            setIsItemDragging={setIsItemDragging}
          />
        </div>
      ))}
      <div className="bg-gray-200 border border-dashed border-gray-500 rounded-xl p-4 relative w-[300px] min-h-[300px] flex items-center justify-center">
        <button
          className="text-lg text-blue-500 font-bold"
          onClick={() =>
            setLists([...lists, { id: uuidv4(), name: 'New List', items: [] }])
          }
        >
          Add List
        </button>
      </div>
    </div>
  );
}
