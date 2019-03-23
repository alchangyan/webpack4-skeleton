import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import open from 'open';
import config from '../webpack/development.js'

const app = express();
const DIST_DIR = __dirname;
const HTML_FILE = path.join(DIST_DIR, 'index.html');
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  logLevel: 'silent',
  reporter: () => {}
}));

app.use(webpackHotMiddleware(compiler, {
  log: false
}));

app.get('*', (req, res, next) => {
  compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
    if (err) {
      return next(err)
    }
    res.set('content-type', 'text/html')
    res.send(result)
    res.end()
  })
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.clear();
  console.log(`App listening to ${PORT}`);
  console.log('Press Ctrl+C to quit.');
  // opens the url in the default browser 
})

open(`http://localhost:${PORT}`);
