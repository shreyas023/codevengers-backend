export default function Employees({ employee, OnEdit, OnDelete }) {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-start space-y-2 border">
            <h3 className="text-lg font-semibold">{employee.name}</h3>
            <p className="text-gray-600">{employee.role}</p>
            <p className="text-gray-500">{employee.email}</p>
            <div className="flex space-x-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => OnEdit(employee)}>
                    Edit
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => OnDelete(employee._id)}>
                    Delete
                </button>
            </div>
        </div>
    )
};