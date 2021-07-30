function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'http') {
        return res.redirect('http://' + req.get('host') + req.url);
    }
    next();
}
const express = require('express');
const app = express();
//app.use(requireHTTPS);

app.use(express.static('./dist/htlw'));

app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: 'dist/htlw/'}
);
});

app.listen(process.env.PORT || 8080);
