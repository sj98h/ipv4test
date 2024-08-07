import axios from 'axios'
var express = require('express');
var nunjucks = require('nunjucks');
var axios = require('axios');
var app = express();
var client_id = '7o0NAUXXbSqkZuofNVB2';
var client_secret = '7o0NAUXXbSqkZuofNVB2';
// replace client id and secret with your owns

app.set('view engine', 'html');

nunjucks.configure('views', {
    express: app,
    watch: true,
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('main');
});

app.post('/search', async (req, res) => {
    query = req.body.query;
    // get query input

    var api_url = 'https://openapi.naver.com/v1/search/blog?query=' + encodeURI(query);
    var options = {
        headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret }
    }; // headers for get request
    await axios.get(api_url, options)
        .then((response) => {
            if (response.status === 200) {
                items = response.data.items;
                items.map((x) => {
                    x.title = x.title.replace(/<b>/g, '');
                    x.title = x.title.replace(/<\/b>/g, '');
                    x.description = x.description.replace(/<b>/g, '');
                    x.description = x.description.replace(/<\/b>/g, '');
                }); // remove html tags in query result

                res.render('result', { items: items });
            }
        })
        .catch((err) => {
            console.error(err);
        });
});