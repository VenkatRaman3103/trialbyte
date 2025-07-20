import Header from "@/components/Header";
import RootLayout from "./layout";
import PricingPage from "@/_pages/Pricing";

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
