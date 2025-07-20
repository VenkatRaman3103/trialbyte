import RootLayout from "./layout";
import Header from "@/components/Header";
import HelpCenter from "@/_pages/HelpCenter";
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
