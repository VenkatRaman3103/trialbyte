import Header from "@/components/Header";
import RootLayout from "./layout";
import PricingPage from "@/pages/Pricing";
import UserDetails from "@/pages/UserDetails";

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
