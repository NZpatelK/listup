"use client";
import { useState, useEffect } from "react";
import List from "@/app/components/List";
import { v4 as uuidv4 } from "uuid";

export default function TodoBoard() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    // Load lists from DynamoDB
  }, []);

  const addList = () => {
    const newList = { id: uuidv4(), name: "New List", items: [] };
    setLists([...lists, newList]);
    // Save to DynamoDB
  };

  const updateList = (updatedList) => {
    const newLists = lists.map((l) => (l.id === updatedList.id ? updatedList : l));
    setLists(newLists);
    // Save to DynamoDB
  };

  const deleteList = (id) => {
    const newLists = lists.filter((l) => l.id !== id);
    setLists(newLists);
    // Delete from DynamoDB
  };

  return (
    <div>
      <button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={addList}>
        Add List
      </button>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lists.map((list) => (
          <List key={list.id} list={list} updateList={updateList} deleteList={deleteList} />
        ))}
      </div>
    </div>
  );
}