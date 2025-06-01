import React from 'react';
import RemoveBtn from './RemoveBtn';
import Link from 'next/link';
import {HiPencilAlt} from "react-icons/hi"

export default function TopicList() {
  return (
    <div className="p-4 border-slate-300 border items-start my-3 flex justify-between">
      <div>
         <h2 className="font-bold text-2xl">Topic Title</h2>
         <div>Descriptions</div>
      </div>
      <div className="flex gap-2">
        <RemoveBtn />
        <Link href={'/editTopic/123'} className="text-blue-500">
            <HiPencilAlt size={24} />
        </Link>
      </div>
    </div>
  );
}
