import Link from "next/link";
import useAxios from "axios-hooks";
import axios from "axios";
import { useState } from "react";

import config from "../config";
import theme from "../theme";
import SubmissionPopup from "../components/submissionPopup";

const Panel = () => (
    <div id="posts-panel">
        <h3>
            <Link href="/">
                <a>Back to frontpage</a>
            </Link>
        </h3>
        <style jsx>{`
            #posts-panel {
                width: 100vw;
                height: auto;
                padding: 0.5rem 8vw;
            }

            #posts-panel h3,
            #posts-panel a {
                margin: 0;
                color: ${theme.color.black};
            }
        `}</style>
    </div>
);

const Posts = (props) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [popup, setPopup] = useState(<div />);

    const [{ data, loading, error }, refetch] = useAxios({
        url: config.ENDPOINT + "/posts/get",
        withCredentials: true,
    });

    const deletePost = async (id) => {
        await axios({
            method: "post",
            url: config.ENDPOINT + "/posts/remove",
            withCredentials: true,
            data: {
                id,
            },
        }).then(refetch);
    };

    const submitPost = async (e) => {
        e.preventDefault();
        await axios({
            method: "post",
            url: config.ENDPOINT + "/posts/create",
            withCredentials: true,
            data: {
                title,
                content,
            },
        }).then(() => {
            refetch();
            setTitle("");
            setContent("");
        });
    };

    const Table = () => (
        <table>
            <tbody>
                <tr>
                    <th>
                        <h2>ID</h2>
                    </th>
                    <th>
                        <h2>Title</h2>
                    </th>
                    <th>
                        <h2>Content</h2>
                    </th>
                    <th></th>
                </tr>
                {data.map((post) => (
                    <tr key={post.id}>
                        <td>{post.id}</td>
                        <td>{post.title}</td>
                        <td>{post.content}</td>
                        <td>
                            <span
                                className="remove-button"
                                onClick={() => deletePost(post.id)}
                            >
                                Remove
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
            <style jsx>{`
                table h2 {
                    font-size: 1em;
                    margin: 0;
                }

                table,
                tbody {
                    border-collapse: collapse;
                }

                th {
                    text-align: left;
                    padding: 0 0.5em;
                }

                td {
                    border-bottom: 1px solid ${theme.color.black}33;
                    padding: 1em 0.5em;
                }

                .remove-button {
                    text-decoration: underline;
                    cursor: pointer;
                }
            `}</style>
        </table>
    );

    return (
        <div id="posts-page">
            {popup}
            <h2>Manage Posts</h2>
            {error ? (
                <p>Error while loading posts</p>
            ) : loading ? (
                <p>Loading posts...</p>
            ) : (
                <Table />
            )}
            <h3>Create post</h3>
            <form onSubmit={submitPost}>
                <label>
                    Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <label>
                    Content:
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </label>
                <input
                    key="submit"
                    type="submit"
                    value="Submit"
                    onClick={(e) => {
                        e.preventDefault();
                        setPopup(
                            <SubmissionPopup
                                heading="Create Post"
                                mainlabel="Title:"
                                sublabel="Content:"
                                setpopup={setPopup}
                                submitaction={() => {}}
                            />
                        );
                    }}
                />
            </form>
            <style jsx>{`
                #posts-page {
                    padding: 0.5rem 8vw;
                }

                form {
                    padding: 1em 0;
                    display: flex;
                    flex-direction: column;
                }

                input[type="text"],
                textarea {
                    float: right;
                    width: 60vw;
                    resize: vertical;
                }

                input[type="submit"] {
                    width: 100px;
                }

                label {
                    margin-bottom: 1em;
                }

                h3 {
                    margin-bottom: 0;
                }
            `}</style>
        </div>
    );
};

const Tweaks = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [{ data, loading, error }, refetch] = useAxios({
        url: config.ENDPOINT + "/tweaks",
    });

    const deleteTweak = async (id) => {
        await axios({
            method: "post",
            url: config.ENDPOINT + "/tweaks/remove",
            withCredentials: true,
            data: {
                id,
            },
        }).then(refetch);
    };

    const submitTweak = async (e) => {
        e.preventDefault();

        await axios({
            method: "post",
            url: config.ENDPOINT + "/tweaks/create",
            withCredentials: true,
            data: {
                name,
                description,
            },
        }).then(() => {
            refetch();
            setName("");
            setDescription("");
        });
    };

    const Table = () => (
        <table>
            <tbody>
                <tr>
                    <th>
                        <h2>ID</h2>
                    </th>
                    <th>
                        <h2>Name</h2>
                    </th>
                    <th>
                        <h2>Description</h2>
                    </th>
                    <th></th>
                </tr>
                {data.map((tweak) => (
                    <tr key={tweak.id}>
                        <td>{tweak.id}</td>
                        <td>{tweak.name}</td>
                        <td>{tweak.description}</td>
                        <td>
                            <span
                                className="remove-button"
                                onClick={() => deleteTweak(tweak.id)}
                            >
                                Remove
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
            <style jsx>{`
                table h2 {
                    font-size: 1em;
                    margin: 0;
                }

                table,
                tbody {
                    border-collapse: collapse;
                }

                th {
                    text-align: left;
                    padding: 0 0.5em;
                }

                td {
                    border-bottom: 1px solid ${theme.color.black}33;
                    padding: 1em 0.5em;
                }

                .remove-button {
                    text-decoration: underline;
                    cursor: pointer;
                }
            `}</style>
        </table>
    );

    return (
        <div>
            <div id="tweaks-page">
                <h2>Manage Tweaks</h2>
                {error ? (
                    <p>Error while loading tweaks</p>
                ) : loading ? (
                    <p>Loading tweaks...</p>
                ) : (
                    <Table />
                )}
                <h3>Add tweak</h3>
                <form onSubmit={submitTweak}>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label>
                        Description:
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                    <input key="submit" type="submit" value="Submit" />
                </form>
                <style jsx>{`
                    #tweaks-page {
                        padding: 0.5rem 8vw;
                    }

                    form {
                        padding: 1em 0;
                        display: flex;
                        flex-direction: column;
                    }

                    input[type="text"],
                    textarea {
                        float: right;
                        width: 60vw;
                    }

                    input[type="submit"] {
                        width: 100px;
                    }

                    label {
                        margin-bottom: 1em;
                    }

                    h3 {
                        margin-bottom: 0;
                    }
                `}</style>
            </div>
        </div>
    );
};

const Admin = () => (
    <div id="wrapper">
        <Panel />
        <Posts />
        <Tweaks />
        <style jsx>{`
            #wrapper {
                height: 100vh;
                position: fixed;
                overflow-y: scroll;
            }
        `}</style>
    </div>
);

export default Admin;
