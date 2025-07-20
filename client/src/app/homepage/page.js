import RootLayout from "./layout";
import Header from "@/components/Header";
import Homepage from "@/_pages/Homepage";

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
