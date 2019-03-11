import React from 'react';
import NotFound from './notfound';
import Layout from './layout';

export default class extends React.Component {
  renderBody() {
    const { layout } = this.props;

    return (
      <Layout
        title="Home"
        description={layout.data.site_description}
        layout={layout}
        mainClass="container-medium  mla  mra  pv5"
      >
        <section className="transition-elem-common">
          <img
            className="mla  mra  w-100  br4  shadow2  mb4"
            src="https://spaceholder.cc/1080x200"
            alt="space"
          />

          <h1 className="font--primary  f3  bold  mb3">Welcome to the Zero Grav Boilerplate</h1>
          <p className="font--secondary  f4  mb3">Features include:</p>
          <ul className="font--secondary  f5  mb3">
            <li className="pb2">Next.js SSR configuration.</li>
            <li className="pb2">Prismic CMS integration with link handlers.</li>
            <li className="pb2">SASS & PostCSS with Utliity based classes.</li>
            <li className="pb2">Next page transitions.</li>
            <li className="pb2">Progressive image loading.</li>
          </ul>
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
