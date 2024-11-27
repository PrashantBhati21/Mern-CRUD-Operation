import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Create = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [errors, setErrors] = useState({}); // Track validation errors

  const navigate = useNavigate();

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required.";
    } else if (name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters.";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)
    ) {
      newErrors.email = "Invalid email format.";
    }

    if (!age) {
      newErrors.age = "Age is required.";
    } else if (!Number.isInteger(Number(age))) {
      newErrors.age = "Age must be a whole number.";
    } else if (age <= 0) {
      newErrors.age = "Age must be a positive number.";
    } else if (age > 100) {
      newErrors.age = "Age must not exceed 100.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the form errors.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const addUser = { name, email, age: Number(age) };

    try {
      const response = await fetch("http://localhost:5000/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addUser),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Something went wrong!", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      toast.success("User created successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      // Clear form fields
      setName("");
      setEmail("");
      setAge("");

      // Redirect to user list page
      setTimeout(() => {
        navigate("/read");
      }, 2000);
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleAgeChange = (e) => {
    const value = e.target.value;

    // Ensure age is a non-negative integer and not a decimal
    if (/^\d*$/.test(value)) {
      setAge(value);
    }
  };

  return (
    <div className="container my-4">
      <ToastContainer /> {/* Toast notifications */}
      <h1 className="text-center">Create User</h1>
      {/* Form for creating users */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="text"
            className={`form-control ${errors.age ? "is-invalid" : ""}`}
            value={age}
            onChange={handleAgeChange}
          />
          {errors.age && <div className="invalid-feedback">{errors.age}</div>}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Create;
