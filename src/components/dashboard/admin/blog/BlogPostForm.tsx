"use client";

import React, { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { TBlogPost } from "@/lib/shared/types";
import {
  createBlogPostAction,
  updateBlogPostAction,
} from "@/lib/actions/blogActions";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import CSS for react-datepicker

const RichTextEditor = dynamic(() => import("./RichTextEditor"), {
  ssr: false,
});

type BlogFormProps = {
  createNew: boolean;
  oldData?: TBlogPost;
};

const BlogPostForm = ({ createNew, oldData }: BlogFormProps) => {
  const { toast } = useToast();

  const [datePublished, setDatePublished] = useState<Date | null>(
    oldData && oldData.datePublished ? new Date(oldData.datePublished) : null,
  );

  const [blogData, setBlogData] = useState<TBlogPost>(
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
      if (createNew) {
        // Call the function to create a new blog post
        await createBlogPostAction(blogData);
        toast({
          variant: "success",
          title: "Post created successfully! 🎉",
          className: "text-lg",
        });
      } else {
        await updateBlogPostAction(blogData);
        toast({
          variant: "success",
          title: "Post updated successfully! 🎉",
          className: "text-lg",
        });
      }
    } catch (error) {
      console.log("error", error);
      toast({
        variant: "destructive",
        description: createNew
          ? "Failed to create the post."
          : "Failed to update the post.",
        className: "text-lg",
      });
    }
  };

  const handleCheckboxChange = (checked: boolean): void => {
    setBlogData({ ...blogData, isHidden: checked });
  };

  const handleDateChange = (date: Date | null) => {
    setDatePublished(date);
    setBlogData({ ...blogData, datePublished: date?.toISOString() || "" });
  };

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

      <div className="flex flex-col">
        <Label htmlFor="datePublished">Date Published</Label>
        <DatePicker
          selected={datePublished}
          onChange={handleDateChange}
          dateFormat="dd.MM.yyyy"
          isClearable
          placeholderText="Select a date"
          className="form-control"
        />
      </div>

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

      <Label htmlFor="isHidden">Is Hidden</Label>
      <Checkbox
        id="isHidden"
        checked={blogData.isHidden}
        onCheckedChange={handleCheckboxChange}
      />

      <Label htmlFor="content">Content</Label>
      <RichTextEditor
        onContentChange={handleEditorChange}
        initialContent={blogData.htmlContent} // Pass the current content state to the editor
      />

      {createNew ? (
        <Button type="submit">Create</Button>
      ) : (
        <Button type="submit">Update</Button>
      )}
    </form>
  );
};

export default BlogPostForm;
