const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    blockList: [
      /node_modules[\\/]react-native-reanimated[\\/]android[\\/]\.cxx[\\/].*/,
      /node_modules[\\/]react-native-worklets[\\/]android[\\/]\.cxx[\\/].*/,
      /android[\/\\]app[\/\\]\.cxx[\/\\].*/,
      /android[\/\\]\.gradle[\/\\].*/,
      /android[\/\\]app[\/\\]build[\/\\].*/,
      /android[\\/]\.cxx[\\/].*/,
      /android[\\/]app[\\/]\.cxx[\\/].*/,
    ],
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
};

module.exports = mergeConfig(defaultConfig, config);
