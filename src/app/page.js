"use client";

import { useState, useEffect } from "react";
// import { employees as initialEmployees } from "./data/employees";
import Employees from "@/components/Employee";

export default function Home() {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ name: "", email: "", role: "" });
  const [editEmployee, seteditEmployee] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch("/api/employees", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchdata();
  }, []);


  const handleAddEmployee = async () => {
    if (!newEmployee.name || !newEmployee.email || !newEmployee.role) {
      alert("Please fill in all fields");
      return;
    }

    const res = await fetch("/api/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEmployee),
    });

    if (res.ok) {
      const addedEmployee = await res.json();
      setEmployees([...employees, addedEmployee]);
      setNewEmployee({ name: "", email: "", role: "" });
    }
  }

  const handleEditEmployee = (emp) => {
    seteditEmployee(emp);
    setNewEmployee(emp);
  }

  const handleUpdateEmployee = async () => {
    const res = await fetch("/api/employees", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editEmployee._id, ...newEmployee }),
    });
  
    if (res.ok) {
      const updatedEmployee = await res.json();
      setEmployees(employees.map(emp => (emp._id === updatedEmployee._id ? updatedEmployee : emp)));
      seteditEmployee(null);
      setNewEmployee({ name: "", email: "", role: "" });
    }
  };

  const handleDeleteEmployee = async (_id) => {
    const res = await fetch("/api/employees", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: _id }), // You're using 'id' as the key
    });
  
    if (res.ok) {
      setEmployees(employees.filter(emp => emp._id !== _id));
    }
  }; 


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">User Management System</h1>
      <div className="bg-white p-4 shadow-md rounded-lg mb-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">{editEmployee ? 'Update Employee' : 'Add Employee'}</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newEmployee.name}
          onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newEmployee.email}
          onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={newEmployee.role}
          onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
        />
        {editEmployee ?
          <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600" onClick={handleUpdateEmployee}>
            Update Employee
          </button> : <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" onClick={handleAddEmployee}>
            Add Employee
          </button>

        }
      </div>

      <div className="grid md:grid-cols-3 gap-4 w-full max-w-4xl">
        {employees.map((employee) => (
          <Employees key={employee._id} employee={employee} OnEdit={handleEditEmployee} OnDelete={handleDeleteEmployee} />
        ))}
      </div>
    </div>
  );
}
