// New file: src/pages/BlogPostDetail.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogById } from "../api";

interface BlogPost { id: number; title: string; content: string; date: string; author: string; }

export default function BlogPostDetail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (id) getBlogById(parseInt(id)).then(setPost);
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="bg-white shadow-lg rounded-lg p-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-6">By {post.author} on {post.date}</p>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}