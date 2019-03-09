import Head from "next/head";
import config from "../config";

import HeaderNav from "../components/header-nav";
import Footer from "../components/footer";

export default class extends React.Component {
  renderHead() {
    return (
      <Head>
        <title>
          {this.props.title || "Not Found"} - {this.props.layout.data.site_name}
        </title>
        <meta
          name="description"
          content={this.props.description || config.meta.description}
        />
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="theme-color" content={config.meta.theme_colour} />
        <meta name="author" content="Dan" />
        <link href="/_next/static/style.css" rel="stylesheet" />
        <script src='https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.23.0/polyfill.min.js' />
      </Head>
    );
  }
  render() {
    return (
      <React.Fragment>
        {this.renderHead()}
        <HeaderNav {...this.props} />
        <main className={this.props.mainClass}>{this.props.children}</main>
        <Footer {...this.props} />
      </React.Fragment>
    );
  }
}
