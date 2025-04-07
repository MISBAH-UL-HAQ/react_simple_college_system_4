import React, { useState } from "react";
import Header from "./components/Header";
import DepartmentList from "./components/Deaprtment/DepartmentList";
import AddDepartment from "./components/Deaprtment/AddDepartment";
import StudentList from "./components/Student/StudentList";
import AddStudent from "./components/Student/AddStudent";
import "./style.css";

function App() {
  // Flag to refresh the student list when changes occur.
  const [studentRefresh, setStudentRefresh] = useState(false);
  // Hold a student for editing.
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Toggle the student refresh flag after save.
  const handleStudentSaved = () => {
    setStudentRefresh(!studentRefresh);
  };

  // Set a student to be edited.
  const handleEditStudent = (student) => {
    setSelectedStudent(student);
  };

  // Clear the selected student after editing.
  const clearSelectedStudent = () => {
    setSelectedStudent(null);
  };

  return (
    <div className="main-container">
      <Header />
      <h2>Departments</h2>
      <AddDepartment onDepartmentAdded={() => {}} />
      <DepartmentList />

      <h2>Students</h2>
      <AddStudent
        onStudentSaved={handleStudentSaved}
        selectedStudent={selectedStudent}
        clearSelectedStudent={clearSelectedStudent}
      />
      <StudentList onEditStudent={handleEditStudent} key={studentRefresh} />
    </div>
  );
}

export default App;
