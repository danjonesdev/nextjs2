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
      layout, title, description, article,
    } = this.props;

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
        <meta itemProp="image" content="http://www.example.com/image.jpg" />

        {/* Twitter Card data */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@publisher_handle" />
        <meta name="twitter:title" content={title || 'Not Found'} />
        <meta name="twitter:description" content={description || ''} />
        <meta name="twitter:creator" content="@author_handle" />
        {/* Twitter summary card with large image must be at least 280x150px */}
        <meta name="twitter:image:src" content="http://www.example.com/image.jpg" />

        {/* Open Graph data */}
        <meta property="og:title" content={title || 'Not Found'} />

        <meta property="og:url" content="http://www.example.com/" />
        <meta property="og:image" content="http://example.com/image.jpg" />
        <meta property="og:description" content={description || ''} />
        <meta property="og:site_name" content={layout.data.site_name} />
        <meta property="fb:admins" content="Facebook numberic ID" />

        {article ? this.renderArticleMeta() : ''}

        <link href="/_next/static/style.css" rel="stylesheet" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.23.0/polyfill.min.js" />
      </Head>
    );
  }

  render() {
    const { mainClass, children } = this.props;

    return (
      <React.Fragment>
        {this.renderHead()}
        <HeaderNav {...this.props} />
        <main className={mainClass}>{children}</main>
        <Footer {...this.props} />
      </React.Fragment>
    );
  }
}
