var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/product_manager');
app.use(express.static(__dirname + '/public/dist'));
app.use(bodyParser.json());

var productSchema = new mongoose.Schema({
    title : {type: String, required: true, minlength: 4},
    price : {type: String, required : true},
    imageURL : {type: String}
});

var Product = mongoose.model('Product', productSchema);

app.get('/api/products', (req, res) => {
    Product.find({}, (err, data) => {
        if(err) {
            res.json({error: err});
        } else {
            res.json({data: data});
        }
    });
});

app.get('/api/product/:id', (req, res) => {
    Product.findById(req.params.id, (err, data) => {
        if(err) {
            res.json({error: err});
        } else {
            res.json({data: data});
        }
    });
});

app.post('/api/newProduct', (req, res) => {
    Product.create(req.body, (err) => {
        if(err) {
            res.json({error: err});
        } else {
            res.json({message: 'success'});
        }
    });
});

app.put('/api/product/:id', (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body, (err) => {
        if(err) {
            res.json({error: err});
        } else {
            res.json({message: 'success'});
        }
    });
});

app.delete('/api/product/:id/delete', (req, res) => {
    Product.findByIdAndRemove(req.params.id, req.body, (err) => {
        if(err) {
            res.json({error: err});
        } else {
            res.json({message: 'success'});
        }
    });
});

app.all('*', (req, res) => {
    res.sendFile(path.resolve('./public/dist/index.html'));
});

app.listen(8000, () => {
    console.log('Server listening on port 8000');
});
