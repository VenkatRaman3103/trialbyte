"use client";
import { useState } from "react";
import "./index.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllUsers } from "@/api/users/getAllUsers";
import { deleteMultipleUsers } from "@/api/users/deleteMultipleUsers";

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>Notes</h3>
                    <button className="modal-close-button" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="modal-body">
                    <p>Are you sure you want to delete the selected users?</p>
                </div>
                <div className="modal-footer">
                    <button
                        className="modal-button modal-button-no"
                        onClick={onClose}
                    >
                        No
                    </button>
                    <button
                        className="modal-button modal-button-yes"
                        onClick={onConfirm}
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
};

export const UsersList = () => {
    const { data: allUsers } = useQuery({
        queryKey: ["all-users"],
        queryFn: getAllUsers,
    });

    const queryClient = useQueryClient();

    const deleteMultipleUsersMutation = useMutation({
        mutationFn: async (ids) => await deleteMultipleUsers(ids),
        onSuccess: () => {
            queryClient.invalidateQueries(["all-users"]);
            setSelectedUsers([]);
            setIsModalOpen(false);
        },
    });

    const [selectedUsers, setSelectedUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCheckboxChange = (userId) => {
        setSelectedUsers((prevSelected) =>
            prevSelected.includes(userId)
                ? prevSelected.filter((id) => id !== userId)
                : [...prevSelected, userId],
        );
    };

    const handleSelectAllChange = (event) => {
        if (event.target.checked) {
            const allUserIds = allUsers?.map((user) => user.id);
            setSelectedUsers(allUserIds);
        } else {
            setSelectedUsers([]);
        }
    };

    const allUsersSelected =
        selectedUsers.length === allUsers?.length && allUsers?.length > 0;

    console.log(selectedUsers, "selectedUsers");

    const handleDeleteClick = () => {
        if (selectedUsers.length > 0) {
            setIsModalOpen(true);
        } else {
            console.log("No users selected for deletion.");
        }
    };

    const handleConfirmDelete = () => {
        deleteMultipleUsersMutation.mutate(selectedUsers);
    };

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
                    {allUsers?.map((user) => (
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
                            <td>{user.ipAuthority ? "Yes" : "No"}</td>{" "}
                            <td>{user.status}</td>
                            <td>{user.id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="user-table-buttons">
                <button className="add-button">Add new users</button>
                <button
                    className="remove-button"
                    onClick={handleDeleteClick}
                    disabled={selectedUsers.length === 0}
                >
                    Remove users
                </button>
            </div>

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
};

export default UsersList;
