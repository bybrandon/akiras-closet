import { useState, useEffect } from 'react';
import * as heroService from '../../services/heroService';

export default function TeamListPage() {
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    async function fetchHeroes() {
      const heroes = await heroService.index();
      setHeroes(heroes);
    }
    fetchHeroes();
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
