const FullView = ({ children, ...rest }) => (
    <div className="full-view-wrapper" {...rest}>
        <div className="full-view">
            {children}
        </div>
        <style jsx>{`
            .full-view-wrapper {
                min-height: 100vh;
                padding-left: 25vw;
            }

            .full-view {
                width: 100%;
                height: 100%;
                padding: 30vh 8vw;
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
