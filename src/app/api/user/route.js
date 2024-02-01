import { NextResponse } from "next/server";
import { hash} from 'bcrypt'
import prisma from "../../../lib/prisma";
import CryptoJS from "crypto-js";

//add user in data base
export async function POST(request){
    const body =await request.json();
    const {name,email,password} = body;
    // to verify user is alredy exist or not 
    const existingUserByEmail = await prisma.user.findUnique({
        where:{email:email}
    });
    if (existingUserByEmail) {
        return NextResponse.json({user:null,message:"User alredy exists",success:false},{status:409})
    }
    const key = process.env.NEXT_PUBLIC_SECRET_KEY;
    let encryptedData = password;
    try {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, key).toString(CryptoJS.enc.Utf8);
    const hashedPass = await hash(decrypted, 10);
    const newUser = await prisma.user.create({
        data:{
            name,
            email,
            password:hashedPass
        }
    })
    const {password: newUserPassword, ...rest}=newUser;
    return NextResponse.json({user:rest,message:"user created successfully",success:true},{status:201})
   } catch (error) {
    return NextResponse.json({message:"Something Went Wrong !"},{status:500})
   }
}