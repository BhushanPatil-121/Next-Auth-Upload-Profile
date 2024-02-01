// server.js
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import prisma from "../../../lib/prisma";

//add user in data base
export async function POST(request) {
    
  const CryptoJS = require("crypto-js");
  const body = await request.json();
  const key = process.env.NEXT_PUBLIC_SECRET_KEY;
  let encryptedData = body.encryptedText;
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, key).toString(
      CryptoJS.enc.Utf8
    );
    console.log("Decrypted Text:", decrypted);
    return NextResponse.json({ success: true, decryptedText: decrypted });
  } catch (error) {
    console.error("Error decrypting:", error.message);
    return NextResponse.json({ success: false, error: "Decryption failed" });
  }
}
// const express = require('express');
// const bodyParser = require('body-parser');
// const CryptoJS = require('crypto-js');

// const app = express();
// const port = 3001;

// app.use(bodyParser.json());

// app.post('/decrypt', (req, res) => {
//   const { encryptedData } = req.body;
//   const key = 'yourSecretKey'; // Replace with your secret key

//   try {
//     const decrypted = CryptoJS.AES.decrypt(encryptedData, key).toString(CryptoJS.enc.Utf8);
//     console.log('Decrypted Text:', decrypted);
//     res.json({ success: true, decryptedText: decrypted });
//   } catch (error) {
//     console.error('Error decrypting:', error.message);
//     res.status(500).json({ success: false, error: 'Decryption failed' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
