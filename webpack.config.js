const Encore = require('@symfony/webpack-encore');
const path = require("path");

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    .setOutputPath('public/build')
    .setPublicPath('/build')
    .addEntry('landing', './assets/landing.tsx')
    .addEntry('admin', './assets/admin.tsx')

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
        watchOptions.ignored = /node_modules|public\/build|src|var|vendor/; // Ignore these directories
    })

const landingConfig = Encore.getWebpackConfig();

module.exports = [
    landingConfig,
];
