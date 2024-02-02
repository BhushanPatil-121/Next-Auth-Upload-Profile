import Image from "next/image";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import style from "./../page.module.css";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function users() {
  const session =await getServerSession(authOptions);
  const users = await prisma.profile.findUnique({
    where:{
      email:session.user.email
    }
  });
  return users;
}
export default async function Profile() {
  let user = await users();
  
  let im=user.avatar;
  const imageSrc= im;
  return (
    <main>
      <div className={style.cardContainer}>
        <div className={style.buttons}>
          <button className={style.primary}>
          <Link
            href={{
              pathname: "/editprofile",
              query: {
                email: user.email,
              },
            }} ><EditIcon fontSize="small" /> </Link>
            </button>
        </div>
        <Image
          className={style.round}
          width={150}
          height={150}
          src={imageSrc}
          alt="user"
        />
        <h3 className={style.h3}>{user.name}</h3>
        <h6 className={style.h6}>{user.city}</h6>
        <p className={style.p}>{user.heading}</p>
        <p className={style.pe}>Email - {user.email}</p>
      </div>
    </main>
  );
}
