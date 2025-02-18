import dbConnect from "@/utils/dbConnect";
import Employee from "@/models/Employee";
import { NextResponse } from "next/server";

// 👉 GET all employees
export async function GET() {
  try {
    await dbConnect();
    const employees = await Employee.find({});
    return NextResponse.json(employees, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching employees", details: error.message }, { status: 500 });
  }
}

// 👉 POST a new employee
export async function POST(req) {
    try {
      await dbConnect();
      const { name, email, role } = await req.json();
  
      if (!name || !email || !role) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
      }
  
      const newEmployee = new Employee({ name, email, role }); 
      await newEmployee.save();
  
      return NextResponse.json(newEmployee, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: "Error creating employee", details: error.message }, { status: 500 });
    }
  }
  
  

// 👉 UPDATE an employee
export async function PUT(req) {
    try {
      await dbConnect();
      const { _id, name, email, role } = await req.json(); 
  
      if (!_id || !name || !email || !role) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
      }
  
      const updatedEmployee = await Employee.findByIdAndUpdate(
        _id, { name, email, role }, { new: true }
      );
  
      if (!updatedEmployee) {
        return NextResponse.json({ error: "Employee not found" }, { status: 404 });
      }
  
      return NextResponse.json(updatedEmployee, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Error updating employee", details: error.message }, { status: 500 });
    }
  }
  

// 👉 DELETE an employee
export async function DELETE(req) {
    try {
      await dbConnect();
      const { id } = await req.json(); 
  
      if (!id) {
        return NextResponse.json({ error: "ID is required" }, { status: 400 });
      }
  
      const deletedEmployee = await Employee.findByIdAndDelete(id);
  
      if (!deletedEmployee) {
        return NextResponse.json({ error: "Employee not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Employee deleted successfully" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Error deleting employee", details: error.message }, { status: 500 });
    }
  }
  
