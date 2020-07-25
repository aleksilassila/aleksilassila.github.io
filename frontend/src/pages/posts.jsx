import Link from "next/link";
import useAxios from "axios-hooks";
import axios from "axios";
import { useState } from "react";

import config from "../config";
import theme from "../theme";

const Posts = (props) => {
    const [{ data, loading, error }, refetch] = useAxios({
        url: config.ENDPOINT + "/posts/get",
        withCredentials: true,
    });

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const deletePost = async (postId) => {
        await axios({
            method: "post",
            url: config.ENDPOINT + "/posts/remove",
            withCredentials: true,
            data: {
                id: postId,
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

    const Posts = () => (
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
                    font-weight: 500;
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
            <Panel />
            <div id="posts-page">
                {error ? (
                    <p>Error while loading posts</p>
                ) : loading ? (
                    <p>Loading posts...</p>
                ) : (
                    <Posts />
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
                    <input key="submit" type="submit" value="Submit" />
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

export default Posts;
