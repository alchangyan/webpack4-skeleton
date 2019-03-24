# webpack4-skeleton

### Best skeleton ever &lt;3

####  npm scripts

- `build:app:dev` - build **app** files for **development**
- `build:app:prod` - build **app** files for **production**
- `build:server:prod` - build **server** files for **development**
- `build:server:dev` - build **server** files for **production**
- `start` - start **server**
- `build` - build **project** and **server** files for **development**,
- `dev` - build **app** and **server** for **development** and start **server**
- `kill-server` - kill **server** (4000 port is hard coded)


### Notes

- After production build server runs on 8080 because .env file doesn't included in build.


### Build sizes

**dev: 1.1 MB**

**prod: 137 KB**
+ BabelMinifyWebpackPlugin: **136 KB**
+ MiniCssExtractPlugin plugin: **134 KB**
+ HtmlWebpackPlugin -> minify: **78 KB**
