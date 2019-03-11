import React from 'react';
import { RichText } from 'prismic-reactjs';
import NotFound from './notfound';
import { Client, linkResolver } from '../components/prismic';
import Layout from './layout';

export default class extends React.Component {
  static async getInitialProps({ req, query }) {
    try {
      const article = await Client(req).getByUID('article', query.uid);
      return { article };
    } catch (error) {
      return { error: true };
    }
  }

  renderBody() {
    const { article, layout } = this.props;

    return (
      <Layout
        title={article.data.title}
        description={article.data.description}
        layout={layout}
        article={article}
        mainClass="container-small  mla  mra  pv5"
      >
        <article className="article  transition-elem-common">
          <figure
            className="article__img  mb4"
            style={{ backgroundImage: `url(${article.data.main_image.url})` }}
          />
          <time className="article__date  db  mb2">{article.first_publication_date}</time>
          <h1 className="article__title  mb3">{article.data.title}</h1>
          <p className="article__description  mb3">{article.data.description}</p>

          <section className="article__rich-text">
            {RichText.render(article.data.article, linkResolver)}
          </section>
        </article>
      </Layout>
    );
  }

  render() {
    const { error } = this.props;

    if (error) return <NotFound />;
    return this.renderBody();
  }
}
