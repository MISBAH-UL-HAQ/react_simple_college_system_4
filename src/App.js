
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import DepartmentList from "./components/Deaprtment/DepartmentList";
import AddDepartment from "./components/Deaprtment/AddDepartment";
import StudentList from "./components/Student/StudentList";
import AddStudent from "./components/Student/AddStudent";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import "./style.css";

function App() {
  // Clear any stored token on start so we always start unauthenticated.
  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  // Force isAuthenticated to false (even if token exists)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Start with the login view by default. (You can change this to "register" if desired)
  const [showAuth, setShowAuth] = useState("login");

  const handleLoginSuccess = (token) => {
    //  set the token in localStorage upon successful login.
    localStorage.setItem("token", token);
    // Mark the user as authenticated and hide the auth forms.
    setIsAuthenticated(true);
    setShowAuth(null);
  };

  // For demonstration: refresh and edit logic for students.
  const [studentRefresh, setStudentRefresh] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleStudentSaved = () => {
    setStudentRefresh(!studentRefresh);
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
  };

  const clearSelectedStudent = () => {
    setSelectedStudent(null);
  };

  return (
    <div className="main-container">
      <Header />
      
      {/* Show login/register if user is not authenticated */}
      {!isAuthenticated && (
        <div>
          <button onClick={() => setShowAuth("login")}>Login</button>
          <button onClick={() => setShowAuth("register")}>Register</button>
          {showAuth === "login" && <Login onLoginSuccess={handleLoginSuccess} />}
          {showAuth === "register" && <Register />}
        </div>
      )}

      {/* Show main dashboard only when authenticated */}
      {isAuthenticated && (
        <>
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
        </>
      )}
    </div>
  );
}

export default App;
