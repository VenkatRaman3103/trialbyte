"use client";
import React, { useState } from "react";
import "./index.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllUsers } from "@/api/users/getAllUsers";
import { deleteMultipleUsers } from "@/api/users/deleteMultipleUsers";
import axios from "axios";
import { backendUrl } from "@/config";
import { addUser } from "@/api/users/addUser";

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content confirmation-modal">
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

const AddUserModal = ({ isOpen, onClose, onAddUser }) => {
    const [formData, setFormData] = useState({
        userName: "",
        company: "",
        designation: "",
        contactPhone: "",
        country: "",
        region: "",
        sex: "",
        age: "",
        plan: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const backendData = {
            name: formData.userName,
            company: formData.company,
            designation: formData.designation,
            contact: formData.contactPhone,
            country: formData.country,
            region: formData.region,
            sex: formData.sex,
            age: parseInt(formData.age, 10),
            plan: formData.plan,
        };
        console.log("Submitting user data to backend:", backendData);
        onAddUser(backendData);
        setFormData({
            userName: "",
            company: "",
            designation: "",
            contactPhone: "",
            country: "",
            region: "",
            sex: "",
            age: "",
            plan: "",
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content add-user-modal">
                <div className="modal-header">
                    <h3>Add User Id</h3>
                    <button className="modal-close-button" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group full-width">
                        <label htmlFor="userName">
                            Enter the User Name
                            <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="company">
                            Company<span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="designation">
                            Designation<span className="required">*</span>
                        </label>
                        <select
                            id="designation"
                            name="designation"
                            value={formData.designation}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Designation</option>
                            <option value="Clinical Researcher">
                                Clinical Researcher
                            </option>
                            <option value="Clinical Trial Manager">
                                Clinical Trial Manager
                            </option>
                            <option value="Clinical Data Analyst">
                                Clinical Data Analyst
                            </option>
                            <option value="Clinical Trial Monitor">
                                Clinical Trial Monitor
                            </option>
                            <option value="Clinical Research Associate">
                                Clinical Research Associate
                            </option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="contactPhone">
                            Contact Phone<span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="contactPhone"
                            name="contactPhone"
                            value={formData.contactPhone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="country">
                            Country<span className="required">*</span>
                        </label>
                        <select
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Country</option>
                            <option value="USA">USA</option>
                            <option value="Canada">Canada</option>
                            <option value="UK">UK</option>
                            <option value="Australia">Australia</option>
                            <option value="India">India</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="region">
                            Region<span className="required">*</span>
                        </label>
                        <select
                            id="region"
                            name="region"
                            value={formData.region}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Region</option>
                            <option value="North America">North America</option>
                            <option value="Europe">Europe</option>
                            <option value="Asia">Asia</option>
                            <option value="South America">South America</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="sex">
                            Sex<span className="required">*</span>
                        </label>
                        <select
                            id="sex"
                            name="sex"
                            value={formData.sex}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Sex</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="age">
                            Age<span className="required">*</span>
                        </label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="plan">
                            Plan<span className="required">*</span>
                        </label>
                        <select
                            id="plan"
                            name="plan"
                            value={formData.plan}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Plan</option>
                            <option value="Basic">Basic</option>
                            <option value="Standard">Standard</option>
                            <option value="Premium">Premium</option>
                        </select>
                    </div>

                    <div className="modal-footer form-footer">
                        <button
                            type="submit"
                            className="modal-button add-user-button"
                        >
                            Add user
                        </button>
                    </div>
                </form>
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
            setIsConfirmationModalOpen(false);
        },
    });

    const addUserMutation = useMutation({
        mutationFn: async (userData) => await addUser(userData),
        onSuccess: () => {
            queryClient.invalidateQueries(["all-users"]);
            setIsAddUserModalOpen(false);
        },
    });

    const [selectedUsers, setSelectedUsers] = useState([]);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
        useState(false);
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

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
            setIsConfirmationModalOpen(true);
        } else {
            console.log("No users selected for deletion.");
        }
    };

    const handleConfirmDelete = () => {
        deleteMultipleUsersMutation.mutate(selectedUsers);
    };

    const handleAddUserClick = () => {
        setIsAddUserModalOpen(true);
    };

    const handleAddUser = (userData) => {
        addUserMutation.mutate(userData);
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
                            <td>{user.ipAuthority ? "Yes" : "No"}</td>
                            <td>{user.status}</td>
                            <td>{user.id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="user-table-buttons">
                <button className="add-button" onClick={handleAddUserClick}>
                    Add new users
                </button>
                <button
                    className="remove-button"
                    onClick={handleDeleteClick}
                    disabled={selectedUsers.length === 0}
                >
                    Remove users
                </button>
            </div>

            <ConfirmationModal
                isOpen={isConfirmationModalOpen}
                onClose={() => setIsConfirmationModalOpen(false)}
                onConfirm={handleConfirmDelete}
            />

            <AddUserModal
                isOpen={isAddUserModalOpen}
                onClose={() => setIsAddUserModalOpen(false)}
                onAddUser={handleAddUser}
            />
        </div>
    );
};

export default UsersList;
