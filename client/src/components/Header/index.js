import Image from "next/image";
import "./index.scss";

export const Header = () => {
    return (
        <div className="header-container">
            <div className="header-wrapper">
                <div className="header-logo-section">
                    <Logo />
                </div>
                <div className="header-cta-section">
                    <NormalButton label={"SOLUTIONS & PRICING"} />
                    <InvertedButton label={"Help Centre"} />
                    <Image
                        src="/material-symbols_mail.svg"
                        alt="logo icon"
                        width={40}
                        height={58}
                        priority
                    />
                </div>
            </div>
        </div>
    );
};

export const NormalButton = ({ label }) => {
    return <div className="normal-button-wrapper">{label}</div>;
};

export const InvertedButton = ({ label }) => {
    return (
        <div className="inverted-button-wrapper">
            <span className="gradient-text">{label}</span>
        </div>
    );
};

export const Logo = () => {
    return (
        <div className="logo-container">
            <div className="logo-icon">
                <Image
                    src="/trialbyte_logo.svg"
                    alt="logo icon"
                    width={80}
                    height={58}
                    priority
                />
            </div>

            <div className="logo-wording-cotainer">
                <div className="logo-wording-1">
                    <Image
                        src="/clinovis.svg"
                        alt="logo icon"
                        width={90}
                        height={38}
                        priority
                    />
                </div>
                <div className="logo-wording-2">Technologies</div>
            </div>
        </div>
    );
};
