import Header from "@/components/Header";
import RootLayout from "./layout";
import UserDetails from "@/_pages/UserDetails";

export default function Home() {
    return (
        <>
            <RootLayout>
                <Header />
                <UserDetails />
            </RootLayout>
        </>
    );
}
