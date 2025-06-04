import connectMongoDB from "@/libs/mongodb";
import Topic from "@/model/topic";
import { NextResponse } from "next/server";

export async function POST(request){
    const {title, description} = await request.json();
    await connectMongoDB();
    await Topic.create({title, description});
    return NextResponse.json({message: "Topic is create success."}, {status: 201})
}


// export async function GET() {
//     await connectMongoDB();
//     const topics = await Topic.find();
//     return NextResponse.json({topics});
// }

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get('id');
    await connectMongoDB();
    await Topic.findByIdAndDelete(id);
    return NextResponse.json({message: "Topic is delete success. "}, {status: 200})
    
}

export async function GET(request) {
    await connectMongoDB();

    const searchParams = request.nextUrl.searchParams;
    const title = searchParams.get('title');

    let topics;
    if (title) {
        // Use a regex for case-insensitive partial match
        topics = await Topic.find({ title: { $regex: title, $options: 'i' } });
    } else {
        topics = await Topic.find();
    }

    return NextResponse.json({ topics });
}
