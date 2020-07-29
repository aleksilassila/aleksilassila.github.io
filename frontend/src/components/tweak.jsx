import theme from "../theme";

const Tweak = ({ name, description }) => {
    return (
        <div className="tweak">
            <h2
                onClick={() =>
                    window.open(
                        "cydia://url/https://cydia.saurik.com/api/share#?source=http%3A%2F%2Faleksilassila.github.io%2Frepo"
                    )
                }
            >
                {name}
            </h2>
            {description}
            <style jsx>{`
                h2 {
                    font-size: 1em;
                    margin: 0;
                    margin-bottom: 0.6em;
                    text-decoration: underline;
                    cursor: pointer;
                }

                p {
                    font-size: 0.9em;
                    margin: 0;
                }

                .tweak {
                    border-left: 1px solid ${theme.color.black}33;
                    padding: 0.7em 1em;
                    margin-bottom: 1em;
                }
            `}</style>
        </div>
    );
};

export default Tweak;
