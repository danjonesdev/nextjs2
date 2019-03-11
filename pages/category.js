import React from 'react';
import ProgressiveImage from 'react-progressive-image';
import { Link } from '../routes';
import NotFound from './notfound';
import { Client, Prismic, linkResolver } from '../components/prismic';
import Layout from './layout';

export default class extends React.Component {
  static async getInitialProps({ req, query }) {
    try {
      const category = await Client(req).query(
        [
          Prismic.Predicates.at('document.type', 'category'),
          Prismic.Predicates.at('my.category.uid', query.uid),
        ],
        { pageSize: 1 },
      );

      const articles = await Client(req).query(Prismic.Predicates.at('document.type', 'article'), {
        pageSize: 30,
      });

      // Prismic.Predicates.at("my.article.category_link", query.uid)

      return { category: category.results[0], articles: articles.results };
    } catch (error) {
      return { error: true };
    }
  }

  renderarticles() {
    const { articles } = this.props;

    return articles.map((article) => {
      const titleVal = article.data.title || '';
      const descriptionVal = article.data.description || '';
      const imageVal = (article.data.main_image) ? article.data.main_image.url : '';
      const placeholderImageVal = (article.data.main_image && article.data.main_image.placeholder)
        ? article.data.main_image.placeholder.url
        : imageVal;

      const res = (() => (
        <article className="card  card--article  col-8  ph3">
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

  renderBody() {
    const { layout, category } = this.props;

    return (
      <Layout
        title={category.data.title}
        description={category.data.description}
        layout={layout}
        mainClass="container-small  mla  mra  pv5"
      >
        <h1 className="f4  bold  mb4  transition-elem-common">{category.data.title}</h1>
        <div className="flex  flex-wrap">{this.renderarticles()}</div>
      </Layout>
    );
  }

  render() {
    const { error } = this.props;

    if (error) return <NotFound />;
    return this.renderBody();
  }
}
