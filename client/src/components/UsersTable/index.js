import React from "react";
import "./index.scss";

const UsersTable = ({ data }) => {
    return (
        <div className="users-table-container">
            <div className="table-header">
                <h2 className="table-title">Existing users</h2>
                <button className="menu-button">⋯</button>
            </div>

            <div className="table-wrapper">
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Organization</th>
                            <th>Activation Date</th>
                            <th>Subscription plan</th>
                            <th>Expiry Date</th>
                            <th>Remove user</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user, index) => (
                            <tr key={index}>
                                <td>
                                    <div className="user-info">
                                        <div className="avatar"></div>
                                        <span className="user-name">
                                            {user.name}
                                        </span>
                                    </div>
                                </td>
                                <td>{user.company}</td>
                                <td>activation date</td>
                                <td>{user.plan}</td>
                                <td>expiry date</td>
                                <td>
                                    <button className="remove-button">
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersTable;
