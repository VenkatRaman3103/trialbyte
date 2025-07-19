import React from "react";
import "./index.scss";
import Image from "next/image";

const PricingPage = () => {
    const plans = [
        {
            id: "starter",
            name: "Starter",
            price: 100,
            description:
                "Get started with basic access to clinical trial tools and updates.",
            features: [
                { name: "Unlimited Upload", included: true },
                { name: "Advanced Statistic", included: true },
                { name: "Profile Badge", included: true },
                { name: "Access to the community", included: true },
                { name: "History of all Liked Photos", included: false },
                { name: "Directory Listing", included: false },
                { name: "Customize Your Profile", included: false },
                { name: "Display Your Workshops", included: false },
            ],
            isPopular: false,
        },
        {
            id: "popular",
            name: "Popular",
            price: 1400,
            description:
                "Unlock advanced features and enhanced support for ongoing trials.",
            features: [
                { name: "Unlimited Upload", included: true },
                { name: "Advanced Statistic", included: true },
                { name: "Profile Badge", included: true },
                { name: "Access to the community", included: true },
                { name: "History of all Liked Photos", included: true },
                { name: "Directory Listing", included: true },
                { name: "Customize Your Profile", included: true },
                { name: "Display Your Workshops", included: true },
            ],
            isPopular: true,
        },
        {
            id: "enterprise",
            name: "Enterprise",
            price: 2100,
            description:
                "Full-access plan with premium support and team-based management tools.",
            features: [
                { name: "Unlimited Upload", included: true },
                { name: "Advanced Statistic", included: true },
                { name: "Profile Badge", included: true },
                { name: "Access to the community", included: true },
                { name: "History of all Liked Photos", included: true },
                { name: "Directory Listing", included: true },
                { name: "Customize Your Profile", included: true },
                { name: "Display Your Workshops", included: true },
            ],
            isPopular: false,
        },
    ];

    return (
        <div className="pricing-page">
            <div className="pricing-container">
                <h1 className="pricing-title">
                    Choose a plan for a more advanced business
                </h1>

                <div className="pricing-cards">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`pricing-card ${plan.isPopular ? "popular" : ""}`}
                        >
                            <div className="card-header">
                                <div className="plan-icon">
                                    {plan.id === "starter" && (
                                        <Image
                                            src={`/icon_heart.svg`}
                                            alt="Clinical Trial Illustration"
                                            width={25}
                                            height={25}
                                        />
                                    )}
                                    {plan.id === "popular" && (
                                        <Image
                                            src={`/icon_thunder.svg`}
                                            alt="Clinical Trial Illustration"
                                            width={25}
                                            height={25}
                                        />
                                    )}
                                    {plan.id === "enterprise" && (
                                        <Image
                                            src={`/icon_crown.svg`}
                                            alt="Clinical Trial Illustration"
                                            width={25}
                                            height={25}
                                        />
                                    )}

                                    {plan.isPopular && (
                                        <div className="popular-badge">
                                            <span className="badge-text">
                                                Best Offers
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <h2 className="plan-name">{plan.name}</h2>
                                <p className="plan-description">
                                    {plan.description}
                                </p>
                            </div>

                            <div className="pricing-section">
                                <div className="price">
                                    <span className="currency">$</span>
                                    <span className="amount">{plan.price}</span>
                                    <span className="period">/mo</span>
                                </div>
                            </div>

                            <div className="features-section">
                                <h3 className="features-title">
                                    What's included:
                                </h3>
                                <ul className="features-list">
                                    {plan.features.map((feature, index) => (
                                        <li
                                            key={index}
                                            className={`feature-item ${feature.included ? "included" : "excluded"}`}
                                        >
                                            <span className="feature-icon">
                                                {feature.included ? "✓" : "✓"}
                                            </span>
                                            <span className="feature-text">
                                                {feature.name}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button
                                className={`choose-plan-btn ${plan.isPopular ? "popular-btn" : ""}`}
                            >
                                Choose Plan
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PricingPage;
