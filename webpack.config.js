const Encore = require('@symfony/webpack-encore');
const path = require("path");

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    .setOutputPath('public/build/unauthenticated')
    .setPublicPath('/build/unauthenticated')
    .addEntry('unauthenticated', './assets/unauthenticated.tsx')

    .splitEntryChunks()
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

const unauthenticatedConfig = Encore.getWebpackConfig();

// Encore.reset();
//
// Encore
//
//     .setOutputPath('public/build/unauthenticated')
//     .setPublicPath('/build/unauthenticated')
//     .addEntry('admin', './assets/unauthenticated.tsx')
//
//     // .splitEntryChunks()
//     .enableSingleRuntimeChunk()
//
//     .cleanupOutputBeforeBuild()
//     .enableBuildNotifications()
//     .enableSourceMaps(!Encore.isProduction())
//     .enableVersioning(Encore.isProduction())
//
//     .enablePostCssLoader()
//
//     .configureBabelPresetEnv((config) => {
//         config.useBuiltIns = 'usage';
//         config.corejs = 3;
//     })
//
//     .enableTypeScriptLoader()
//     .enableReactPreset()
//     .enableSassLoader()
//
//     .addAliases({
//         '@': path.resolve(__dirname, 'assets'),
//     })
//
//     .configureWatchOptions((watchOptions) => {
//         watchOptions.ignored = /node_modules|public\/build/; // Ignore these directories
//     })
// ;
// const adminConfig = Encore.getWebpackConfig();

module.exports = [
    unauthenticatedConfig,
    // adminConfig
];
