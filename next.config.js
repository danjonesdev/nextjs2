const { PHASE_PRODUCTION_SERVER } = process.env.NODE_ENV === 'development'
  ? {}
  : !process.env.NOW_REGION
    ? require('next/constants')
    : require('next-server/constants');

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_PRODUCTION_SERVER) {
    // Config used to run in production.
    return {};
  }

  const withSass = require('@zeit/next-sass');

  return withSass({
    webpack(config, { dev, isServer }) {
      if (dev) {
        config.module.rules.push({
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          options: {
            // eslint options (if necessary)
          },
        });
      }
      return config;
    },
  });
};
