import Header from "@/components/Header";
import RootLayout from "./layout";
import PricingPage from "@/pages/Pricing";
import UserDetails from "@/pages/UserDetails";
import SignInForm from "@/pages/SignInForm";

export default function Home() {
    return (
        <>
            <RootLayout>
                <SignInForm />
            </RootLayout>
        </>
    );
}
