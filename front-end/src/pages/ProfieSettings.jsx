import React, { useState } from "react";
import { Button } from "@mui/material";

function ProfileSettings() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "ProfileImage");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dkm0i3zpe/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      setImageUrl(data.secure_url);
      console.log(imageUrl);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-center text-3xl font-bold mb-6 text-gray-800">
        Profile Image Upload
      </h2>

      <div className="border-2 border-dashed border-blue-500 rounded-lg h-48 flex items-center justify-center bg-gray-50 hover:shadow-md transition duration-300 relative cursor-pointer">
        <input
          type="file"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="text-center">
          <img
            src="https://img.icons8.com/dusk/64/000000/file.png"
            alt="Upload Icon"
            className="mx-auto mb-2"
          />
          <p className="text-gray-600 font-semibold">Click or drag a file</p>
          <p className="text-gray-400 text-sm">Upload your profile picture</p>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          className="text-white"
        >
          Upload
        </Button>
      </div>

      {imageUrl && (
        <div className="mt-8 text-center">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">
            Uploaded Image
          </h3>
          <img
            src={imageUrl}
            alt="Uploaded"
            className="mx-auto w-64 rounded-lg shadow-md"
          />
        </div>
      )}
    </div>
  );
}

export default ProfileSettings;
