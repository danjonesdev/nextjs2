import React from 'react';
import { Link as LinkHelper } from 'prismic-reactjs';
import { linkResolver } from './prismic';
import { Link } from '../routes';

export default (props) => {
  const { to, children } = props;
  return (
    <Link to={LinkHelper.url(to, linkResolver)}>{children}</Link>
  );
};
