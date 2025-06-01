import React from 'react';

export default function AddTopic() {
  return (
    <form className="flex flex-col gap-4">
      <input 
        className=" border px-8 py-2 border-slate-400 rounded-xl" 
        placeholder="Topic"
        type="text"
      />

      <input 
        className=" border h-14 px-8 py-2 border-slate-400 rounded-xl" 
        placeholder="Description"
        type="text" 
      />

      <button className="bg-green-500 py-3 text-white font-bold rounded-md">
        Add
      </button>

    </form>
  );
}
