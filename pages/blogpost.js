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
    return (
      <Layout
        title={this.props.post.data.title}
        description={this.props.post.data.description}
        layout={this.props.layout}
        mainClass="container  mla  mra"
      >
        <div>
          <h1>{this.props.post.data.title}</h1>
          <p>{this.props.post.data.description}</p>
        </div>
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
