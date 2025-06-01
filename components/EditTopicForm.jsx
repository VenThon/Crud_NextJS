"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function EditTopicForm({id, title, description}) {

  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const router = useRouter();

  const handleSubmit = async(e) =>{
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: " PUT",
        headers: {
          "Content-type": "application/json",
        },
        body:JSON.stringify({newTitle, newDescription}), 
      });

      if(!res.ok){
        throw new Error("Failed to update topic.")
      }

      router.refresh();

      router.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
     <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="font-bold">Update your Information here</h2>
      <input 
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
        className=" border px-8 py-2 border-slate-400 rounded-xl" 
        placeholder="Topic"
        type="text"
      />

      <input 
        onChange={(e) => setNewDescription(e.target.value)}
        value={newDescription}
        className=" border h-14 px-8 py-2 border-slate-400 rounded-xl" 
        placeholder="Description"
        type="text" 
      />

      <button type="submit" className="bg-green-500 py-3 text-white font-bold rounded-md">
        Save
      </button>

    </form>
  );
}
