const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const config = {
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
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
