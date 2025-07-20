import AdminDashboard from "@/_pages/AdminDashboard";
import RootLayout from "./layout";

export default function Home() {
    return (
        <>
            <RootLayout>
                <AdminDashboard />
            </RootLayout>
        </>
    );
}
