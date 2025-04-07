import React, { useState } from "react";
import { addDepartment } from "../../api/api"; 

function AddDepartment({ onDepartmentAdded }) {
  const [name, setName] = useState("");  
  const [isSubmitting, setIsSubmitting] = useState(false); 

  // Handle form submission to add a department
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if the form is already submitting
    if (isSubmitting) return;
    setIsSubmitting(true); 

    // Call the API to add a department
    addDepartment({ name })
      .then((newDept) => {
        alert("Department added successfully!"); 
        setName(""); 
        if (onDepartmentAdded) {
          onDepartmentAdded(newDept); 
        }
      })
      .catch((error) => {
        console.error("Error adding department:", error);
        alert("Error adding department."); 
      })
      .finally(() => {
        setIsSubmitting(false); 
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)} 
          placeholder="Department Name"
          required
        />
        <button type="submit" disabled={isSubmitting}>Add Department</button>
      </form>
    </div>
  );
}

export default AddDepartment;
