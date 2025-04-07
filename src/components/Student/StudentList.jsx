import React, { useState, useEffect } from "react";
import { getStudents, deleteStudent } from "../../api/api";

function StudentList({ onEditStudent }) {
  const [students, setStudents] = useState([]);

  // Load students when the component mounts
  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (err) {
      console.error("Failed to load students:", err);
      alert("Could not fetch students. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this student?");
    if (!confirmDelete) return;

    try {
      await deleteStudent(id);
      alert("Student deleted.");
      loadStudents(); 
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete student.");
    }
  };

  return (
    <div className="table-container">
      <h2>Students</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.departmentId}</td>
              <td>
                <button onClick={() => onEditStudent(student)}>Edit</button>
                <button onClick={() => handleDelete(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
