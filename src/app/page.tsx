'use client'

import { useState } from 'react';
import { formatUrl, isValidUrl } from "@/app/utils/utils";
import { getPosts, isUrlExists } from "@/app/api/actions";

const Home = () => {
  const [url, setUrl] = useState('');
  const [posts, setPosts] = useState([]);

  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleIsUrlExists = async (e: any) => {
    e.preventDefault();
    if (url) {
      try {
        setUrl(formatUrl(url));
        console.log(`formatted url: ${formatUrl(url)}`);
        const isValid = isValidUrl(url);
        console.log(`isValid: ${isValid}`);
        if (!isValid) {
          setMessageStatus('Invalid URL format', true);
          return;
        }
        const result = await isUrlExists(url);
        console.log(result);
        if (result) {
          setMessageStatus('URL exists', false);
        } else {
          setMessageStatus('URL does not exist', true);
        }
      } catch (error) {
        console.error('Error checking URL:', error);
        setMessageStatus('Error checking URL', true);
      }
    } else {
      console.error('Please enter a URL');
      setMessageStatus('Please enter a URL', true);
    }
  };
  
  const handleGetPosts = async () => {
    try {
      const fetchedPosts = await getPosts();
      console.log(fetchedPosts);
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const setMessageStatus = (message: string, isError: boolean = false) => {
    console.log(message);
    setMessage(message);
    if (isError) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }

  return (
    <main>
      <section>
        <h1>Bypassing CORS Test Page</h1>
        <h2>Test if a URL exists</h2>
        <form onSubmit={handleIsUrlExists}>
          <input 
            type="text" 
            placeholder="Enter an existing URL" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <p>(e.g. https://www.google.com)</p>
          <button type="submit" onClick={handleIsUrlExists} className="btn">Test if URL exists</button>
          <div className={`message ${isError ? 'error' : ''}`}>{message}</div>
        </form>
      </section>
      <section>
        <h2>Test if can fetch data from this third-party API</h2>
        <h4>https://jsonplaceholder.typicode.com/posts</h4>
        <button onClick={handleGetPosts} className="btn">Get posts</button>
        {posts.length > 0 && (
          <ul>
            {posts.map((post: any) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default Home;