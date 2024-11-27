import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Read = () => {
  const [data, setData] = useState([]);

  // Fetch user data
  async function getData() {
    try {
      const response = await fetch("http://localhost:5000/read");
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch data");
      }

      setData(result);
    } catch (err) {
      toast.error(err.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  }

  // Handle delete operation
  async function handleDelete(id) {
    try {
      const response = await fetch(`http://localhost:5000/delete/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to delete");
      }

      toast.success("Deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });

      // Refresh data after deletion
      getData();
    } catch (err) {
      toast.error(err.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container my-4">
      <ToastContainer /> {/* Toast notifications */}
      <h1 className="text-center mb-4">User List</h1>
      {/* User Data Table */}
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((ele) => (
            <tr key={ele._id}>
              <td>{ele.name}</td>
              <td>{ele.email}</td>
              <td>{ele.age}</td>
              <td>
                <Link
                  to={`/${ele._id}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(ele._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Read;
