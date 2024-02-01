"use client"
import { signIn } from "next-auth/react";
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
  Backdrop,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import { useState,useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
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

export default function SignInForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
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
        email: email,
        password: password,
      };
      handleLogin(loginData);
    }
  };
  const handleLogin = async (loginData) => {
    handleOpen();
    if (loginData.email && loginData.password) {
      
      let existUser = await fetch(`/api/user/${loginData.email}`)
      existUser = await existUser.json();
      if(!existUser.success){
        alert("User not found ! Create your account  ")
        router.push(`/sign-up`);
        handleClose();
      }else{
        const key = process.env.NEXT_PUBLIC_SECRET_KEY;
      try {
        const encrypted = CryptoJS.AES.encrypt(password, key).toString();
        const signInData = await signIn("credentials", {
          email:loginData.email,
          password:encrypted,
          redirect: false,
        });
        if(signInData?.error){
        alert("Credentials not match !")
        handleClose();
        }else{
        router.push("/")
        handleClose();
        }
      } catch (error) {
        alert("Something went wrong!!");
        handleClose();
      }
        
      }
      
    } else {
      handleClose();
      alert("Please Filled email and password");
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
            Sign In</center>
        </Typography>
        <br />

        <form onSubmit={handleSubmit} method="post">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={email}
                onChange={(e)=>{
                  setemail(e.target.value)
                  if ( email.length>6 && password.length>6) {
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
                  if ( email.length>6 && password.length>6) {
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
              <Link href="/sign-up" variant="body2">
                Dont have an account? <span style={{color:"blue"}}>Sign up</span> now
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