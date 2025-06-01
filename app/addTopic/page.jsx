"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';


export default function AddTopic() {
  const [title, setTitle] = useState(" ");
  const [description, setDescription] = useState(" ");

  const router = useRouter();
  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(!title || !description){
      alert("This field is required!");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/topics", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({title, description}),
      });

      if(res.ok){
        router.push('/')
      }else{
        throw new Error("Failed to create a topic.")
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input 
        onChange={(e) => setTitle(e.target.value)}
        className=" border px-8 py-2 border-slate-400 rounded-xl" 
        placeholder="Topic"
        type="text"
      />

      <input 
        onChange={(e) =>setDescription(e.target.value)}
        className=" border h-14 px-8 py-2 border-slate-400 rounded-xl" 
        placeholder="Description"
        type="text" 
      />

      <button type="submit" className="bg-green-500 py-3 text-white font-bold rounded-md">
        Add
      </button>

    </form>
  );
}
