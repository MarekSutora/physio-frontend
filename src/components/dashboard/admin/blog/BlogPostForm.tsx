"use client";

import React, { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { TC_BlogPost, TG_BlogPost } from "@/lib/shared/types";
import { createBlogPostAction } from "@/lib/actions/blogActions";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

const RichTextEditor = dynamic(() => import("./RichTextEditor"), {
  ssr: false,
});

type BlogFormProps = {
  createNew: boolean;
  oldData?: TG_BlogPost;
};

const BlogPostForm = ({ createNew, oldData }: BlogFormProps) => {
  const { toast } = useToast();

  const [blogData, setBlogData] = useState<TC_BlogPost>(
    oldData
      ? oldData
      : {
          title: "",
          author: "",
          datePublished: "",
          keywordsString: "",
          mainImageUrl: "",
          htmlContent: "",
          isHidden: false,
        },
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setBlogData({ ...blogData, [id]: value });
  };

  const handleEditorChange = (htmlContent: string) => {
    setBlogData({ ...blogData, htmlContent });
  };

  const handleSubmitBlog = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await createBlogPostAction(blogData);
      toast({
        variant: "success",
        title: "Úspech. 🎉",
        className: "text-lg",
      });
    } catch (error) {
      console.log("error", error);
      toast({
        variant: "destructive",
        description: "Nepodarilo sa pridať. 🙄",
        className: "text-lg",
      });
    }
  };

  function handleCheckboxChange(event: FormEvent<HTMLButtonElement>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <form
      className="prose m-auto px-5 md:prose-lg lg:prose-xl prose-img:m-auto prose-img:px-0 md:p-0 lg:p-0"
      onSubmit={handleSubmitBlog}
    >
      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        type="text"
        required
        value={blogData.title}
        onChange={handleInputChange}
      />

      <Label htmlFor="author">Author</Label>
      <Input
        id="author"
        type="text"
        required
        value={blogData.author}
        onChange={handleInputChange}
      />

      <Label htmlFor="datePublished">Date Published</Label>
      <Input
        id="datePublished"
        type="date"
        required
        value={blogData.datePublished}
        onChange={handleInputChange}
      />

      <Label htmlFor="mainImageUrl">Main Image URL</Label>
      <Input
        id="mainImageUrl"
        type="text"
        required
        value={blogData.mainImageUrl}
        onChange={handleInputChange}
      />

      <Label htmlFor="keywordsString">Keywords</Label>
      <Input
        id="keywordsString"
        type="text"
        required
        value={blogData.keywordsString}
        onChange={handleInputChange}
      />

      <Label htmlFor="content">Content</Label>
      <RichTextEditor onContentChange={handleEditorChange} />

      <Label htmlFor="isHidden">Is Hidden</Label>
      <Checkbox
        id="isHidden"
        checked={blogData.isHidden}
        onChange={handleCheckboxChange}
      />

      <Button type="submit" className="mt-2">
        Submit
      </Button>
    </form>
  );
};

export default BlogPostForm;
