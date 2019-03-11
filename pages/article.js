import React from 'react';
import ProgressiveImage from 'react-progressive-image';
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

    const titleVal = article.data.title || '';
    const descriptionVal = article.data.description || '';
    const imageVal = (article.data.main_image) ? article.data.main_image.url : '';
    const placeholderImageVal = (article.data.main_image && article.data.main_image.placeholder)
      ? article.data.main_image.placeholder.url
      : imageVal;

    return (
      <Layout
        title={titleVal}
        description={descriptionVal}
        layout={layout}
        article={article}
        mainClass="container-small  mla  mra  pv5"
      >
        <article className="article  transition-elem-common">
          <figure className="article__figure  mb4">
            <ProgressiveImage src={imageVal} placeholder={placeholderImageVal}>
              {(src, loading) => (
                <img className={`article__img ${loading ? 'article__img--loading' : ''}`} src={src} alt={titleVal} />
              )}
            </ProgressiveImage>
          </figure>

          <time className="article__date  db  mb2">{article.first_publication_date}</time>
          <h1 className="article__title  mb3">{titleVal}</h1>
          <p className="article__description  mb3">{descriptionVal}</p>

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
