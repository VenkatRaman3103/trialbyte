"use client";

import React from "react";
import { Download, FileText } from "lucide-react";
import "./index.scss";

const Membership = () => {
    const features = [
        "Unlimited Upload",
        "Advanced Statistic",
        "Profile Badge",
        "Access to the community",
    ];

    const invoices = [
        {
            filename: "Invoice_2024/10.pdf",
            date: "Apr 02, 2024",
        },
        {
            filename: "Invoice_2024/10.pdf",
            date: "Mar 02, 2024",
        },
        {
            filename: "Invoice_2024/10.pdf",
            date: "Feb 02, 2024",
        },
    ];

    const handleDownload = (filename) => {
        // Download functionality would go here
        console.log(`Downloading ${filename}`);
    };

    return (
        <div className="membership">
            <div className="membership__container">
                <h1 className="membership__title">Membership</h1>

                <div className="membership__card">
                    <div className="membership__left">
                        <div className="plan__badge">
                            <span className="badge__starter">Starter</span>
                            <span className="badge__plan">plan</span>
                        </div>
                        <div className="plan__price">
                            <div className="plan__pricing-contianer">
                                <span className="price__amount">$100</span>
                                <span className="price__period">/mo</span>
                            </div>

                            <button className="plan__upgrade-btn">
                                Upgrade Plan
                            </button>
                        </div>
                    </div>

                    <div className="membership__right">
                        <div className="payment__info">
                            <p className="info__label">Next Payment</p>
                            <p className="info__value">on May 30, 2024</p>
                        </div>
                        <div className="registration__info">
                            <p className="info__label">Registration Date :</p>
                            <p className="info__value">20-01-2024</p>
                        </div>
                    </div>
                </div>

                <section className="membership__features">
                    <h2 className="section__title">Features</h2>
                    <div className="features__grid">
                        {features.map((feature, index) => (
                            <div key={index} className="feature__card">
                                {feature}
                            </div>
                        ))}
                    </div>
                </section>

                <section className="membership__invoices">
                    <h2 className="section__title">
                        Invoices ({invoices.length + 1})
                    </h2>
                    <div className="invoices__list">
                        {invoices.map((invoice, index) => (
                            <div key={index} className="invoice__item">
                                <div className="invoice__info">
                                    <div className="invoice__info-container">
                                        <div className="invoice__icon">
                                            <FileText className="file-icon" />
                                        </div>
                                        <div className="invoice__details">
                                            <h4 className="invoice__filename">
                                                {invoice.filename}
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="invoice__meta">
                                        <span className="invoice__date-label">
                                            Date of Invoice
                                        </span>
                                        <span className="invoice__date">
                                            {invoice.date}
                                        </span>
                                    </div>

                                    <button
                                        className="invoice__download"
                                        onClick={() =>
                                            handleDownload(invoice.filename)
                                        }
                                    >
                                        <Download className="download-icon" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Membership;
