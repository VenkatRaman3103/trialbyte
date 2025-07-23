import AdminDashboard from "@/_pages/AdminDashboard";
import RootLayout from "./layout";
import { NewTrialPage } from "@/_pages/Backend/NewTrialPage";

export default function Home() {
    return (
        <>
            <RootLayout>
                <NewTrialPage />
            </RootLayout>
        </>
    );
}
