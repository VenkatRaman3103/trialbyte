"use client";
import { Cards } from "@/components/Cards";
import "./index.scss";
import DashboardCharts from "@/components/DashboardCharts";
import UsersTable from "@/components/UsersTable";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllUsers } from "@/api/users/getAllUsers";
import { deleteUserById } from "@/api/users/deleteUserById";

const cardsDummyData = [
    {
        heading: "item 1",
        count: "123",
        info: "about item",
        icon: {
            url: "some",
            fg_color: "some",
            bg_color: "some",
        },
    },
    {
        heading: "item 2",
        count: "123",
        info: "about item",
        icon: {
            url: "some",
            fg_color: "some",
            bg_color: "some",
        },
    },
    {
        heading: "item 3",
        count: "123",
        info: "about item",
        icon: {
            url: "some",
            fg_color: "some",
            bg_color: "some",
        },
    },
    {
        heading: "item 4",
        count: "123",
        info: "about item",
        icon: {
            url: "some",
            fg_color: "some",
            bg_color: "some",
        },
    },
];

const AdminDashboard = () => {
    const queryClient = useQueryClient();

    const { data: allUsers } = useQuery({
        queryFn: getAllUsers,
        queryKey: ["all-users"],
    });

    const deleteUserMutation = useMutation({
        mutationFn: (id) => {
            return deleteUserById(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["all-users"]);
        },
    });

    function handleDeleteUser(id) {
        deleteUserMutation.mutate(id);
    }

    return (
        <div className="admin-dashboard-container">
            <div className="admin-dashboard-cards-container">
                {cardsDummyData.map((item, ind) => (
                    <Cards key={ind} data={item} />
                ))}
            </div>
            <div className="adim-chart-container">
                <DashboardCharts />
            </div>
            <div className="adim-user-table-container">
                <UsersTable
                    data={allUsers}
                    handleDeleteUser={handleDeleteUser}
                />
            </div>
        </div>
    );
};
export default AdminDashboard;
