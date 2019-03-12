import React from 'react';
import ProgressiveImage from 'react-progressive-image';
import { Link } from '../../../routes';
import { linkResolver } from '../../prismic';

export default class extends React.Component {
  renderArticles() {
    const { articles } = this.props;

    return articles.map((article) => {
      const titleVal = article.data.title || '';
      const descriptionVal = article.data.description || '';
      const imageVal = (article.data.main_image) ? article.data.main_image.url : '';
      const placeholderImageVal = (article.data.main_image && article.data.main_image.placeholder)
        ? article.data.main_image.placeholder.url
        : imageVal;

      const res = (() => (
        <article className="card  card--article  col-6  ph3">
          <figure className="card__figure  mb3">
            <Link to={linkResolver(article)}>
              <a>
                <ProgressiveImage src={imageVal} placeholder={placeholderImageVal}>
                  {(src, loading) => (
                    <img className={`card__image  w-100  ${loading ? 'card__image--loading' : ''}`} src={src} alt={titleVal} />
                  )}
                </ProgressiveImage>
              </a>
            </Link>
          </figure>

          <div className="ph2  h4">
            <Link to={linkResolver(article)}>
              <a className="card__title  f5  mb2  black  link">{titleVal}</a>
            </Link>
            <p className="card__description  f6">{descriptionVal}</p>
          </div>
        </article>
      ))();
      return res;
    });
  }

  render() {
    return <div className="flex  flex-wrap">{this.renderArticles()}</div>;
  }
}
