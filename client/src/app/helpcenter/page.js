import RootLayout from "./layout";
import PricingPage from "@/pages/Pricing";
import Header from "@/components/Header";
import Homepage from "@/pages/Homepage";
import HelpCenter from "@/pages/HelpCenter";
import FAQ from "@/components/FAQ";

export default function Home() {
    return (
        <>
            <RootLayout>
                <Header />
                <HelpCenter />
                <FAQ />
            </RootLayout>
        </>
    );
}
