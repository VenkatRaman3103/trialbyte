import RootLayout from "./layout";
import Header from "@/components/Header";
import Membership from "@/components/Membership";

export default function Home() {
    return (
        <>
            <RootLayout>
                <Header />
                <Membership />
            </RootLayout>
        </>
    );
}
