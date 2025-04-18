const Encore = require('@symfony/webpack-encore');
const webpack = require('webpack');

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    .setOutputPath('public/build/landing')
    .setPublicPath('/build/landing')
    .addEntry('landing', './assets/landing/index.js')

    .splitEntryChunks()
    .enableSingleRuntimeChunk()

    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())

    // enables @babel/preset-env polyfills
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = 3;
    })

    .enableSassLoader()
;

const landingConfig = Encore.getWebpackConfig();
landingConfig.name = 'landing';

Encore.reset();

Encore
    .setOutputPath('public/build/admin')
    .setPublicPath('/build/admin')
    .addEntry('admin', './assets/admin/index.tsx')

    .splitEntryChunks()
    .enableSingleRuntimeChunk()

    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())

    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = 3;
    })

    .enableTypeScriptLoader(function (tsConfig) {
    })
    .enableReactPreset()
    .enableSassLoader()

    .configureCssLoader(options => {
        options.modules = {
            localIdentName: '[local]'
        }
    })
;
const adminConfig = Encore.getWebpackConfig();
adminConfig.name = 'admin';

module.exports = [landingConfig, adminConfig];
