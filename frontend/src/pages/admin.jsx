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
    const [popup, setPopup] = useState(<div />);
    const [selected, setSelected] = useState({});

    const [{ data, loading, error }, refetch] = useAxios({
        url: config.ENDPOINT + "/posts/get",
        withCredentials: true,
    });

    const deletePosts = async () => {
        const newSelected = { ...selected };

        const ids = Object.keys(selected).map((key) => {
            if (selected[key]) {
                delete newSelected[key];
                return key;
            }
        });

        setSelected(newSelected);

        await axios({
            method: "post",
            url: config.ENDPOINT + "/posts/remove",
            withCredentials: true,
            data: {
                ids,
            },
        }).then(refetch);
    };

    const submitPost = async (e, title, content) => {
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
        });
    };

    const editPost = async (e, id, title, content) => {
        e.preventDefault();

        await axios({
            method: "patch",
            url: config.ENDPOINT + "/posts/update",
            withCredentials: true,
            data: {
                id,
                title,
                content,
            },
        }).then(() => {
            refetch();
        });
    };

    const selectedCount = () => {
        let count = 0;
        for (const index in selected) {
            if (selected[index] === true) count++;
        }

        return count;
    };

    const Table = () => (
        <table>
            <tbody>
                <tr>
                    <th></th>
                    <th>
                        <h2>Title</h2>
                    </th>
                    <th>
                        <h2>Content</h2>
                    </th>
                </tr>
                {data.map((post) => (
                    <tr key={post.id}>
                        <td>
                            <input
                                type="checkbox"
                                name={post.id}
                                checked={selected[post.id]}
                                onChange={(e) => {
                                    const newSelected = { ...selected };
                                    newSelected[post.id] = e.target.checked;
                                    setSelected(newSelected);
                                }}
                            />
                        </td>
                        <td>{post.title}</td>
                        <td>{post.content}</td>
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

                table {
                    width: 100%;
                    margin-bottom: 2rem;
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
            <div>
                <input
                    key="create"
                    type="button"
                    value="Create"
                    onClick={(e) => {
                        e.preventDefault();
                        setPopup(
                            <SubmissionPopup
                                heading="Create Post"
                                mainlabel="Title:"
                                sublabel="Content:"
                                closepopup={() => setPopup(<div />)}
                                submitaction={submitPost}
                            />
                        );
                    }}
                />
                <input
                    key="delete"
                    type="button"
                    value={`Delete${
                        selectedCount() > 1 ? ` (${selectedCount()})` : ""
                    }`}
                    disabled={selectedCount() === 0}
                    onClick={(e) => {
                        e.preventDefault();
                        deletePosts();
                    }}
                />
                <input
                    key="edit"
                    type="button"
                    value="Edit"
                    disabled={selectedCount() !== 1}
                    onClick={(e) => {
                        e.preventDefault();
                        setPopup(
                            <SubmissionPopup
                                heading="Edit Post"
                                mainlabel="Title:"
                                sublabel="Content:"
                                closepopup={() => setPopup(<div />)}
                                mainvalue={() => {
                                    for (let index of Object.keys(data)) {
                                        if (selected[data[index].id] === true) {
                                            return data[index].title;
                                        }
                                    }
                                }}
                                subvalue={() => {
                                    for (let index of Object.keys(data)) {
                                        if (selected[data[index].id] === true) {
                                            return data[index].content;
                                        }
                                    }
                                }}
                                submitaction={(e, title, content) => {
                                    let id;

                                    for (let key of Object.keys(selected)) {
                                        if (selected[key] === true) {
                                            id = key;
                                            break;
                                        }
                                    }

                                    if (id) editPost(e, id, title, content);
                                }}
                            />
                        );
                    }}
                />
            </div>
            <style jsx>{`
                #posts-page {
                    padding: 0.5rem 8vw;
                }

                input[type="button"] {
                    width: 100px;
                }

                input[type="button"]:not(:first-child) {
                    margin-left: 1rem;
                }
            `}</style>
        </div>
    );
};

const Tweaks = () => {
    const [popup, setPopup] = useState(<div />);
    const [selected, setSelected] = useState({});

    const [{ data, loading, error }, refetch] = useAxios({
        url: config.ENDPOINT + "/tweaks",
    });

    const deleteTweaks = async () => {
        const newSelected = { ...selected };

        const ids = Object.keys(selected).map((key) => {
            if (selected[key]) {
                delete newSelected[key];
                return key;
            }
        });

        setSelected(newSelected);

        await axios({
            method: "post",
            url: config.ENDPOINT + "/tweaks/remove",
            withCredentials: true,
            data: {
                ids,
            },
        }).then(refetch);
    };

    const submitTweak = async (e, name, description) => {
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
        });
    };

    const editTweak = async (e, id, name, description) => {
        e.preventDefault();

        await axios({
            method: "patch",
            url: config.ENDPOINT + "/tweaks/update",
            withCredentials: true,
            data: {
                id,
                name,
                description,
            },
        }).then(() => {
            refetch();
        });
    };

    const selectedCount = () => {
        let count = 0;
        for (const index in selected) {
            if (selected[index] === true) count++;
        }

        return count;
    };

    const Table = () => (
        <table>
            <tbody>
                <tr>
                    <th></th>
                    <th>
                        <h2>Name</h2>
                    </th>
                    <th>
                        <h2>Description</h2>
                    </th>
                </tr>
                {data.map((tweak) => (
                    <tr key={tweak.id}>
                        <td>
                            <input
                                type="checkbox"
                                name={tweak.id}
                                checked={selected[tweak.id]}
                                onChange={(e) => {
                                    const newSelected = { ...selected };
                                    newSelected[tweak.id] = e.target.checked;
                                    setSelected(newSelected);
                                }}
                            />
                        </td>
                        <td>{tweak.name}</td>
                        <td>{tweak.description}</td>
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

                table {
                    width: 100%;
                    margin-bottom: 2rem;
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
        <div id="tweaks-page">
            {popup}
            <h2>Manage Tweaks</h2>
            {error ? (
                <p>Error while loading tweaks</p>
            ) : loading ? (
                <p>Loading tweaks...</p>
            ) : (
                <Table />
            )}
            <div>
                <input
                    key="create"
                    type="button"
                    value="Create"
                    onClick={(e) => {
                        e.preventDefault();
                        setPopup(
                            <SubmissionPopup
                                heading="Add Tweak"
                                mainlabel="Name:"
                                sublabel="Description:"
                                closepopup={() => setPopup(<div />)}
                                submitaction={submitTweak}
                            />
                        );
                    }}
                />
                <input
                    key="delete"
                    type="button"
                    value={`Delete${
                        selectedCount() > 1 ? ` (${selectedCount()})` : ""
                    }`}
                    disabled={selectedCount() === 0}
                    onClick={(e) => {
                        e.preventDefault();
                        deleteTweaks();
                    }}
                />
                <input
                    key="edit"
                    type="button"
                    value="Edit"
                    disabled={selectedCount() !== 1}
                    onClick={(e) => {
                        e.preventDefault();
                        setPopup(
                            <SubmissionPopup
                                heading="Edit Tweak"
                                mainlabel="Name:"
                                sublabel="Description:"
                                closepopup={() => setPopup(<div />)}
                                mainvalue={() => {
                                    for (let index of Object.keys(data)) {
                                        if (selected[data[index].id] === true) {
                                            return data[index].name;
                                        }
                                    }
                                }}
                                subvalue={() => {
                                    for (let index of Object.keys(data)) {
                                        if (selected[data[index].id] === true) {
                                            return data[index].description;
                                        }
                                    }
                                }}
                                submitaction={(e, name, description) => {
                                    let id;

                                    for (let key of Object.keys(selected)) {
                                        if (selected[key] === true) {
                                            id = key;
                                            break;
                                        }
                                    }

                                    if (id) editTweak(e, id, name, description);
                                }}
                            />
                        );
                    }}
                />
            </div>
            <style jsx>{`
                #tweaks-page {
                    padding: 0.5rem 8vw;
                }

                input[type="button"] {
                    width: 100px;
                }

                input[type="button"]:not(:first-child) {
                    margin-left: 1rem;
                }
            `}</style>
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
