import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(request,content){
        const existingUserByEmail = await prisma.user.findUnique({
            where:{email:content.params.email},
        });
        if(existingUserByEmail){
            return NextResponse.json({success:true})
        }else{
        return NextResponse.json({success:false})
        }
}

// export async function PUT(req, res){
//     const newData =await req.json();
//       const updateUser = await prisma.profile.update({
//         where: { email:newData.email } ,
//         data:{
//           name:newData.name,
//           heading:newData.heading,
//           avatar:newData.avatar,
//         }
//       });
//       return NextResponse.json({ result: updateUser, success: true });
// }