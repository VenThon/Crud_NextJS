import React from 'react';
import RemoveBtn from './RemoveBtn';
import Link from 'next/link';
import {HiPencilAlt} from "react-icons/hi"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './ui/pagination';

const getTopicsApi = async() => {
  try {
   const res = await fetch("http://localhost:3000/api/topics", {
      cache: "no-store",

    });
    if(!res.ok){
      throw new Error("Failed to fetch api list topic. ")
    }
    return res.json();
    
  } catch (error) {
    console.log("Error loading topic: ", error)
    
  }
}

export default async function TopicList() {

  const { topics } = await getTopicsApi();
  return (
    <>
    {topics.map(t => (
      <div key={t._id} className="p-4 border-slate-300 border items-start my-3 flex justify-between">
        <div>
          <h2 className="font-bold text-2xl">{t.title}</h2>
          <div>{t.description}</div>
        </div>
        <div className="flex gap-2">
          <RemoveBtn id={t._id} />
          <Link href={`/editTopic/${t._id}`} className="text-blue-500">
              <HiPencilAlt size={24} />
          </Link>
        </div>
      </div>
    ))}
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#"> 1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
    </>
  );
}
