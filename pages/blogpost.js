import React from "react";
import NotFound from "./notfound";
import { Client, linkResolver } from "../components/prismic";
import { RichText } from "prismic-reactjs";
import { TextBlock } from "../components/slices";
import Layout from "./layout";

export default class extends React.Component {
  static async getInitialProps({ req, query }) {
    try {
      const post = await Client(req).getByUID("blog_post", query.uid);
      return { post };
    } catch (error) {
      return { error: true };
    }
  }

  renderBody() {
    const { post } = this.props;

    return (
      <Layout
        title={post.data.title}
        description={post.data.description}
        layout={this.props.layout}
        mainClass="container-small  mla  mra"
      >
        <article className="article">
          <h1 className="article__title">{post.data.title}</h1>
          <p className="article__description">{post.data.description}</p>

          <section className="article__rich-text">
            {RichText.render(post.data.article, linkResolver)}
          </section>
        </article>
      </Layout>
    );
  }

  render() {
    if (this.props.error)
      return (
        <Layout layout={this.props.layout} mainClass="container  mla  mra">
          <NotFound />
        </Layout>
      );
    else return this.renderBody();
  }
}
