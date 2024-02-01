"use client";
// ClientComponent.jsx
import React, { useState, useEffect, useCallback } from 'react';
import CryptoJS from 'crypto-js';

const ClientComponent = () => {
  const [text, setText] = useState('');
  const [encryptedText, setEncryptedText] = useState('');

  const encryptText = async () => {
    if (!text) {
      console.error('Text is undefined or empty.');
      return;
    }

    const key = process.env.NEXT_PUBLIC_SECRET_KEY;

    try {
      const encrypted = CryptoJS.AES.encrypt(text, key).toString();
      setEncryptedText(encrypted);
    } catch (error) {
      console.error('Error encrypting:', error.message);
    }
  };

  const sendEncryptedTextToServer = useCallback(async () => {
    try {
      let response =  await fetch(`/api/ed`, {
        method: "POST",
        body: JSON.stringify({ encryptedText }),
      });
      response =await response.json();
      console.log('Server response:', response.decryptedText);
    } catch (error) {
      console.error('Error sending encrypted text to server:', error.message);
    }
  }, [encryptedText]);

  useEffect(() => {
    if (encryptedText !== '') {
      // Call the function to send encrypted text to the server
      sendEncryptedTextToServer();
    }
  }, [encryptedText, sendEncryptedTextToServer]);

  return (
    <div>
      <div>
        <label>Enter Text:</label>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <div>
        <button onClick={encryptText}>Encrypt and Send to Server</button>
      </div>
      <div>
        <label>Encrypted Text:</label>
        <div>{encryptedText}</div>
      </div>
    </div>
  );
};



  
export default ClientComponent;
