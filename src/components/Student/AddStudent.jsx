import React, { useState, useEffect } from "react";
import { addStudent, updateStudent } from "../../api/api";

function AddStudent({ onStudentSaved, selectedStudent, clearSelectedStudent }) {
  const [name, setName] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [studentId, setStudentId] = useState(null);

  // Load selected student's data if editing
  useEffect(() => {
    if (selectedStudent) {
      setName(selectedStudent.name);
      setDepartmentId(selectedStudent.departmentId);
      setStudentId(selectedStudent.id);
    } else {
      setName("");
      setDepartmentId("");
      setStudentId(null);
    }
  }, [selectedStudent]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const studentData = { name, departmentId };

    try {
      if (studentId) {
        const updated = await updateStudent({ ...studentData, id: studentId });
        alert("Student updated successfully!");
        onStudentSaved?.(updated);
      } else {
        const newStudent = await addStudent(studentData);
        alert("Student added successfully!");
        onStudentSaved?.(newStudent);
      }

      // Clear form after save
      setName("");
      setDepartmentId("");
      setStudentId(null);
      clearSelectedStudent?.();
    } catch (err) {
      console.error("Error saving student:", err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Department ID"
          value={departmentId}
          onChange={(e) => setDepartmentId(e.target.value)}
          required
        />
        <button type="submit">
          {studentId ? "Update Student" : "Add Student"}
        </button>
      </form>
    </div>
  );
}

export default AddStudent;
