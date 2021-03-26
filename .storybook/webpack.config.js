const path = require('path');

module.exports = ({ config }) => {
    config.resolve.extensions = ['.ts', '.tsx', '.mdx', '.js', '.jsx', '.css', '.scss'];

    const assetRule = config.module.rules.find(({ test }) => test.test('.svg'));

    const assetLoader = {
        loader: assetRule.loader,
        options: assetRule.options || assetRule.query,
    };

    config.module.rules.unshift({
        test: /\.svg$/,
        use: ['@svgr/webpack', assetLoader],
    });

    config.resolve.alias = {
        '@forms': path.join(__dirname, '../', 'src', 'forms'),
        '@icon': path.join(__dirname, '../', 'src', 'icons'),
        '@layouts': path.join(__dirname, '../', 'src', 'layouts'),
        '@components': path.join(__dirname, '../', 'src', 'components'),
        '@utils': path.join(__dirname, '../', 'src', 'utils'),
        '@lib': path.join(__dirname, '../', 'lib'),
    };

    return config;
};
