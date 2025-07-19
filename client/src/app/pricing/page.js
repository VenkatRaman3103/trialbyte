import { Homepage } from "@/pages/Homepage";
import RootLayout from "./layout";
import { Header } from "@/components/Header";
import PricingPage from "@/pages/Pricing";

export default function Home() {
    return (
        <>
            <RootLayout>
                <Header />
                <PricingPage />
            </RootLayout>
        </>
    );
}
