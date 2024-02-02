"use client";
import Image from "next/image";
import Link from "next/link";
import style from "./page.module.css";
import { useEffect, useState } from "react";
import { DeleteOutline } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import { Button, CircularProgress, Backdrop } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useRouter } from "next/navigation";

export default function EditProfile({ searchParams }) {
  let router = useRouter();
  let emailId = searchParams.email;
  
  useEffect(() => {
    const fetchData = async () => {
      if(window.location.hostname === 'localhost') {
        let profileData = await fetch("/api/profile/" + emailId);
        profileData = await profileData.json();
        if (profileData.success) {
          let data = profileData.profile;
          setnewId(data.id);
          setPreview(data.avatar);
          setNewName(data.name);
          setemail(data.email);
          setNewCity(data.city);
          setNewHeading(data.heading);
        }
        else{
           router.push("/")
         }
      }
    };
    fetchData();
  }, [emailId , router]);
  const updateData2 = async () => {
    let newData = {
      id: newId,
      name: newName,
      city: newCity,
      heading: newHeading,
      avatar: newImage,
    };
    handleOpen();
    try {
      const data = await fetch("/api/profile/" + emailId, {
        method: "PUT",
        body: JSON.stringify(newData),
      });
      const profile = await data.json();
      if (profile.success) {
        alert("Profile Updated Successfully!!");
        router.push("/profile")
        handleClose();
      } else {
        alert("Error! please try after few minutes.");
        handleClose();
      }
    } catch (error) {
      alert("Error! please try after few minutes.");
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
  const [newId, setnewId] = useState("");
  const [email, setemail] = useState("");
  const [newImage, setNewImage] = useState();
  const [newName, setNewName] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newHeading, setNewHeading] = useState("");
  const [preview, setPreview] = useState("");
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

  const handleDelete = async () => {
    let text = "Press OK to Delete";
    if (confirm(text) == true) {
      let data = await fetch("/api/profile/" + emailId, {
        method: "DELETE",
        body: JSON.stringify({ emailId }),
      });
      data = await data.json();
      if (data.success) {
        router.refresh();
        alert("Profile Deleted!");
        router.push("/");
      } else {
        alert("Error !");
      }
    } else {
      alert("You canceled!");
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
      <div>
        <button className={style.primary} onClick={handleDelete}>
          <DeleteOutline sx={{ color: red[500] }} fontSize="small" />
        </button>
        <form onSubmit={updateData2}>
          <div className={style.cardContainer}>
            {preview ? (
              <Image
                className={style.round}
                width={130}
                height={130}
                src={preview}
                alt="user"
              />
            ) : (
              <Image
                className={style.round}
                width={130}
                height={130}
                src="/loading.png"
                alt="user"
                priority
              />
            )}

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
                  required
                  autoFocus
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Your Name"
                />
              </label>
              <br />
              <label className={style.label}>
                <input
                  className={style.inputField}
                  value={email}
                  placeholder="Your Email"
                  disabled
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
                UPDATE
              </button>
              <Link href={"/profile"}>
                <button className={style.primary2}>BACK</button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
  // return (
  //   <div>
  //     <div className={style.cardContainer}>
  //     <div className={style.buttons}>
  //         <button className={style.primary} onClick={handleClick}>
  //         <DeleteOutline sx={{color: red[500]}} fontSize="small" />
  //           </button>
  //       </div>
  //       {preview ? (
  //         <Image
  //           className={style.round}
  //           width={150}
  //           height={150}
  //           src={preview}
  //           alt="user"
  //         />
  //       ) : (
  //         <Image
  //           className={style.round}
  //           width={150}
  //           height={150}
  //           src="/loading.png"
  //           alt="user"
  //           priority
  //         />
  //       )}
  //       <br />
  //       <div className={style.inputImg}>
  //         {/* <form onSubmit={update} method="Put" > */}
  //         <input
  //           accept="image/*"
  //           type="file"
  //           name="image"
  //           id="image"
  //           onChange={imageChange}
  //         />
  //         <br />
  //         <br />
  //         <label className={style.label}>
  //           <input
  //             className={style.inputField}
  //             type="text"
  //             name="name"
  //             id="name"
  //             autoFocus
  //             value={newName}
  //             onChange={(e) => setNewName(e.target.value)}
  //             placeholder="Your Name"
  //           />
  //         </label>
  //         <br />
  //         <label className={style.label}>
  //           <input
  //             className={style.inputField}
  //             type="text"
  //             name="city"
  //             id="city"
  //             value={newCity}
  //             onChange={(e) => setNewCity(e.target.value)}
  //             placeholder="Your City"
  //           ></input>
  //         </label>
  //         <br />
  //         <label className={style.label}>
  //           <textarea
  //             className={style.inputField}
  //             value={newHeading}
  //             name="heading"
  //             id="heading"
  //             onChange={(e) => setNewHeading(e.target.value)}
  //             placeholder="Your Heading"
  //           />
  //         </label>
  //         <br />
  //         <button className={style.primary1} onClick={update}>
  //           UPDATE
  //         </button>
  //         <Link href={"/profile"}>
  //           <button className={style.primary2}>BACK</button>
  //         </Link>
  //         {/* </form> */}
  //       </div>
  //     </div>
  //   </div>
  // );
}
