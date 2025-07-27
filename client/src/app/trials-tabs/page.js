import { TrialsTabs } from "@/components/TrialsTabs";
import RootLayout from "./layout";

export default function Home() {
    return (
        <>
            <RootLayout>
                <div style={{ margin: "50px" }}>
                    <TrialsTabs />
                </div>
            </RootLayout>
        </>
    );
}
