import React from 'react';

const Main = ({ postList }) => {
  return (
    <div style={{ marginTop: '65px' }}>
      {postList.map((post) => (
        <div key={post.id}>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Main;
