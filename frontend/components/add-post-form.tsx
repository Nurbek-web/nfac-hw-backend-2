"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function AddPostForm({ onAddPost }: any) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [views, setViews] = useState(0);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(), // Generate a unique ID for the new post
      title,
      body,
      tags: tags.split(",").map((tag) => tag.trim()),
      reactions: { likes, dislikes },
      views,
    };
    onAddPost(newPost);
    // Clear form fields
    setTitle("");
    setBody("");
    setTags("");
    setLikes(0);
    setDislikes(0);
    setViews(0);
  };

  return (
    <div className="flex justify-center mt-6">
      <Card className="w-full max-w-2xl">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Create New Blog Post</CardTitle>
            <CardDescription>
              Fill out the form to publish a new post.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Post Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="body">Post Body</Label>
              <Textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Enter post content"
                className="min-h-[200px]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Comma-separated tags"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="likes">Likes</Label>
                <Input
                  id="likes"
                  type="number"
                  value={likes}
                  onChange={(e) => setLikes(Number(e.target.value))}
                  placeholder="0"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dislikes">Dislikes</Label>
                <Input
                  id="dislikes"
                  type="number"
                  value={dislikes}
                  onChange={(e) => setDislikes(Number(e.target.value))}
                  placeholder="0"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="views">Views</Label>
                <Input
                  id="views"
                  type="number"
                  value={views}
                  onChange={(e) => setViews(Number(e.target.value))}
                  placeholder="0"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="ml-auto">
              Publish Post
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
