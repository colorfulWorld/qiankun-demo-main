const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

const plugins = [
  "@babel/plugin-proposal-nullish-coalescing-operator",
  "@babel/plugin-proposal-optional-chaining",
  "@babel/plugin-proposal-class-properties",
  "@babel/plugin-proposal-private-methods",
]
if (IS_PROD) {
  plugins.push('transform-remove-console')
}

// lazy load ant-design-vue
// if your use import on Demand, Use this code
plugins.push(['import', {
  'libraryName': 'ant-design-vue',
  'libraryDirectory': 'es',
  'style': 'css' // `style: true` 会加载 less 文件
}])

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    [
      '@babel/preset-env',
      {
        'useBuiltIns': 'entry',
        'corejs': 3
      }
    ]
  ],
  plugins
}
