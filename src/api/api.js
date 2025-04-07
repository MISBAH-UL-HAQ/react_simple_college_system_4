
const API_BASE_URL = "https://localhost:7220/api";

// Fetch all departments
export function getDepartments() {
  return fetch(`${API_BASE_URL}/departments`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch departments.");
      }
      return response.json();
    });
}

// Add a new department
export function addDepartment(department) {
  return fetch(`${API_BASE_URL}/departments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(department),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to add department.");
      }
      return response.json();
    });
}

// Update an existing department
export function updateDepartment(department) {
  return fetch(`${API_BASE_URL}/departments/${department.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(department),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to update department.");
      }
      return response.json();
    });
}

// Delete a department
export function deleteDepartment(id) {
  return fetch(`${API_BASE_URL}/departments/${id}`, {
    method: "DELETE",
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to delete department.");
      }
      return true;
    });
}

// Fetch all students
export function getStudents() {
  return fetch(`${API_BASE_URL}/students`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch students.");
      }
      return response.json();
    });
}

// Add a new student
export function addStudent(student) {
  return fetch(`${API_BASE_URL}/students`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to add student.");
      }
      return response.json();
    });
}


// Update an existing student
export function updateStudent(student) {
    return fetch(`${API_BASE_URL}/students/${student.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to update student.");
        }
        if (response.status === 204) {

          return student;
        }
        return response.json();
      })
      .catch(error => {
        console.error("Error updating student:", error);
        throw error;  
      });
  }

// Delete a student
export function deleteStudent(id) {
  return fetch(`${API_BASE_URL}/students/${id}`, {
    method: "DELETE",
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to delete student.");
      }
      return true;
    });
}
