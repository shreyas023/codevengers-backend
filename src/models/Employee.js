import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true }
}, { timestamps: true });

export default mongoose.models.Employee || mongoose.model("Employee", EmployeeSchema);
