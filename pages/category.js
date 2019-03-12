import React from 'react';
import NotFound from './notfound';
import { Client, Prismic } from '../components/prismic';
import Layout from './layout';
import CommonArticles from '../components/articles/common';

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

  renderBody() {
    const { layout, category, articles } = this.props;

    return (
      <Layout
        title={category.data.title}
        description={category.data.description}
        layout={layout}
        mainClass="container-medium  mla  mra  pv5"
      >
        <h1 className="f4  bold  mb4  transition-elem-common">{category.data.title}</h1>
        <CommonArticles articles={articles} />
      </Layout>
    );
  }

  render() {
    const { error } = this.props;

    if (error) return <NotFound />;
    return this.renderBody();
  }
}
