const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const { mergeConfig } = require("metro-config");

const defaultConfig = getDefaultConfig(__dirname);
const nativeWindConfig = withNativeWind(defaultConfig, { input: "./global.css" });

module.exports = mergeConfig(defaultConfig, nativeWindConfig);