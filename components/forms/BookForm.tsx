"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { bookFormSchema } from "@/lib/validations";
import { z } from "zod";


interface Props extends Partial<Book> {
  type?: "create" | "update";
}

const BookForm = ({ type, ...book }: Props) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof bookFormSchema>>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      title: "",
      description: "",
      author: "",
      genre: "",
      rating: 1,
      totalCopies: 1,
      coverUrl: "",
      coverColor: "",
      videoUrl: "",
      summary: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof bookFormSchema>) => {};

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
            control={form.control}
            name={"title"}
            render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-base font-normal text-dark-500">
                      Book Title
                    </FormLabel>
                    <FormControl>
                        <Input
                            required 
                            placeholder="Book Title"
                            {...field}
                            className="book-form_input"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />

        <FormField
            control={form.control}
            name={"author"}
            render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-base font-normal text-dark-500">
                      Author
                    </FormLabel>
                    <FormControl>
                        <Input
                            required 
                            placeholder="Book author"
                            {...field}
                            className="book-form_input"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />

        <FormField
            control={form.control}
            name={"genre"}
            render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-base font-normal text-dark-500">
                      Genre
                    </FormLabel>
                    <FormControl>
                        <Input
                            required 
                            placeholder="Book genre"
                            {...field}
                            className="book-form_input"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />

        <FormField
            control={form.control}
            name={"rating"}
            render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-base font-normal text-dark-500">
                      Rating
                    </FormLabel>
                    <FormControl>
                        <Input
                            type="number" 
                            min={1}
                            max={5}
                            placeholder="Book rating"
                            {...field}
                            className="book-form_input"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
      </form>
    </Form>
  );
};

export default BookForm;



