// Updated src/pages/Blog.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBlogs } from "../api";

interface BlogPost { id: number; title: string; content: string; date: string; author: string; }

export default function Blog() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    getBlogs().then(setBlogs);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <div className="space-y-8">
        {blogs.map(b => (
          <div key={b.id} className="blog-card bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-2">{b.title}</h2>
            <p className="text-gray-500 mb-2">By {b.author} on {b.date}</p>
            <p className="mb-4">{b.content.substring(0, 200)}...</p>
            <Link to={`/blog/${b.id}`} className="text-purple-500 font-semibold">Read Full Post</Link>
          </div>
        ))}
      </div>
    </div>
  );
}