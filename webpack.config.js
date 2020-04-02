const path=require('path')

module.export={
  entry:'./src/index.js',
  output:{
    filename:'bundle.[contenthash].js',
    path: path.resolve(__dirname, './dist'),
  },
  mode:'production',
  module:{
    rules:[
      {
        test: /\.txt$/,
        use: 'raw-loader'
      }
    ]
  }
}