import React from "react";
import { Link } from "../routes";

import NotFound from "./notfound";
import { Client, Prismic, linkResolver } from "../components/prismic";
import { RichText } from "prismic-reactjs";
import { TextBlock } from "../components/slices";
import Layout from "./layout";

export default class extends React.Component {
  static async getInitialProps({ req, query }) {
    try {
      const posts = await Client(req).query(
        Prismic.Predicates.at("document.type", "blog_post"),
        { pageSize: 50 }
      );
      return { posts };
    } catch (error) {
      return { error: true };
    }
  }

  renderPosts() {
    return this.props.posts.results.map((post, index) => {
      console.log(linkResolver(post));
      const res = (() => {
        return (
          <article key={index} className="homepage-slice-wrapper">
            <p>{post.data.title}</p>
            <Link to={linkResolver(post)}>
              <a className="a-button">Read post</a>
            </Link>
          </article>
        );
      })();
      return res;
    });
  }

  renderBody() {
    return (
      <Layout
        title="{this.props.home.data.meta_title}"
        description="{this.props.home.data.meta_description}"
        layout={this.props.layout}
      >
        <div>{this.renderPosts()}</div>
      </Layout>
    );
  }

  render() {
    if (this.props.error)
      return (
        <Layout layout={this.props.layout}>
          <NotFound />
        </Layout>
      );
    else return this.renderBody();
  }
}
