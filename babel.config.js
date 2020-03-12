module.exports = {
  presets: [
    [
      "@babel/env",
      {
        spec: true,
        useBuiltIns: false
      }
    ],
    "@babel/preset-typescript"
  ],
  plugins: [
    [
      "@babel/plugin-transform-react-jsx",
      {
        pragma: "Nerv.createElement"
      }
    ],
  ]
};
