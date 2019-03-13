import React from 'react';
import NotFound from './notfound';
import Layout from './layout';
import { Client, Prismic } from '../components/prismic';
import FeaturedArticles from '../components/articles/featured';

export default class extends React.Component {
  static async getInitialProps({ req }) {
    try {
      const articles = await Client(req).query(Prismic.Predicates.at('document.type', 'article'), {
        pageSize: 30,
      });

      // Prismic.Predicates.at("my.article.category_link", query.uid)

      return { articles: articles.results };
    } catch (error) {
      return { error: true };
    }
  }

  renderBody() {
    const { layout, articles } = this.props;

    return (
      <Layout
        title="Home"
        description={layout.data.site_description}
        layout={layout}
        mainClass="container-medium  mla  mra  pv5"
      >
        <section className="transition-elem-common">
          <h1 className="font--primary  f3  bold  mb3">Welcome to the Zero Grav Boilerplate</h1>
          <p className="font--secondary  f4  mb3">Features include:</p>
          <ul className="font--secondary  f5  mb4  pb4  bb">
            <li className="pb2">Next.js SSR configuration</li>
            <li className="pb2">Prismic CMS integration with link handlers</li>
            <li className="pb2">SASS & PostCSS with Utliity based classes</li>
            <li className="pb2">Next page transitions</li>
            <li className="pb2">Progressive image loading</li>
          </ul>
          <div className="snipcart-summary">
            Number of items: <span className="snipcart-total-items" />
            Total price: <span className="snipcart-total-price" />
          </div>


          <a href="/" className="snipcart-checkout">Click here to checkout</a>

          <button
            type="button"
            className="snipcart-add-item"
            data-item-id="2"
            data-item-name="Bacon"
            data-item-price="3.00"
            data-item-weight="20"
            data-item-url="http://myapp.com/products/bacon"
            data-item-description="Some fresh bacon"
          >
            Buy bacon
          </button>

          <FeaturedArticles articles={articles} />
        </section>
      </Layout>
    );
  }

  render() {
    const { error } = this.props;

    if (error) return <NotFound />;
    return this.renderBody();
  }
}
