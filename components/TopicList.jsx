import React from 'react';
import RemoveBtn from './RemoveBtn';
import Link from 'next/link';
import {HiPencilAlt} from "react-icons/hi"

export default function TopicList() {
  return (
    <div>
      <div>
         <h2>Topic Titttle</h2>
         <div>Descriptions</div>
      </div>
      <div>
        <RemoveBtn />
        <Link href={'/editTopic/123'}>
            <HiPencilAlt size={24} />
        </Link>
      </div>
    </div>
  );
}
