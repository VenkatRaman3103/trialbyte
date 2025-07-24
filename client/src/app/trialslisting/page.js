import RootLayout from "./layout";
import { TrialsListing } from "@/_pages/TrialsListing";

export default function Home() {
    return (
        <>
            <RootLayout>
                <TrialsListing />
            </RootLayout>
        </>
    );
}
