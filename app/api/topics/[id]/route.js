import connectMongoDB from '@/libs/mongodb';
import Topic from '@/model/topic';
import { NextResponse } from 'next/server';

export async function PUT(request, {params}) {

    const {id} = params;
    // const { id } = params;
    const {newTitle: title, newDescription: description} = await request.json();
    await connectMongoDB();
    await Topic.findByIdAndUpdate(id, {title, description});

    return NextResponse.json({message: "Topic is update success."}, {status: 200})
}

export async function GET(request, {params}) {
    // const {params} = await contectPromise;
    const { id } = params;
    // const id = params?.id;
    await connectMongoDB();
    const topic = await Topic.findOne({_id: id});
    return NextResponse.json({topic}, {status: 200});
}