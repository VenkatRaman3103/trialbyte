import { Header } from "@/components/Header";
import "./index.scss";
import { FeatureCard } from "@/components/FeatureCard";

export const Homepage = () => {
    return (
        <div className="homepage page-cotainer">
            <div className="homepage-feature-card-container">
                <FeatureCard
                    iconImage={"test-tube_15600495.svg"}
                    illustrationImage={"feature_1_illustration.svg"}
                    label={"Clinical trials"}
                />

                <FeatureCard
                    iconImage={"medicine_10299376.svg"}
                    label={"Clinical trials"}
                    type={"content"}
                />

                <FeatureCard
                    iconImage={"bioinformatic_17791378.svg"}
                    illustrationImage={"feature_2_illustration.svg"}
                    label={"Clinical trials"}
                />
            </div>
        </div>
    );
};
