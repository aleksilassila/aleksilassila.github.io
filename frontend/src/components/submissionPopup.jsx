import { useState } from "react";

import theme from "../theme";

const SubmissionPopup = ({
    heading,
    mainlabel,
    sublabel,
    submitaction,
    closepopup,
    mainvalue = "",
    subvalue = "",
    ...rest
}) => {
    const [mainValue, setMainValue] = useState(mainvalue);
    const [subValue, setSubValue] = useState(subvalue);

    return (
        <div className="submission-popup-background" {...rest}>
            <div
                className="close-popup"
                onClick={() => {
                    closepopup();
                }}
            />
            <div className="submission-popup">
                <h2>{heading}</h2>
                <form
                    onSubmit={(e) => {
                        submitaction(e, mainValue, subValue);
                        closepopup();
                    }}
                >
                    <label>{mainlabel}</label>
                    <input
                        type="text"
                        value={mainValue}
                        onChange={(e) => setMainValue(e.target.value)}
                    />
                    <label>{sublabel}</label>
                    <textarea
                        value={subValue}
                        onChange={(e) => setSubValue(e.target.value)}
                    />
                    <input
                        key="submit"
                        type="submit"
                        value="Submit"
                        disabled={mainValue === "" || subValue === ""}
                    />
                </form>
            </div>
            <style jsx>{`
                .submission-popup-background {
                    width: 100vw;
                    height: 100vh;
                    position: fixed;
                    top: 0;
                    right: 0;
                    background-color: ${theme.text}55;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 100;
                }

                .submission-popup {
                    background-color: ${theme.altText};
                    width: 70vw;
                    height: 70vh;
                    border-radius: 15px;
                    padding: 2rem 1.5em;
                }

                form {
                    padding: 1em 0;
                    display: flex;
                    flex-direction: column;
                }

                input[type="text"],
                textarea {
                    float: right;
                    resize: vertical;
                    margin-bottom: 2rem;
                }

                input[type="submit"] {
                    width: 100px;
                }

                label {
                    margin-bottom: 1em;
                }

                .close-popup {
                    background-image: url("../static/cross.png");
                    ${theme.invertedIcons ? "filter: invert(100%);" : ""}
                    opacity: 0.7;
                    background-size: cover;
                    background-position: center;
                    width: 2rem;
                    height: 2rem;

                    cursor: pointer;
                    border-radius: 1rem;

                    position: absolute;
                    top: 2rem;
                    right: 2rem;
                }
            `}</style>
        </div>
    );
};

export default SubmissionPopup;
