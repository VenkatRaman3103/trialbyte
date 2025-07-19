import { Homepage } from "@/pages/Homepage";
import RootLayout from "./layout";
import { Header } from "@/components/Header";

export default function Home() {
    return (
        <>
            <RootLayout>
                <Header />
                <Homepage />
            </RootLayout>
        </>
    );
}
