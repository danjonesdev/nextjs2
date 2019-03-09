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
      const category = await Client(req).query(
        [
          Prismic.Predicates.at("document.type", "category"),
          Prismic.Predicates.at("my.category.uid", query.uid)
        ],
        { pageSize: 1 }
      );

      const posts = await Client(req).query(
        Prismic.Predicates.at("document.type", "article"),
        { pageSize: 30 }
      );

      // Prismic.Predicates.at("my.article.category_link", query.uid)

      return { category: category.results[0], posts: posts.results };
    } catch (error) {
      return { error: true };
    }
  }

  renderPosts() {
    return this.props.posts.map((post, index) => {
      const res = (() => {
        return (
          <article key={index} className="col-8">
            <figure className="mb2  shadow2">
              <Link to={linkResolver(post)}>
                <img src={post.data.main_image.url} alt={post.data.title} />
              </Link>
            </figure>

            <div className="ph2">
              <Link to={linkResolver(post)}>
                <a className="f3  mb2  link">{post.data.title}</a>
              </Link>
              <p className="f6  mb2">Read post</p>
            </div>
          </article>
        );
      })();
      return res;
    });
  }

  renderBody() {
    const { category } = this.props;

    return (
      <Layout
        title={category.data.title}
        description={category.data.description}
        layout={this.props.layout}
        mainClass="container  mla  mra"
      >
        <div className="flex  flex-wrap">{this.renderPosts()}</div>
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
