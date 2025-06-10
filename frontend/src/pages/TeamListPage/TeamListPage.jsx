import { useState, useEffect } from 'react';
import * as heroService from '../../services/heroService';

export default function TeamListPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const posts = await postService.index();
      setPosts(posts);
    }
    fetchPosts();
  }, []);

  return (
    <>
      {/* <h1>Post List</h1>
      {posts.length ? 
        <ul>
          {posts.map((post) => <li key={post._id}>{post.content}</li>)}
        </ul>
        :
        <p>No Posts Yet!</p>
      } */}
    </>
  );
}