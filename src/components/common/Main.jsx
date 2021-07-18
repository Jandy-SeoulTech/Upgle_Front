import React from "react";

const Main = ({ postList }) => {
  return (
    <>
      {postList.map((post) => (
        <div key={post.id}>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </div>
      ))}
    </>
  );
};

export default Main;
