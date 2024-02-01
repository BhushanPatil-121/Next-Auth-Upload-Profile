import { AppBar, Avatar, Button, CssBaseline, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import classes from './navbar.module.css'
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LogoutSwitch from "./ui/LogoutSwitch";

async function Navbar() {
  const session = await getServerSession(authOptions);
  if(session){
    let user = await prisma.profile.findUnique({
      where: {
        email: session.user.email,
      },
    });
  }
  return (
    <AppBar position="sticky">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          UPLOAD
        </Typography>
          <div className={classes.navlinks}>
          <Link href={"/"}>
            <Button variant="contained"
            style={{  backgroundColor: "transparent" ,border:"1px solid white"}}
            >HOME</Button>
          </Link>
          
          {
            session?
          <LogoutSwitch/>
          
          :
          <Link href={"/sign-in"}>
            <Button variant="contained"
            style={{  backgroundColor: "transparent" ,border:"1px solid white"}}
            >SIGN-IN</Button>
          </Link>
          }
            
          </div>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;