const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const nodeEnv = process.env.NODE_ENV;
const dev = nodeEnv !== 'production';

const config = {
  webpack: (config, { webpack }) => {
    config.devtool = dev ? 'eval-source-map' : false;
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: true,
            svgo: true,
          },
        },
      ],
    });
    config.plugins.push(
      new webpack.ProvidePlugin({
        cn: 'classnames',
      })
    );
    return config;
  },
  sassOptions: {
    prependData: '@import "/src/assets/styles/services";',
  },
  images: {
    domains: [],
  },
  publicRuntimeConfig: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  },
  swcMinify: true,
  crossOrigin: 'anonymous',
};

module.exports = config;
