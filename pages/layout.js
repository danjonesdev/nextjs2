import React from 'react';
import Head from 'next/head';

import HeaderNav from '../components/header-nav';
import Footer from '../components/footer';

export default class extends React.Component {
  renderArticleMeta() {
    const { article } = this.props;

    return (
      <>
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={article.first_publication_date || ''} />
        <meta property="article:modified_time" content={article.first_publication_date || ''} />
        <meta property="article:section" content="Article Section" />
        <meta property="article:tag" content="Article Tag" />
      </>
    );
  }

  renderHead() {
    const {
      layout, article, title, description, image,
    } = this.props;

    const titleVal = title || 'Not Found';
    const descriptionVal = description || '';
    const imageVal = image || '/static/images/logo.png';
    const siteNameVal = layout.data.site_name || '';
    const twitterVal = layout.data.twitter_handle || '';

    return (
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        <title>
          {titleVal}
          {' - '}
          {siteNameVal}
        </title>
        <meta name="description" content={descriptionVal} />

        {/* Schema.org markup for Google+ */}
        <meta itemProp="name" content={titleVal} />
        <meta itemProp="description" content={descriptionVal} />
        <meta itemProp="image" content={imageVal} />

        {/* Twitter Card data */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={titleVal} />
        <meta name="twitter:description" content={descriptionVal} />
        <meta name="twitter:image:src" content={imageVal} />
        {twitterVal ? <meta name="twitter:creator" content={twitterVal} /> : false}
        {twitterVal ? <meta name="twitter:site" content={twitterVal} /> : false}

        {/* Open Graph data */}
        <meta property="og:title" content={titleVal} />

        <meta property="og:image" content={imageVal} />
        <meta property="og:description" content={descriptionVal} />
        <meta property="og:site_name" content={siteNameVal} />
        <meta property="fb:admins" content="Facebook numberic ID" />

        {article ? this.renderArticleMeta() : false}

        {/* Favicon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/static/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/static/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/static/favicon/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        <link href="/_next/static/style.css" rel="stylesheet" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.23.0/polyfill.min.js" />
      </Head>
    );
  }

  render() {
    const { mainClass, children } = this.props;

    return (
      <>
        {this.renderHead()}
        <HeaderNav {...this.props} />
        <main className={mainClass}>{children}</main>
        <Footer {...this.props} />
      </>
    );
  }
}
