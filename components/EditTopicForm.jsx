import React from 'react';

export default function EditTopicForm() {
  return (
     <form className="flex flex-col gap-4">
      <h2 className="font-bold">Update your Information here</h2>
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
        Save
      </button>

    </form>
  );
}
