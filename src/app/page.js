"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default  function Home() {
  const router= useRouter();
  // const session = await getServerSession(authOptions);
  // const user = await prisma.profile.findUnique({
  //   where: {
  //     email: session.user.email,
  //   },
  // });
  useEffect(()=>{
    router.refresh();
  },[])
  return (
    <div>
      <h1>Welcome To Home</h1> 
    </div>
  );
  // let retries=5;
  // while(retries){
  //   try {
  //     var data = await User();
  //     return (
  //       <main>
  //         {data.length>0?<Profile/>:<Create/>}
  //       </main>
  //     );
  //   } catch (error) {
  //     console.log(error);
  //     retries -= 1 ;
  //     console.log("number of tries remain "+ retries);
  //     await new Promise(res=>setTimeout(res, 10000))
  //   }
  // }
}
