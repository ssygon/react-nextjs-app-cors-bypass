// Note:
// Always use fetch() from server side to avoid CORS error
// Client side fetch() is not allowed and causes CORS error

'use server';

// Get posts from json test API
export const getPosts = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const posts = await res.json();
  console.log(posts); // output to server console
  return posts;
}

// Check if a URL exists
export const isUrlExists = async (url: string) => {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return res.ok; // This will be true for status codes in the range 200-299
  } catch (error) {
    console.error(`Error checking URL ${url}:`, error);
    return false;
  }
}