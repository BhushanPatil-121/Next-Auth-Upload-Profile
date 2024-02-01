"use client";

import style from "./page.module.css";
import {
  Avatar,
  CssBaseline,
  Typography,
  Container,
  Box,
  Grid,
  Button,
  TextField,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CryptoJS from 'crypto-js';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
      Blooger app
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignUpForm() {
  let router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("")
  const [isdisable, setisdisable] = useState(true)
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (isdisable) {
        alert("password should be 8 letter or more")
      }else{
        let loginData = {
          name:name,
          email: email,
          password: password,
        };
        handleLogin(loginData);
      }
    };
  
  const handleLogin = async (loginData) => {
    handleOpen();
    if (loginData.name && loginData.email && loginData.password) {
      const key = process.env.NEXT_PUBLIC_SECRET_KEY;
      try {
      const encrypted = CryptoJS.AES.encrypt(loginData.password, key).toString(); 
      loginData.password=encrypted
      console.log(loginData.password);
      let signUp = await fetch('/api/user/' ,{
          method:"post",
          headers:{
            "content-type": "application/json"
          },
          body:JSON.stringify(loginData)
        });
        const data = await signUp.json();
        if (data.success ) {
          alert("User Account Created Successfully!")
          router.push("/sign-in");
          handleClose();
        } else {
          alert("Email Alredy Link !");
          handleClose()
        }
      } catch (error) {
        console.log(error);
        alert("Something went wrong!!");
        handleClose();
      }
    } else {
      handleClose();
      alert("Server Error!");
    }
  };
  
  return (
    <>
    <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    <Container component="main" maxWidth="xs" className={style.signupform}>
      
      <CssBaseline />
      <div>
        <br />
        <Typography component="h1" variant="h5">
          <center>
            <Avatar></Avatar>
            Sign Up</center>
        </Typography>
        <br />

        <form onSubmit={handleSubmit} method="post">
          <Grid container spacing={2}>
            {/* <Grid item xs={12}>
              <Image
                className={style.round}
                width={100}
                height={100}
                src={preview}
                alt="user"
              />
            </Grid>
            <Grid item xs={12} >
              <center><Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                Upload Profile
                <input type="file" hidden onChange={imageChange} accept="image/*"/>
              </Button></center>
            </Grid> */}
            <Grid item xs={12} >
              <TextField
                autoComplete="name"
                name="name"
                value={name}
                onChange={(e)=>{
                  setname(e.target.value)
                  if (name.length>1 && email.length>6 && password.length>6) {
                    setisdisable(false)
                  }else{
                    setisdisable(true)
                  }
                }}
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Your Name"
                autoFocus
              />
            </Grid>
          
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={email}
                onChange={(e)=>{
                  setemail(e.target.value)
                  if (name.length>1 && email.length>6 && password.length>6) {
                    setisdisable(false)
                  }else{
                    setisdisable(true)
                  }
                }}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={password}
                onChange={(e)=>{
                  setpassword(e.target.value)
                  if (name.length>1 && email.length>6 && password.length>6) {
                    setisdisable(false)
                  }else{
                    setisdisable(true)
                  }
                }}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                />
            </Grid>
          </Grid>
          <br />
          <Button type="submit" style={isdisable?{backgroundColor:'grey'}:{backgroundColor:'blue'}} className={style.create} fullWidth variant="contained">
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <br />
              <Link href="/sign-in" variant="body2">
                Already have an account? <span style={{color:"blue"}}>Sign in</span>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={2}>
        <Copyright />
      </Box>
    </Container>
                </>
  );
}
