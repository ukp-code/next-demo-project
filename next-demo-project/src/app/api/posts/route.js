import Post from "@/models/Post"
import connect from "@/utils/db"
import { NextResponse } from "next/server"


connect()

export const GET = async (request) => {
    const username=request.nextUrl.searchParams.get("username")
    // const {url}=request
    // console.log(url);
    // const url = new URL(request.json())
    // const username = url.searchParams.get("username")
    // const searchParams = useSearchParams()
 
//   const search = searchParams.get('username')
    // return new NextResponse(username, { status: 200 })
    // console.log(await request.json());
    // return await request.json()
    // return 'hi'
    try {
        const posts = await Post.find(username && {username })
        return new NextResponse(JSON.stringify(posts), { status: 200 })
    } catch (error) {
        return new NextResponse(error, { status: 500 })
    }
}

export const POST = async (request) => {
    const body = await request.json()

    const newPost = new Post(body)

    try {
        await newPost.save()
        return new NextResponse("new post created", { status: 201 })
    } catch (error) {
        return new NextResponse(error, { status: 500 })
    }
}