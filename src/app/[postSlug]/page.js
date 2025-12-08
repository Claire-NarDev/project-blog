import React from "react";
import dynamic from "next/dynamic";

import { MDXRemote } from "next-mdx-remote/rsc";
import { loadBlogPost } from "@/helpers/file-helpers.js";
import CodeSnippet from "@/components/CodeSnippet/CodeSnippet.js";
import Spinner from "@/components/Spinner";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";

const DivisionGroupsDemo = dynamic(
  () => import("@/components/DivisionGroupsDemo"),
  {
    loading: Spinner,
  }
);

export async function generateMetadata({ params }) {
  const { postSlug } = await params;

  // Least priviledge
  const { frontmatter } = await loadBlogPost(postSlug);

  return {
    title: `${frontmatter.title}`,
    description: `${frontmatter.abstract}`,
  };
}

async function BlogPost({ params }) {
  const { postSlug } = await params;
  // Least priviledge: no delegated
  const { frontmatter, content } = await loadBlogPost(postSlug);
  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote
          source={content}
          components={{
            pre: CodeSnippet,
            DivisionGroupsDemo,
          }}
        ></MDXRemote>
      </div>
    </article>
  );
}

export default BlogPost;
