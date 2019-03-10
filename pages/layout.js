import React from 'react';
import Head from 'next/head';

import HeaderNav from '../components/header-nav';
import Footer from '../components/footer';

export default class extends React.Component {
  renderHead() {
    const { layout, title, description } = this.props;

    return (
      <Head>
        <title>
          {title || 'Not Found'}
          {' '}
-
          {layout.data.site_name}
        </title>
        <meta
          name="description"
          content={description || ''}
        />
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        <meta name="author" content="Dan" />
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
