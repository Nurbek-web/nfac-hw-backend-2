import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function EditPostForm({ post, onUpdatePost, onCancel }: any) {
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [tags, setTags] = useState(post.tags.join(", "));
  const [likes, setLikes] = useState(post.reactions.likes);
  const [dislikes, setDislikes] = useState(post.reactions.dislikes);
  const [views, setViews] = useState(post.views);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const updatedPost = {
      ...post,
      title,
      body,
      tags: tags.split(",").map((tag: any) => tag.trim()),
      reactions: { likes, dislikes },
      views,
    };
    onUpdatePost(updatedPost);
  };

  return (
    <div className="flex justify-center mt-6">
      <Card className="w-full max-w-2xl">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Edit Blog Post</CardTitle>
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
            <Button type="button" onClick={onCancel} className="mr-2">
              Cancel
            </Button>
            <Button type="submit" className="ml-auto">
              Update Post
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
