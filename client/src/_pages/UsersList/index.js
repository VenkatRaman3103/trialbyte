"use client";
import { useState } from "react";
import "./index.scss";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/api/users/getAllUsers";

export const UsersList = () => {
    const { data: allUsers } = useQuery({
        queryKey: ["all-users"],
        queryFn: getAllUsers,
    });

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
            const allUserIds = allUsers.map((user) => user.id);
            setSelectedUsers(allUserIds);
        } else {
            setSelectedUsers([]);
        }
    };

    const allUsersSelected =
        selectedUsers.length === allUsers.length && allUsers.length > 0;

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
                    {allUsers.map((user) => (
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
                            <td>not set</td>
                            <td>not set</td>
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
