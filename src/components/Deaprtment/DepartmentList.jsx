import React, { useState, useEffect } from "react";
import { getDepartments, deleteDepartment, updateDepartment } from "../../api/api";

function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState("");

  useEffect(() => {
    loadDepartments();
  }, []);

  // Load all departments
  const loadDepartments = async () => {
    try {
      const data = await getDepartments();
      setDepartments(data);
    } catch (err) {
      console.error("Error fetching departments:", err);
    }
  };

  // Delete department by ID
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this department?")) return;

    try {
      await deleteDepartment(id);
      loadDepartments();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

//   editing a department
  const handleEdit = (id, currentName) => {
    setEditingId(id);
    setEditedName(currentName);
  };

  // Save updated department
  const handleUpdate = async (id) => {
    if (!editedName.trim()) {
      alert("Department name cannot be empty.");
      return;
    }

    try {
      await updateDepartment({ id, name: editedName });
      setEditingId(null);
      setEditedName("");
      loadDepartments();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="table-container">
      <h2>Departments</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Department Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept) => (
            <tr key={dept.id}>
              <td>{dept.id}</td>
              <td>
                {editingId === dept.id ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                ) : (
                  dept.name
                )}
              </td>
              <td>
                {editingId === dept.id ? (
                  <>
                    <button onClick={() => handleUpdate(dept.id)}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(dept.id, dept.name)}>Edit</button>
                    <button onClick={() => handleDelete(dept.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DepartmentList;
