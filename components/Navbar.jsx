import Link from 'next/link';
import React from 'react';

export default function Navbar() {
  return (
   <nav className="flex justify-between items-center text-xl font-bold bg-sky-700 px-8 py-5 text-white rounded-md">
    <Link href={"/"}>Hompage</Link>
    <Link className="bg-pink-50 text-black rounded-xl px-4" href={"/addTopic"}>Add</Link>
   </nav>
  );
}
