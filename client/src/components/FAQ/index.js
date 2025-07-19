"use client";
import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import "./index.scss";

const FAQ = () => {
    const [openItem, setOpenItem] = useState(0);

    const faqData = [
        {
            question: "What is this theme layout for?",
            answer: "We believe this theme is for everyone who can use Figma on the drag-n-drop basis. As the template is fully build for those purpose. Let hop on your marketing team and colaborate smarter!.",
        },
        {
            question: "What is this theme layout for?",
            answer: "We believe this theme is for everyone who can use Figma on the drag-n-drop basis. As the template is fully build for those purpose. Let hop on your marketing team and colaborate smarter!.",
        },
        {
            question: "What is this theme layout for?",
            answer: "We believe this theme is for everyone who can use Figma on the drag-n-drop basis. As the template is fully build for those purpose. Let hop on your marketing team and colaborate smarter!.",
        },
        {
            question: "What is this theme layout for?",
            answer: "We believe this theme is for everyone who can use Figma on the drag-n-drop basis. As the template is fully build for those purpose. Let hop on your marketing team and colaborate smarter!.",
        },
        {
            question: "What is this theme layout for?",
            answer: "We believe this theme is for everyone who can use Figma on the drag-n-drop basis. As the template is fully build for those purpose. Let hop on your marketing team and colaborate smarter!.",
        },
        {
            question: "What is this theme layout for?",
            answer: "We believe this theme is for everyone who can use Figma on the drag-n-drop basis. As the template is fully build for those purpose. Let hop on your marketing team and colaborate smarter!.",
        },
    ];

    const toggleItem = (index) => {
        setOpenItem(openItem === index ? -1 : index);
    };

    return (
        <div className="faq">
            <div className="faq__container">
                <div className="faq__content">
                    <div className="faq__left">
                        <h1 className="faq__title">
                            Frequently
                            <br />
                            Asked Questions
                        </h1>
                        <p className="faq__description">
                            We are answering most frequent questions. No worries
                            if you not find exact one. You can find out more by
                            searching or continuing clicking button below or
                            directly{" "}
                            <a href="#" className="faq__link">
                                contact our support
                            </a>
                            .
                        </p>
                    </div>

                    <div className="faq__right">
                        <div className="faq__list">
                            {faqData.map((item, index) => (
                                <div
                                    key={index}
                                    className={`faq__item ${openItem === index ? "faq__item--open" : ""}`}
                                >
                                    <button
                                        className="faq__question"
                                        onClick={() => toggleItem(index)}
                                    >
                                        <span>{item.question}</span>
                                        {openItem === index ? (
                                            <ChevronUp className="faq__icon" />
                                        ) : (
                                            <ChevronDown className="faq__icon" />
                                        )}
                                    </button>

                                    {openItem === index && (
                                        <div className="faq__answer">
                                            <p>{item.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
