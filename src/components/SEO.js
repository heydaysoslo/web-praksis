import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import ReactHtmlParser from "react-html-parser";

import { BACKEND_URL, FRONTEND_URL } from "../utils/wp";
import SiteContext from "./utilities/Context";

const SEO = ({ page }) => {
  const ctx = useContext(SiteContext);

  const preprocessNodes = (nodes) => {
    return nodes.map((node) => {
      if (node?.attribs?.rel === "canonical") {
        node.attribs.href = node.attribs.href.replace(
          BACKEND_URL,
          FRONTEND_URL
        );
      }
      return node;
    });
  };

  const { bloginfo } = ctx.state.settings;

  const pageTitle =
    page?.pageTitle || page?.title?.rendered || page?.title || null;

  /*
  <meta name="description" content="Helmet application" />
  const meta = [
    { name: 'description', content: description },
    { itemprop: 'description', content: description },
    { itemprop: 'image', content: this.getImage(data) },
  ]
  */

  const meta = [{ itemprop: "name", content: bloginfo?.name }];

  return (
    <>
      <Helmet titleTemplate="Frihet - %s" defaultTitle="" meta={meta}>
        <html lang="nb" />
        {pageTitle && <title>{pageTitle}</title>}
        {page &&
          page.yoast_head &&
          ReactHtmlParser(page.yoast_head, { preprocessNodes })}
        {bloginfo?.rss2_url && (
          <link
            rel="alternate"
            type="application/rss+xml"
            title="RSS Feed"
            href={bloginfo.rss2_url}
          />
        )}
      </Helmet>
      {/* <pre>{JSON.stringify(page, null, 2)}</pre> */}
    </>
  );
};

export default SEO;
