import fs from "fs/promises";
import { existsSync } from "node:fs";
import path from "path";
import matter from "gray-matter";
import React from "react";
import { notFound } from "next/navigation";

export async function getBlogPostList() {
  const fileNames = await readDirectory("/content");

  const blogPosts = [];

  for (let fileName of fileNames) {
    const rawContent = await readFile(`/content/${fileName}`);

    const { data: frontmatter } = matter(rawContent);

    blogPosts.push({
      slug: fileName.replace(".mdx", ""),
      ...frontmatter,
    });
  }

  return blogPosts.sort((p1, p2) => (p1.publishedOn < p2.publishedOn ? 1 : -1));
}

export const loadBlogPost = React.cache(async (slug) => {
  const rawContent = await readFile(`/content/${slug}.mdx`);

  if (!rawContent) {
    return notFound();
  }

  const { data: frontmatter, content } = matter(rawContent);

  return { frontmatter, content };
});

function readFile(localPath) {
  const filePath = path.join(process.cwd(), localPath);
  if (!existsSync(filePath)) {
    return undefined;
  }
  return fs.readFile(filePath, "utf8");
}

function readDirectory(localPath) {
  return fs.readdir(path.join(process.cwd(), localPath));
}
