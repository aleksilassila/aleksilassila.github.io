import useAxios from "axios-hooks";

import config from "../config";
import theme from "../theme";

const Posts = () => {
    const [{ data, loading, error }, refetch] = useAxios({
        url: config.ENDPOINT + "/posts",
        withCredentials: true,
    });

    if (error) {
        return <p>Could not load posts</p>;
    } else if (loading) {
        return <p>Loading posts...</p>;
    } else {
        return (
            <div>
                <h2 id="posts-heading">Posts</h2>
                <div id="posts">
                    {data.map((post) => {
                        const date = new Date(post.createdAt);
                        return (
                            <div className="post" key={post.id}>
                                <div className="post-title-name">
                                    <h2>{post.title}</h2>
                                    <p className="post-metadata">
                                        {date.toLocaleDateString(undefined, {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}{" "}
                                        by {post.creator.firstName}
                                    </p>
                                </div>
                                <p>{post.content}</p>
                            </div>
                        );
                    })}
                </div>
                <style jsx>{`
                    #posts {
                        margin: 1em 0;
                        border-top: 1px solid ${theme.color.black}33;
                        padding: 0 1em;
                    }

                    .post {
                        border-bottom: 1px solid ${theme.color.black}33;
                        padding-top: 2em;
                        padding-bottom: 2em;
                    }

                    #posts-heading {
                        margin: 0;
                    }

                    .post-title-name {
                        display: flex;
                        justify-content: space-between;
                    }

                    .post h2 {
                        font-size: 1em;
                        margin: 0;
                        margin-bottom: 1em;
                    }

                    .post p {
                        font-size: 0.9em;
                        margin: 0;
                    }

                    .post-metadata {
                        opacity: 0.5;
                    }
                `}</style>
            </div>
        );
    }
};

export default Posts;
