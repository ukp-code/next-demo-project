import connect from "@/utils/db"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import User from "@/models/User"

connect()

export const POST = async (request) => {
    try {
        const { name, email, password } = await request.json();
        const hashedPassword = await bcrypt.hash(password, 5)
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })
        await newUser.save()
        return NextResponse.json({ msg: "user created" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}