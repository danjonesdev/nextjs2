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

      const posts = await Client(req).query(Prismic.Predicates.at('document.type', 'article'), {
        pageSize: 30,
      });

      // Prismic.Predicates.at("my.article.category_link", query.uid)

      return { category: category.results[0], posts: posts.results };
    } catch (error) {
      return { error: true };
    }
  }

  renderPosts() {
    const { posts } = this.props;

    return posts.map((post) => {
      const titleVal = post.data.title || '';
      const descriptionVal = post.data.description || '';
      const imageVal = (post.data.main_image) ? post.data.main_image.url : '';
      const placeholderImageVal = (post.data.main_image && post.data.main_image.placeholder)
        ? post.data.main_image.placeholder.url
        : imageVal;

      const res = (() => (
        <article className="card  card--article  col-8  ph3">
          <figure className="card__figure  mb3">
            <Link to={linkResolver(post)}>
              <ProgressiveImage src={imageVal} placeholder={placeholderImageVal}>
                {(src, loading) => (
                  <img className={`card__image  w-100  ${loading ? 'card__image--loading' : ''}`} src={src} alt={titleVal} />
                )}
              </ProgressiveImage>
            </Link>
          </figure>

          <div className="ph2  h4">
            <Link to={linkResolver(post)}>
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
        <div className="flex  flex-wrap">{this.renderPosts()}</div>
      </Layout>
    );
  }

  render() {
    const { error } = this.props;

    if (error) return <NotFound />;
    return this.renderBody();
  }
}
