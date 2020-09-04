module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  //指定组件用的配置
  "plugins": [
    ["import", {
      "libraryName": "vant",
      "libraryDirectory": "es",//es规范
      "style": true//可以用css
    }]
  ]

}
