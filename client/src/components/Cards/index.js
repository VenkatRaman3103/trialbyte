import "./index.scss";

export const Cards = ({ data }) => {
    const iconStyle = {
        backgroundColor: data.icon.fg_color,
        color: data.icon.bg_color,
    };
    return (
        <div className="card-container">
            <div className="card-heading">{data.heading}</div>
            <div className="card-count">{data.count}</div>
            <div className={`card-image`} style={iconStyle}>
                {/* {data.icon.url} */}
            </div>
            <div className="card-info">{data.info}</div>
        </div>
    );
};
