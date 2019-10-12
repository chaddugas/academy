const path = require('path')

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({patterns: [path.resolve(__dirname, './src/assets/scss/*.scss')]})
}

module.exports = {
  siteName: 'Academy Park Pediatrics',
  transformers: {
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
      plugins: [
        // ...global plugins
      ]
    }
  },

  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'static/data/main-nav/**/*.md',
        typeName: 'MainNav'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'static/data/main-banner/**/*.md',
        typeName: 'MainBanner'
      }
    },
    {
      use: `gridsome-plugin-netlify-cms`,
      options: {
        publicPath: `/admin`
      }
    },
	],
	
  chainWebpack: (config) => {
    // Load variables for all vue-files
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
		
    config.module
      .rule('pug')
      .test(/\.pug$/)
      .use('pug-plain-loader')
        .loader('pug-plain-loader')
  }
}