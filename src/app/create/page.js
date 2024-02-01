"use client";
import Image from "next/image";
import Link from "next/link";
import style from "./page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useSession } from "next-auth/react";

export default function Create() {
  const { data: session, status } = useSession();
  let router = useRouter();
  const createProfile = async (newData) => {
    handleOpen();
    let data = await fetch(
      "/api/profile",
      {
        method: "POST",
        headers: {
          "content-header": "application/json",
        },
        body: JSON.stringify(newData),
      },
      { caches: "no-cache" }
    );
    data = await data.json();
    if (data.exist) {
      alert("User profile with this email alredy exists!");
      handleClose();
    } else if (data.success) {
      router.refresh();
      router.push("/");
      alert("User profile created!");
      handleClose();
    } else {
      alert("Server Error !.");
      handleClose();
    }
  };
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const [newImage, setNewImage] = useState("/user.jpeg");
  const [email, setemail] = useState(session?session.user.email:"");
  const [newName, setNewName] = useState(session?session.user.name:"");
  const [newCity, setNewCity] = useState("");
  const [newHeading, setNewHeading] = useState("");
  const [preview, setPreview] = useState("/user.jpeg");

  const imageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      const imageElement = document.createElement("img");
      imageElement.src = e.target.result;
      imageElement.onload = function (e) {
        const canvas = document.createElement("canvas");
        const MAX_WITDH = 150;
        const scaleSize = MAX_WITDH / e.target.width;
        canvas.width = MAX_WITDH;
        canvas.height = e.target.height * scaleSize;
        const context = canvas.getContext("2d");
        context.drawImage(e.target, 0, 0, canvas.width, canvas.height);
        const newBase64 = canvas.toDataURL("image/*");
        setPreview(newBase64);
        setNewImage(newBase64);
      };
    };
  };
  const createNewProfile = (e) => {
    e.preventDefault();
    let newData = {
      name: newName,
      email: email,
      city: newCity,
      heading: newHeading,
      avatar: newImage,
    };
    console.log(newData);
    createProfile(newData);
  };
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 5 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div>
        <form onSubmit={createNewProfile} method="post">
          <div className={style.cardContainer}>
            <Image
              priority
              className={style.round}
              width={130}
              height={130}
              src={preview}
              alt="user"
            />
            <br />
            <div className={style.inputImg}>
              <Button
                style={{ scale: 0.7, backgroundColor: "#37286b" }}
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                Upload Profile
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  id="image"
                  onChange={imageChange}
                />
              </Button>
              <br />
              <br />
              <label className={style.label}>
                <input
                  className={style.inputField}
                  type="text"
                  name="name"
                  id="name"
                  disabled
                  value={newName}
                  placeholder="Your Name"
                />
              </label>
              <br />
              <label className={style.label}>
                <input
                  className={style.inputField}
                  type="email"
                  name="email"
                  disabled
                  id="email"
                  value={email}
                  placeholder="Your Email"
                />
              </label>
              <br />
              <label className={style.label}>
                <input
                  className={style.inputField}
                  type="text"
                  name="city"
                  id="city"
                  required
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  placeholder="Your City"
                ></input>
              </label>
              <br />
              <label className={style.label}>
                <textarea
                  className={style.inputField}
                  value={newHeading}
                  name="heading"
                  id="heading"
                  required
                  onChange={(e) => setNewHeading(e.target.value)}
                  placeholder="Your Heading"
                />
              </label>
              <br />
              <button className={style.primary1} type="submit">
                SAVE
              </button>
              <Link href={"/"}>
                <button className={style.primary2}>BACK</button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
