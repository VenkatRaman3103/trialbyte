"use client";
import { Cards } from "@/components/Cards";
import "./index.scss";
import DashboardCharts from "@/components/DashboardCharts";
import UsersTable from "@/components/UsersTable";
import { useSelector } from "react-redux";

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
    const count = useSelector((state) => state.counter.value);
    console.log(count, "count");
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
                <UsersTable />
            </div>
        </div>
    );
};
export default AdminDashboard;
