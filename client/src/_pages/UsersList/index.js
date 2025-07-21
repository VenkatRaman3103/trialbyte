"use client";
import { useState } from "react";
import "./index.scss";

export const UsersList = () => {
    const [users, setUsers] = useState([
        {
            id: "CT123",
            name: "John Doe",
            designation: "Clinical Researcher",
            ipAuthority: true,
            status: "Active",
        },
        {
            id: "CT124",
            name: "Jane Smith",
            designation: "Clinical Trial Manager",
            ipAuthority: false,
            status: "Inactive",
        },
        {
            id: "CT125",
            name: "Alex Brown",
            designation: "Clinical Data Analyst",
            ipAuthority: true,
            status: "Active",
        },
        {
            id: "CT126",
            name: "Emily Davis",
            designation: "Clinical Trial Monitor",
            ipAuthority: true,
            status: "Active",
        },
        {
            id: "CT127",
            name: "Michael Lee",
            designation: "Clinical Research Associate",
            ipAuthority: false,
            status: "Inactive",
        },
    ]);

    const [selectedUsers, setSelectedUsers] = useState([]);

    const handleCheckboxChange = (userId) => {
        setSelectedUsers((prevSelected) =>
            prevSelected.includes(userId)
                ? prevSelected.filter((id) => id !== userId)
                : [...prevSelected, userId],
        );
    };

    const handleSelectAllChange = (event) => {
        if (event.target.checked) {
            const allUserIds = users.map((user) => user.id);
            setSelectedUsers(allUserIds);
        } else {
            setSelectedUsers([]);
        }
    };

    const allUsersSelected =
        selectedUsers.length === users.length && users.length > 0;

    console.log(selectedUsers, "selectedUsers");

    return (
        <div className="user-table-container">
            <table className="user-table">
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                onChange={handleSelectAllChange}
                                checked={allUsersSelected}
                            />
                        </th>
                        <th>User Name</th>
                        <th>Designation</th>
                        <th>IP Authority</th>
                        <th>User Status</th>
                        <th>User ID</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedUsers.includes(user.id)}
                                    onChange={() =>
                                        handleCheckboxChange(user.id)
                                    }
                                />
                            </td>
                            <td>{user.name}</td>
                            <td>{user.designation}</td>
                            <td>{user.ipAuthority ? "Yes" : "No"}</td>
                            <td>{user.status}</td>
                            <td>{user.id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="user-table-buttons">
                <button className="add-button">Add new users</button>
                <button className="remove-button">Remove users</button>
            </div>
        </div>
    );
};
