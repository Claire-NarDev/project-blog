import React from "react";

import BlogSummaryCard from "@/components/BlogSummaryCard";
import { getBlogPostList } from "../helpers/file-helpers.js";
import styles from "./homepage.module.css";

async function Home() {
  const blogList = await getBlogPostList();

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>Latest Content:</h1>

      {/* Instead of title, abstract, publishedOn, we put ...delegated.
      By doing so, if we add other tags to a blog element, it is automatically added here. */}
      {blogList.map(({ slug, ...delegated }) => {
        return <BlogSummaryCard key={slug} slug={slug} {...delegated} />;
      })}
    </div>
  );
}

export default Home;
