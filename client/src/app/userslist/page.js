import Header from "@/components/Header";
import RootLayout from "./layout";
import { UsersList } from "@/_pages/UsersList";

export default function Home() {
    return (
        <>
            <RootLayout>
                <Header />
                <UsersList />
            </RootLayout>
        </>
    );
}
