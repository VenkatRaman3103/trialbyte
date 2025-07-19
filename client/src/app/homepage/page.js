import RootLayout from "./layout";
import PricingPage from "@/pages/Pricing";
import Header from "@/components/Header";
import Homepage from "@/pages/Homepage";

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
