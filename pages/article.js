import React from 'react';
import NotFound from './notfound';
import { Client } from '../components/prismic';
import Layout from './layout';
import Article from '../components/article';

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

    return (
      <Layout
        title={titleVal}
        description={descriptionVal}
        layout={layout}
        article={article}
        mainClass="container-small  mla  mra  pv5"
      >
        <Article article={article} />
      </Layout>
    );
  }

  render() {
    const { error } = this.props;

    if (error) return <NotFound />;
    return this.renderBody();
  }
}
