import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '../routes';

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null; // eslint-disable-line
    return { statusCode };
  }

  render404 = () => (
    <section className="container">
      <h1>Oh no!</h1>
      <h3>We cant seem to find the page youre looking for.</h3>
      <h3><Link route="/"><a>Back to the homepage</a></Link></h3>
    </section>
  )

  render500 = () => (
    <section className="container">
      <h1>Oh no!</h1>
      <h3>Something went wrong. Please contact the support.</h3>
    </section>
  )

  renderDefault() {
    const { statusCode } = this.props;

    return (
      <p>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : 'An error occurred on client'}
      </p>
    );
  }

  render() {
    const { statusCode } = this.props;

    if (statusCode === 404) return this.render404();
    if (statusCode >= 500 && statusCode <= 599) return this.render500();
    return this.renderDefault();
  }
}

Error.propTypes = {
  statusCode: PropTypes.number.isRequired,
};
