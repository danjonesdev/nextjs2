import React from 'react';
import { RichText } from 'prismic-reactjs';
import ProgressiveImage from 'react-progressive-image';
import { linkResolver } from '../prismic';

export default class extends React.Component {
  renderArticle() {
    const { article } = this.props;

    const titleVal = article.data.title || '';
    const descriptionVal = article.data.description || '';
    const imageVal = (article.data.main_image) ? article.data.main_image.url : '';
    const placeholderImageVal = (article.data.main_image && article.data.main_image.placeholder)
      ? article.data.main_image.placeholder.url
      : imageVal;
    const pubDate = (article.first_publication_date) ? article.first_publication_date : '';

    return (
      <article className="article">
        <figure className="article__figure">
          <ProgressiveImage src={imageVal} placeholder={placeholderImageVal}>
            {(src, loading) => (
              <img className={`article__img ${loading ? 'article__img--loading' : ''}`} src={src} alt={titleVal} />
            )}
          </ProgressiveImage>
        </figure>

        <time className="article__date">{pubDate}</time>
        <h1 className="article__title">{titleVal}</h1>
        <p className="article__description">{descriptionVal}</p>

        <section className="article__rich-text">
          {RichText.render(article.data.article, linkResolver)}
        </section>
      </article>
    );
  }

  render() {
    return this.renderArticle();
  }
}
