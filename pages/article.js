import React from 'react';
import { RichText } from 'prismic-reactjs';
import NotFound from './notfound';
import { Client, linkResolver } from '../components/prismic';
import Layout from './layout';

export default class extends React.Component {
  static async getInitialProps({ req, query }) {
    try {
      const post = await Client(req).getByUID('article', query.uid);
      return { post };
    } catch (error) {
      return { error: true };
    }
  }

  renderBody() {
    const { post, layout } = this.props;

    return (
      <Layout
        title={post.data.title}
        description={post.data.description}
        layout={layout}
        mainClass="container-small  mla  mra  pv5"
      >
        <article className="article  transition-elem-common">
          <figure className="article__img  mb4" style={{ backgroundImage: `url(${post.data.main_image.url})` }} />
          <h1 className="article__title  mb3">{post.data.title}</h1>
          <p className="article__description  mb3">{post.data.description}</p>

          <section className="article__rich-text">
            {RichText.render(post.data.article, linkResolver)}
          </section>
        </article>
      </Layout>
    );
  }

  render() {
    const { layout, error } = this.props;

    if (error) {
      return (
        <Layout layout={layout} mainClass="container  mla  mra">
          <NotFound />
        </Layout>
      );
    }
    return this.renderBody();
  }
}
