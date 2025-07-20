import AdminDashboard from "@/pages/AdminDashboard";
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
