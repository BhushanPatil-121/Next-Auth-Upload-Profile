"use client";
import * as React from "react";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";
export default function LogoutSwitch() {
  const router = useRouter();
  const handleLogOut = () => {
    signOut({
      redirect: "/sign-in",
    });
  };
  const goToProfile = () => {
    router.push("/profile");
  };
  const goToCreateProfile = () => {
    router.push("/create");
  };
  const { data: session } = useSession();
  const [avatarImage, setavatarImage] = useState();
  const [name, setname] = useState()
  const [email, setemail] = useState()
  const [profileAvailable, setprofileAvailable] = useState(false);
  const fetchData = async () => {
    let profileData = await fetch("/api/profile/" + session.user.email, {
      caches: "no-cache",
    });
    profileData = await profileData.json();
    if (profileData.success) {
      let data = profileData.profile;
      // console.log(data);
      setprofileAvailable(true);
      setavatarImage(data.avatar);
      setname(data.name)
      setemail(data.email)
    } else {
      console.log("data");
    }
  };
  if (session) {
    fetchData();
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{ width: 40, height: 40, border: "1px solid white" }}
              src={avatarImage}
            ></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {profileAvailable ? (
          <>
            <p style={{display:"flex",justifyContent:"center" ,flexDirection:"column",padding:"0px 10px"}}>
              <span style={{fontWeight:"bold", fontSize:"20px"}}>{name}</span>
             <span style={{fontSize:"15px"}}>{email}</span>
            </p>
            {/* <MenuItem style={{display:"flex",justifyContent:"center" }}> */}
            {/* </MenuItem> */}
           
            <Divider />

            <MenuItem onClick={goToProfile}style={{display:"flex",justifyContent:"center" }}>
            <ListItemIcon>
          <Avatar sx={{ width: 30, height: 30 }} />
          </ListItemIcon> Profile
            </MenuItem>
          </>
        ) : (
          <MenuItem onClick={goToCreateProfile} style={{display:"flex",justifyContent:"center" }}>
          <ListItemIcon>
          <Avatar sx={{ width: 30, height: 30 }} />
          </ListItemIcon>
             CREATE PROFILE
          </MenuItem>
          
        )}
        
        <MenuItem onClick={handleLogOut}style={{display:"flex",justifyContent:"center" }}>
          <ListItemIcon>
            <Logout sx={{ width: 30, height: 30 }}/>
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
