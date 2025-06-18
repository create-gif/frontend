import React, { useState } from "react";

export default function Profile() {
  const name = localStorage.getItem("userName");
  const email = localStorage.getItem("userEmail");
  const [bio, setBio] = useState(localStorage.getItem("userBio") || "");
  const [editMode, setEditMode] = useState(false);
  const [newBio, setNewBio] = useState(bio);

  const [isDark, setIsDark] = useState({
    backgroundColor: "white",
    color: "black",
  });
  const [mode, setMode] = useState("Enable Dark Mode");

  const handleSaveBio = () => {
    try {
      localStorage.setItem("userBio", newBio);
      setBio(newBio);
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Something went wrong.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const toggleStyle = () => {
    if (isDark.color === "white") {
      // Switch to Light
      setIsDark({
        color: "black",
        backgroundColor: "white",
      });
      setMode("Enable Dark Mode");
    } else {
      // Switch to Dark
      setIsDark({
        color: "white",
        backgroundColor: "black",
      });
      setMode("Enable Light Mode");
    }
  };

  return (
    <div className="container">
      <div className="form-container" style={isDark}>
        <div className="form">
          <h2>Dashboard</h2>
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Bio:</strong> {bio || "No bio yet."}
          </p>

          {editMode ? (
            <>
              <textarea
                rows="4"
                placeholder="Enter your bio"
                value={newBio}
                onChange={(e) => setNewBio(e.target.value)}
                className="Bio"
              ></textarea>
              <button onClick={handleSaveBio}>Save</button>
              <button onClick={() => setEditMode(false)}>Cancel</button>
            </>
          ) : (
            <button onClick={() => setEditMode(true)}>Edit Profile</button>
          )}

          <br />
          <br />
          <button onClick={handleLogout}>Logout</button>
        </div>

        <br />
        <button onClick={toggleStyle}>{mode}</button>
      </div>
    </div>
  );
}
