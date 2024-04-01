"use client";

import React from "react";
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
import "react-datepicker/dist/react-datepicker.css";
import { getErrorMessage } from "@/lib/utils/utils";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const RichTextEditor = dynamic(() => import("./RichTextEditor"), {
  ssr: false,
});

const blogPostSchema = z.object({
  title: z
    .string()
    .min(1, "Názov je povinný.")
    .max(100, "Názov musí byť kratší ako 100 znakov."),
  author: z
    .string()
    .min(1, "Autor je povinný.")
    .max(100, "Autor musí byť kratší ako 100 znakov."),
  datePublished: z.date(),
  htmlContent: z.string().min(1, "Obsah HTML je povinný."),
  keywordsString: z
    .string()
    .min(1, "Reťazec kľúčových slov je povinný.")
    .max(300, "Reťazec kľúčových slov musí byť kratší ako 300 znakov."),
  mainImageUrl: z.string().min(1, "URL hlavného obrázka je povinný."),
  isHidden: z.boolean(),
});

type BlogFormProps = {
  createNew: boolean;
  oldData?: TBlogPost;
};

const BlogPostForm = ({ createNew, oldData }: BlogFormProps) => {
  const { toast } = useToast();

  const defaultValues = {
    title: oldData?.title || "",
    author: oldData?.author || "",
    datePublished: oldData?.datePublished || new Date(),
    htmlContent: oldData?.htmlContent || "",
    keywordsString: oldData?.keywordsString || "",
    mainImageUrl: oldData?.mainImageUrl || "",
    isHidden: oldData?.isHidden || false,
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    register,
  } = useForm<TBlogPost>({
    defaultValues,
    resolver: zodResolver(blogPostSchema),
  });

  const onSubmit = async (blogPost: TBlogPost) => {
    try {
      if (createNew) {
        await createBlogPostAction(blogPost);
        toast({
          variant: "success",
          title: "Článok úspešne vytvorený! 🎉",
          className: "text-lg",
          duration: 3000,
        });
      } else {
        await updateBlogPostAction(blogPost);
        toast({
          variant: "success",
          title: "Článok úspešne upravený! 🎉",
          className: "text-lg",
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: getErrorMessage(error),
        className: "text-lg",
        duration: 3000,
      });
    }
  };

  return (
    <form
      className="prose m-auto px-5 md:prose-lg lg:prose-xl prose-img:m-auto prose-img:px-0 md:p-0 lg:p-0"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-1">
          <div className="flex w-1/2 flex-col gap-1">
            <Label htmlFor="title">Názov</Label>
            <Input
              id="title"
              type="text"
              {...register("title")}
              className={`h-9 ${errors.title ? "border-red-500" : ""}`}
            />
            {errors.title && (
              <span className="text-sm font-medium text-destructive">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="flex w-1/2 flex-col gap-1">
            <Label htmlFor="author">Autor</Label>
            <Input
              id="author"
              type="text"
              {...register("author")}
              className={`h-9 ${errors.author ? "border-red-500" : ""}`}
            />
            {errors.author && (
              <span className="text-sm font-medium text-destructive">
                {errors.author.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-row gap-1">
          <div className="flex h-14 w-1/2 flex-col gap-1">
            <Label htmlFor="datePublished">Publikované</Label>
            <Controller
              control={control}
              name="datePublished"
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={(date) =>
                    setValue("datePublished", date ? date : new Date())
                  }
                  dateFormat="dd.MM.yyyy"
                  locale={sk}
                  placeholderText="Vyberte dátum"
                  className="mb-3 h-9 w-full cursor-pointer select-none rounded-md border text-center"
                  popperClassName="z-50"
                />
              )}
            />
          </div>
          <div className="flex w-1/2 flex-col gap-1">
            <Label htmlFor="mainImageUrl">URL hlavného obrázka</Label>
            <Input
              id="mainImageUrl"
              type="text"
              {...register("mainImageUrl")}
              className={`h-9 ${errors.mainImageUrl ? "border-red-500" : ""}`}
            />
            {errors.mainImageUrl && (
              <span className="text-sm font-medium text-destructive">
                {errors.mainImageUrl.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-row items-center gap-1">
          <div className="flex w-10/12 flex-col gap-1">
            <Label htmlFor="keywordsString">Kľúčové slová</Label>
            <Input
              id="keywordsString"
              type="text"
              {...register("keywordsString")}
              className={`h-9 ${errors.keywordsString ? "border-red-500" : ""}`}
            />
            {errors.keywordsString && (
              <span className="text-sm font-medium text-destructive">
                {errors.keywordsString.message}
              </span>
            )}
          </div>
          <div className="flex flex-row items-center justify-center gap-2 pt-5">
            <Label htmlFor="isHidden">Skrytý</Label>
            <Checkbox
              id="isHidden"
              {...register("isHidden")}
              defaultChecked={defaultValues.isHidden}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="htmlContent">Obsah</Label>
          <Controller
            control={control}
            name="htmlContent"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <RichTextEditor
                  onContentChange={(content) => onChange(content)}
                  initialContent={value || ""}
                />
                {error && (
                  <span className="text-sm font-medium text-destructive">
                    {error.message}
                  </span>
                )}
              </>
            )}
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
