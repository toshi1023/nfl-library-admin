/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
  reactStrictMode: true,
  // 変数用のscssファイルをグローバルに読み込み(importして使用する必要がなくなる)
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "./styles/_variables.scss";`
  }
}

module.exports = nextConfig
