'use client';

import { useState, useRef, useEffect } from 'react';
import List from '@/app/components/List';
import { getAllLists, addList, updateListById, deleteListById } from '@/lib/firestore';
// import { v4 as uuidv4 } from 'uuid';

export default function TodoBoard() {
  const [isItemDragging, setIsItemDragging] = useState(false);
  const dragListStartIndex = useRef(null);
  const dragListOverIndex = useRef(null);

  const [lists, setLists] = useState([
    // {
    //   id: uuidv4(),
    //   name: 'List 1',
    //   items: [],
    // },
  ]);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const fetchedLists = await getAllLists();
        console.log('Fetched lists:', fetchedLists);
        const sortedLists = fetchedLists.sort((a, b) => a.orderNo - b.orderNo);
        setLists(sortedLists);
      } catch (error) {
        console.error('Error fetching lists:', error);
      }
    };

    fetchLists();
  }, []);


  const handleListDragStart = (e, index) => {
    if (isItemDragging) return; // ignore if an item is being dragged
    dragListStartIndex.current = index;
    e.dataTransfer.setData('type', 'list');
  };

  const handleListDragEnter = (index) => {
    dragListOverIndex.current = index;
  };

  const handleListDrop = (e) => {
    if (isItemDragging) return;
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
    // Update the lists in Firestore
    copy.forEach((list, index) => {
      updateListById(list.id, { name: list.name, items: list.items, orderNo: index + 1 });
    });
    
    console.log('Lists reordered:', copy);
    dragListStartIndex.current = null;
    dragListOverIndex.current = null;
  };

  const addNewList = async (list) => {
    try {
      const newList = await addList(list);
      setLists((prev) => [...prev, newList]);
    } catch (error) {
      console.error('Error adding list:', error);
    }
  }

  const updateList = async (updatedList) => {
    try {
      await updateListById(updatedList.id, updatedList);
      setLists((prevLists) =>
        prevLists.map((list) => (list.id === updatedList.id ? updatedList : list))
      );
    } catch (error) {
      console.error('Error updating list:', error);
    }
  };

  const deleteList = async (id) => {
    try {
      await deleteListById(id);
      setLists((prev) => prev.filter((list) => list.id !== id));
      console.log('List deleted successfully');
    } catch (error) {
      console.error('Error deleting list:', error);
    }
  };

  const removeItemFromList = async (listId, itemId) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? { ...list, items: list.items?.filter((item) => item.id !== itemId) }
          : list
      )
    );

    await updateListById(listId, {
      items: lists.find((list) => list.id === listId).items.filter((item) => item.id !== itemId),
    });
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
            deleteList={() => deleteList(list.id)}
            onItemDropFromOtherList={removeItemFromList}
            setIsItemDragging={setIsItemDragging}
          />
        </div>
      ))}
      <div className="bg-gray-200 border border-dashed border-gray-500 rounded-xl p-4 relative w-[300px] min-h-[300px] flex items-center justify-center">
        <button
          className="text-lg text-blue-500 font-bold"
          onClick={() => {
            addNewList({ name: `List ${lists.length + 1}`, orderNo: lists.length + 1, items: [] });
          }}
        >
          Add List
        </button>
      </div>
    </div>
  );
}
