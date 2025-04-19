const Encore = require('@symfony/webpack-encore');
const path = require("path");

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    .setOutputPath('public/build/index')
    .setPublicPath('/build/index')
    .addEntry('index', './assets/index.tsx')

    // .splitEntryChunks()
    .enableSingleRuntimeChunk()

    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())

    .enablePostCssLoader()

    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = 3;
    })

    .enableTypeScriptLoader()
    .enableReactPreset()
    .enableSassLoader()

    .addAliases({
        '@': path.resolve(__dirname, 'assets'),
    })

    .configureWatchOptions((watchOptions) => {
        watchOptions.ignored = /node_modules|public\/build/; // Ignore these directories
    })

const indexConfig = Encore.getWebpackConfig();
indexConfig.name = 'index';

// Encore.reset();
//
// Encore
//     .setOutputPath('public/build/admin')
//     .setPublicPath('/build/admin')
//     .addEntry('admin', './assets/admin/index.tsx')
//
//     .splitEntryChunks()
//     .enableSingleRuntimeChunk()
//
//     .cleanupOutputBeforeBuild()
//     .enableBuildNotifications()
//     .enableSourceMaps(!Encore.isProduction())
//     .enableVersioning(Encore.isProduction())
//
//     .configureBabelPresetEnv((config) => {
//         config.useBuiltIns = 'usage';
//         config.corejs = 3;
//     })
//
//     .enableTypeScriptLoader(function (tsConfig) {
//     })
//     .enableReactPreset()
//     .enableSassLoader()
//
//     .configureCssLoader(options => {
//         options.modules = {
//             localIdentName: '[local]'
//         }
//     })
// ;
// const adminConfig = Encore.getWebpackConfig();
// adminConfig.name = 'admin';

module.exports = [
    indexConfig,
    // adminConfig
];
