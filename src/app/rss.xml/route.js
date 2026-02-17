import { BLOG_TITLE, BLOG_DESCRIPTION } from "@/constants";
import { getBlogPostList } from "@/helpers/file-helpers";
import RSS from "rss";

import { NextResponse } from "next/server";

export async function GET() {
  const blogList = await getBlogPostList();

  /* lets create an rss feed */
  var feed = new RSS({
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    feed_url: "http://localhost:3000/rss.xml",
    site_url: "http://localhost:3000/",
    language: "en",
    pubDate: "May 20, 2012 04:00:00 GMT",
  });

  /* loop over data and add to feed */
  blogList.map((blog) =>
    feed.item({
      title: blog.title,
      description: blog.description,
      date: blog.publishedOn,
      url: `http://localhost:3000/${blog.slug}`, // link to the item
    }),
  );

  // Generate the raw XML string using `feed.xml`, and then
  // send it to the client. We need to set the Content-Type
  // header so that browsers / RSS clients will interpret
  // it as XML, and not as plaintext.

  const response = new NextResponse(feed.xml({ indent: true }));
  response.headers.set("Content-Type", "application/xml");

  return response;
}
