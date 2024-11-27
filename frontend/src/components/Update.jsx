import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [originalData, setOriginalData] = useState({}); // Store initial data for comparison

  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch single user data
  const getSingleData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/read/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const result = await response.json();
      setName(result.name || "");
      setEmail(result.email || "");
      setAge(result.age || "");
      setOriginalData(result); // Store the original data
    } catch (err) {
      toast.error(err.message, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // Validate if the user has made any changes
  const hasDataChanged = () => {
    return (
      name.trim() !== originalData.name ||
      email.trim() !== originalData.email ||
      String(age).trim() !== String(originalData.age)
    );
  };

  // Update user data
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!hasDataChanged()) {
      toast.error("No changes detected. Update the data to save.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const updatedUser = { name, email, age: Number(age) };

    try {
      const response = await fetch(`http://localhost:5000/edit/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update user");
      }

      toast.success("User updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      // Redirect after a short delay
      setTimeout(() => navigate("/read"), 3000);
    } catch (err) {
      toast.error(err.message, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    getSingleData();
  }, []);

  return (
    <div className="container my-2">
      <ToastContainer /> {/* Required for displaying toast notifications */}
      <h1 className="h1 text-center">Edit Data</h1>
      <form className="form" onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-info">
          Update
        </button>
      </form>
    </div>
  );
};

export default Update;
