// apps/mobile/babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',        //  preset padrão do Expo
      '@babel/preset-typescript'  // suporte a TS/TSX
    ],
    plugins: [
      '@babel/plugin-transform-arrow-functions'
    ]
  };
};
