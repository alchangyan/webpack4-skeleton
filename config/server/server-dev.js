import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import open from 'open';
import config from '../webpack/development.js'
import { pages }from '../pages';

const app = express();
const HTML_FILE = path.join(__dirname, 'index.html');
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  logLevel: 'silent',
  reporter: () => {}
}));

app.use(webpackHotMiddleware(compiler, {
  log: false,
}));

app.get('*', (req, res, next) => {
  let page = req.path.slice(1);

  if (!pages[page]) {
    // here we can set our error page name/key (now it's main page)
    page = 'main';
  }
  
  res.sendFile(path.join(__dirname, `${page}.html`));
  // compiler.outputFileSystem.readFile(
  //   path.join(__dirname, `${req.path.slice(1)}.html`),
  //   (err, result) => {
  //     if (err) {
  //       return next(err)
  //     }
  //     res.set('content-type', 'text/html')
  //     res.send(result)
  //     res.end()
  //   }
  // )
});

app.use((err, req, res, next) => {
  // console.log(path.join(__dirname, `${req.path.slice(1)}.html`))
  /* 
    -- error handler --
    steps:

    - create error page
    - separate page to two chanks
    - first one is content before body and second one after it
    - create function that generates error message with appropriate styles
    - insert between error page chunks and send for view
  */
  
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.clear();
  console.log(`App listening to ${PORT}`);
  console.log('Press Ctrl+C to quit.');
  // opens the url in the default browser 
})

open(`http://localhost:${PORT}`);
