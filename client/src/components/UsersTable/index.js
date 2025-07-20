import React from "react";
import "./index.scss";

const UsersTable = () => {
    const users = [
        {
            name: "Albert",
            organization: "DOT",
            activationDate: "23.05.2021",
            subscriptionPlan: "Standard",
            expiryDate: "23.05.2031",
        },
        {
            name: "Anjana",
            organization: "APOLLO",
            activationDate: "01.05.2020",
            subscriptionPlan: "Standard",
            expiryDate: "01.05.2030",
        },
        {
            name: "Berlin",
            organization: "CT.GOV",
            activationDate: "22.08.2021",
            subscriptionPlan: "Premium",
            expiryDate: "22.08.2031",
        },
        {
            name: "Bhuvana",
            organization: "MERCK",
            activationDate: "23.07.2018",
            subscriptionPlan: "Standard",
            expiryDate: "23.07.2028",
        },
    ];

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
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>
                                    <div className="user-info">
                                        <div className="avatar"></div>
                                        <span className="user-name">
                                            {user.name}
                                        </span>
                                    </div>
                                </td>
                                <td>{user.organization}</td>
                                <td>{user.activationDate}</td>
                                <td>{user.subscriptionPlan}</td>
                                <td>{user.expiryDate}</td>
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
