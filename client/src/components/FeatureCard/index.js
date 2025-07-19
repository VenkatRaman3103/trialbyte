import Image from "next/image";
import "./index.scss";

export const FeatureCard = ({
    iconImage,
    illustrationImage,
    label,
    type = "illustration",
}) => {
    function renderFeature(type) {
        switch (type) {
            case "illustration":
                return (
                    <div className="feature-card-container">
                        <div className="feature-card-icon-circle">
                            <Image
                                src={`/${iconImage}`}
                                alt="Lab Icon"
                                width={48}
                                height={48}
                            />
                        </div>

                        <div className="feature-card-content">
                            <Image
                                src={`/${illustrationImage}`}
                                alt="Clinical Trial Illustration"
                                width={300}
                                height={200}
                                className="feature-card-illustration"
                            />

                            <button className="feature-card-button">
                                {label}
                            </button>
                        </div>
                    </div>
                );

            case "content":
                return (
                    <div className={`feature-card-container ${type}`}>
                        <div className={`feature-card-icon-circle ${type}`}>
                            <Image
                                src={`/${iconImage}`}
                                alt="Lab Icon"
                                width={48}
                                height={48}
                            />
                        </div>

                        <div className={`feature-card-content ${type}`}>
                            <button className={`feature-card-button ${type}`}>
                                {label}
                            </button>
                            <div className="feature-card-divider"></div>
                            <div className={`feature-card-description ${type}`}>
                                To accommodate two types of FeatureCard:
                                illustration and content, we can refactor your
                                React component to support conditional rendering
                                based on a type prop.
                            </div>
                        </div>
                    </div>
                );
        }
    }

    return <>{renderFeature(type)}</>;
};
