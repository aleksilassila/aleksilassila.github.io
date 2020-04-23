const View = ({ children, noPadding, ...rest }) => (
    <div className="view-wrapper" {...rest}>
        <div className="view">{children}</div>
        <style jsx>{`
            .view-wrapper {
                min-height: 30vh;
                padding-left: ${noPadding ? "0" : "25vw"};
            }

            .view {
                width: 100%;
                height: 100%;
                padding: 5vh ${noPadding ? "0" : "8vw"};
            }

            @media (max-width: 72rem) {
                .view-wrapper {
                    padding-left: 0;
                }
            }
        `}</style>
    </div>
);

export default View;
