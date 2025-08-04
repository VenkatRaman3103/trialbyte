import React from "react";
import {
    Search,
    ChevronDown,
    Filter,
    Reply,
    RotateCcw,
    Bookmark,
    Star,
    ChevronLeft,
    ChevronRight,
    Paperclip,
} from "lucide-react";
import "./index.scss";

const EmailInterface = () => {
    const emails = [
        {
            id: 1,
            sender: "James Dean",
            subject: "Lorem ipsum dolor sit amet consectetur adipiscing elit,",
            preview:
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut.",
            time: null,
            hasAttachment: false,
            isHighlighted: false,
        },
        {
            id: 2,
            sender: "Annita Williams",
            subject: "Lorem ipsum dolor sit amet consectetur adipiscing elit,",
            preview:
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem.",
            time: "10:53PM",
            hasAttachment: true,
            isHighlighted: true,
        },
        {
            id: 3,
            sender: "Laura Romeo",
            subject: "Lorem ipsum dolor sit amet consectetur adipiscing elit,",
            preview:
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem.",
            time: "10:53PM",
            hasAttachment: true,
            isHighlighted: false,
        },
        {
            id: 4,
            sender: "Ursula Clavero",
            subject: "Lorem ipsum dolor sit amet consectetur adipiscing elit,",
            preview:
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem.",
            time: "03:49PM",
            hasAttachment: true,
            isHighlighted: false,
        },
        {
            id: 5,
            sender: "Janine Dick",
            subject: "Lorem ipsum dolor sit amet consectetur adipiscing elit,",
            preview:
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem.",
            time: "03:49PM",
            hasAttachment: true,
            isHighlighted: false,
        },
    ];

    return (
        <div className="email-interface">
            {/* Left Sidebar */}
            <div className="sidebar">
                {/* Logo Section */}
                <div className="logo-section">
                    <div className="logo-dots">
                        <div className="dot green"></div>
                        <div className="dot blue"></div>
                    </div>
                    <span className="logo-text">clinovis</span>
                    <span className="logo-subtext">TECHNOLOGIES</span>
                </div>

                {/* Navigation Menu */}
                <div className="nav-menu">
                    <div className="nav-item active">
                        <div className="nav-icon"></div>
                        Inbox
                    </div>

                    <div className="nav-item">
                        <div className="nav-icon"></div>
                        Sent
                    </div>

                    <div className="nav-item">
                        <div className="nav-icon"></div>
                        Draft
                    </div>

                    <div className="nav-item">
                        <Star size={16} className="star-icon" />
                        Starred
                    </div>

                    <div className="nav-item">
                        <div className="nav-icon"></div>
                        Delete Messages
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="main-content">
                {/* Top Header */}
                <div className="top-header">
                    {/* Search Bar */}
                    <div className="search-container">
                        <Search size={18} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="search-input"
                        />
                    </div>

                    {/* Right Header Controls */}
                    <div className="header-controls">
                        <div className="sort-by">
                            <span>Sort by</span>
                            <ChevronDown size={14} />
                        </div>

                        <Filter size={18} className="filter-icon" />

                        <button className="new-email-btn">New Email</button>
                    </div>
                </div>

                {/* Email List Header */}
                <div className="email-list-header">
                    <div className="header-left">
                        <h2 className="inbox-title">Inbox Emails</h2>
                        <Reply size={16} className="header-icon" />
                        <RotateCcw size={16} className="header-icon" />
                        <Bookmark size={16} className="header-icon" />
                        <Star size={16} className="header-icon" />
                    </div>

                    <div className="header-right">
                        <span className="pagination-text">1 of 53</span>
                        <ChevronLeft size={14} className="pagination-icon" />
                        <ChevronRight size={14} className="pagination-icon" />
                    </div>
                </div>

                {/* Email List */}
                <div className="email-list">
                    {emails.map((email, index) => (
                        <div
                            key={email.id}
                            className={`email-item ${index < emails.length - 1 ? "border-bottom" : ""}`}
                        >
                            {/* Avatar */}
                            <div className="email-avatar"></div>

                            {/* Email Content */}
                            <div className="email-content">
                                <div className="email-header">
                                    <span
                                        className={`sender-name ${email.isHighlighted ? "highlighted" : ""}`}
                                    >
                                        {email.sender}
                                    </span>
                                    {email.time && (
                                        <span className="email-time">
                                            {email.time}
                                        </span>
                                    )}
                                </div>

                                <div className="email-subject-line">
                                    <span className="email-subject">
                                        Subject: {email.subject}
                                    </span>
                                    {email.hasAttachment && (
                                        <Paperclip
                                            size={16}
                                            className="attachment-icon"
                                        />
                                    )}
                                </div>

                                <p className="email-preview">{email.preview}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EmailInterface;
