import React from 'react';
import { Link } from '../routes';
import Layout from './layout';

export default class extends React.Component {
  render() {
    const { layout } = this.props;
    const msg = 'Page not found';

    return (
      <Layout layout={layout} mainClass="container  mla  mra">
        <div className="l-wrapper">
          <hr className="separator-hr" />
        </div>
        <div className="l-wrapper">
          <div className="not-found">
            {msg}
            <br />
            <Link to="/">
              <a>Go Back to the homepage</a>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
}
