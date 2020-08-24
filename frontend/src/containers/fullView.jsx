import theme from "../theme";

const FullView = ({ children, arrow, ...rest }) => (
    <div className="full-view-wrapper" {...rest}>
        <div className="full-view">{children}</div>
        {arrow ? <div className="arrow" /> : null}
        <style jsx>{`
            .full-view-wrapper {
                min-height: 100vh;
                padding-left: 25vw;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }

            .full-view {
                width: 100%;
                height: 100%;
                padding: 30vh 8vw;
            }

            .arrow {
                background-image: url("../static/arrow-down.png");
                ${theme.invertedIcons ? "filter: invert(100%);" : ""}
                background-size: contain;
                background-position: center;
                background-repeat: no-repeat;
                height: 10px;
                opacity: 0.5;
                margin-bottom: 1em;
            }

            @media (max-width: 72rem) {
                .full-view-wrapper {
                    padding-left: 0;
                }
            }
        `}</style>
    </div>
);

export default FullView;
