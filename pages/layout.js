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
        <meta
          property="article:published_time"
          content={article.first_publication_date || ''}
        />
        <meta
          property="article:modified_time"
          content={article.first_publication_date}
        />
        <meta property="article:section" content="Article Section" />
        <meta property="article:tag" content="Article Tag" />
      </>
    );
  }

  renderHead() {
    const {
      layout, article, title, description, image,
    } = this.props;

    console.log(layout);

    return (
      <Head>
        <title>
          {title || 'Not Found'}
          {' - '}
          {layout.data.site_name}
        </title>
        <meta name="description" content={description || ''} />

        {/* Schema.org markup for Google+ */}
        <meta itemProp="name" content={title || 'Not Found'} />
        <meta itemProp="description" content={description || ''} />
        <meta itemProp="image" content={image || '/static/images/logo.png'} />

        {/* Twitter Card data */}
        <meta name="twitter:card" content="summary_large_image" />
        {layout.data.twitter_handle ? <meta name="twitter:site" content={layout.data.twitter_handle} /> : ''}
        <meta name="twitter:title" content={title || 'Not Found'} />
        <meta name="twitter:description" content={description || ''} />
        {layout.data.twitter_handle ? <meta name="twitter:creator" content={layout.data.twitter_handle} /> : ''}
        {/* Twitter summary card with large image must be at least 280x150px */}
        <meta name="twitter:image:src" content={image || '/static/images/logo.png'} />

        {/* Open Graph data */}
        <meta property="og:title" content={title || 'Not Found'} />

        <meta property="og:url" content="http://www.example.com/" />
        <meta property="og:image" content={image || '/static/images/logo.png'} />
        <meta property="og:description" content={description || ''} />
        <meta property="og:site_name" content={layout.data.site_name} />
        <meta property="fb:admins" content="Facebook numberic ID" />

        {article ? this.renderArticleMeta() : ''}

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
