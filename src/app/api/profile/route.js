import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function POST(req, res) {
  const newData = await req.json();
  const { name, email, city, heading, avatar } = newData;
  try {
    const userExist = await prisma.profile.findUnique({
      where: { email: email }
    });
    if (userExist) {
      return NextResponse.json(
        {
          result: null,
          message: "User profile with this email alredy exists!",
          exist:true,
        },
        { status: 409 }
      );
    }
    const createUser = await prisma.profile.create({
      data: {
        name,
        email,
        city,
        heading,
        avatar,
      },
    });
    return NextResponse.json(
      { result: createUser, message: "User profile created successfully " ,exist:false,
      success:true
    },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { result: null, message: "Error!!",exist:false, success:false },
      { status: 500 }
    );
  }
}
