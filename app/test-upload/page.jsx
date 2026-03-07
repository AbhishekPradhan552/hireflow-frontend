"use client";

import { useState } from "react";

export default function TestUploadPage() {
  const [file, setFile] = useState(null);

  const upload = async () => {
    if (!file) {
      alert("Select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    const res = await fetch(
      "http://localhost:5001/candidates/e02772e0-33ab-4d7f-8e21-14773e71d4c3/resume",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjMWFkZTUzMy1lZTk2LTQ2ZDQtOGVkNC0xZTAxMDBkYTk5YzUiLCJpYXQiOjE3Njk0MTk2MjAsImV4cCI6MTc3MDAyNDQyMH0.XBdkc3vVTswwKMOWy7GftPkWBGxLrw3C1A_WOey5q-Y",
        },
        body: formData,
      }
    );

    const data = await res.json();
    console.log(data);
    alert("Uploaded");
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Resume Upload Test</h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={upload}>
        Upload Resume
      </button>
    </div>
  );
}
