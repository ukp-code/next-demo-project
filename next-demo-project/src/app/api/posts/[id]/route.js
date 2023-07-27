import Post from "@/models/Post"
import connect from "@/utils/db"
import { NextResponse } from "next/server"

connect()

export const GET = async (request, { params }) => {
    try {
        const { id } = params
        const post = await Post.findById(id)
        return new NextResponse(JSON.stringify(post), { status: 200 })
    } catch (error) {
        return new NextResponse(error, { status: 500 })
    }
}

export const DELETE = async (request, { params }) => {
    try {
        const { id } = params
        await Post.findByIdAndDelete(id)
        return new NextResponse("Post has been deleted", { status: 200 })
    } catch (error) {
        return new NextResponse.json(error, { status: 500 })
    }
}