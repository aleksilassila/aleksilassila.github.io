import React from "react";
import theme from "../theme";

class Selected extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
    }

    componentDidMount() {
        const checkIfVisible = () => {
            const elBoundingClientRect = document
                .getElementById(this.props.elementId)
                .getBoundingClientRect();

            if (
                elBoundingClientRect.top < window.innerHeight / 2 &&
                elBoundingClientRect.bottom > window.innerHeight / 2
            ) {
                this.setState({ visible: true });
            } else {
                this.setState({ visible: false });
            }
        };

        checkIfVisible();
        // Improve performance -> right now too many scroll listeners
        document.getElementById("clip").addEventListener("scroll", () => {
            checkIfVisible();
        });
    }

    render() {
        const { visible } = this.state;

        return (
            <div>
                <style jsx>{`
                    div {
                        display: inline-block;
                        width: 3px;
                        background-color: ${theme.color.black};
                        margin-right: 0.5rem;
                        transition: height 0.3s;
                        height: ${visible ? "1rem" : "0"};
                    }
                    .selected {
                        height: 1rem;
                    }
                `}</style>
            </div>
        );
    }
}

export default Selected;
