import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(request, content) {
  let email = (content.params.email);
  const existingUserByEmail = await prisma.profile.findUnique({
    where: { email: email },
  });
  if (existingUserByEmail) {
    return NextResponse.json({ profile: existingUserByEmail, success: true });
  } else {
    return NextResponse.json({ profile: null, success: false });
  }
}
export async function PUT(req, res) {
  const newData = await req.json();
  const { id, name, city, heading, avatar } = newData;
  let fid = parseInt(id);
  const updateUser = await prisma.profile.update({
    where: { id: fid },
    data: {
      name,
      city,
      heading,
      avatar,
    },
  });
  if(updateUser){
    return NextResponse.json(
      {
        result: updateUser,
        message: "User profile updated successfully ",
        success: true,
      },
      { status: 201 }
    );
  }
  return NextResponse.json(
    {
      result: null,
      message: "Error! ",
      success: false,
    },
    { status: 500 }
  );
}
export async function DELETE(request, content) {
  let fid = (content.params.email);
  const existingUserByEmail = await prisma.profile.delete({
    where: { email: fid },
  });
  if (existingUserByEmail) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
