const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass');
const withESLint = require('next-eslint')

module.exports = withPlugins([withSass, withESLint], {});
