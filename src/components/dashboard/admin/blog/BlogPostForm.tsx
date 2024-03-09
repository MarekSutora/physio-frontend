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
import { sk } from "date-fns/locale";
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
        await createBlogPostAction(blogData);
        toast({
          variant: "success",
          title: "Článok úspešne vytvorený! 🎉",
          className: "text-lg",
        });
      } else {
        await updateBlogPostAction(blogData);
        toast({
          variant: "success",
          title: "Článok úspešne upravený! 🎉",
          className: "text-lg",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: createNew
          ? "Nepodarilo sa vytvoriť článok. 😔"
          : "Nepodarilo sa upraviť článok. 😔",
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
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-1">
          <div className="flex w-1/2 flex-col gap-1">
            <Label htmlFor="title">Názov</Label>
            <Input
              id="title"
              type="text"
              required
              value={blogData.title}
              onChange={handleInputChange}
              className="h-9"
            />
          </div>
          <div className="flex w-1/2 flex-col gap-1">
            <Label htmlFor="author">Autor</Label>
            <Input
              id="author"
              type="text"
              required
              value={blogData.author}
              onChange={handleInputChange}
              className="h-9"
            />
          </div>
        </div>

        <div className="flex flex-row gap-1">
          <div className="flex h-14 w-1/2 flex-col gap-1">
            <Label htmlFor="datePublished">Publikované</Label>
            <DatePicker
              selected={datePublished}
              onChange={handleDateChange}
              dateFormat="dd.MM.yyyy"
              isClearable
              locale={sk}
              placeholderText="Vyberte dátum"
              className="mb-3 h-9 w-full cursor-pointer select-none rounded-md border text-center"
              popperClassName="z-50"
            />
          </div>
          <div className="flex w-1/2 flex-col gap-1">
            <Label htmlFor="mainImageUrl">URL Hlavného obrázka</Label>
            <Input
              id="mainImageUrl"
              type="text"
              required
              value={blogData.mainImageUrl}
              onChange={handleInputChange}
              className="h-9"
            />
          </div>
        </div>

        <div className="flex flex-row items-center gap-1">
          <div className="flex w-10/12 flex-col gap-1">
            <Label htmlFor="keywordsString">Kľúčové slová</Label>
            <Input
              id="keywordsString"
              type="text"
              required
              value={blogData.keywordsString}
              onChange={handleInputChange}
              className="h-9"
            />
          </div>
          <div className="flex flex-row items-center justify-center gap-2 pt-5">
            <Label htmlFor="isHidden">Schovať</Label>
            <Checkbox
              id="isHidden"
              checked={blogData.isHidden}
              onCheckedChange={handleCheckboxChange}
              className="ml-0.5"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="content">Obsah</Label>
          <RichTextEditor
            onContentChange={handleEditorChange}
            initialContent={blogData.htmlContent}
          />
        </div>

        {createNew ? (
          <Button type="submit">Vytvoriť</Button>
        ) : (
          <Button type="submit">Upraviť</Button>
        )}
      </div>
    </form>
  );
};

export default BlogPostForm;
