const express = require('express');
const client = require('./connection');
const routers = express.Router();
const multer = require('multer');
const app = express();

// raw json from postman
app.use(express.json());
// Form form-urlencoded from postman
app.use(express.urlencoded());

// API List Product -> http://localhost:3000/api/products => method GET
routers.get('/products', async(req, res) => {
    if(client.isConnected()){
        const db = client.db('belajar_mongo')
        const products = await db.collection('products').find().toArray()
        if(products.length > 0){
            res.send({
                status: 'success',
                message: 'List Products Berhasil ditampilkan',
                data: products
            })
        }else{
            res.send({
                status: 'success',
                message: 'List Products Kosong',
                data: products
            })
        }
    }else{
        res.send({
            status: 'error',
            message: 'Koneksi database gagal'
        })
    }
})

routers.get('/quotes', async(req, res) => {
    if(client.isConnected()){
        const db = client.db('belajar_mongo')
        const quotes = await db.collection('quotes').find().toArray()
        if(quotes.length > 0){
            res.send({
                status: 'success',
                message: 'List Quotes Berhasil ditampilkan',
                data: quotes
            })
        }else{
            res.send({
                status: 'success',
                message: 'List Products Kosong',
                data: quotes
            })
        }
    }else{
        res.send({
            status: 'error',
            message: 'Koneksi database gagal'
        })
    }
})

const ObjectId = require('mongodb').ObjectId

//words
routers.get('/quotes2/:word', async(req, res) => {
  if(client.isConnected()){
      const db = client.db('belajar_mongo')
      const product = await db.collection('quotes').findOne({
          word: req.params.word
      }, {word:1})
      
      res.send({
          status: 'success',
          message: 'Single Quotes',
          data: product
      })
  }else{
      res.send({
          status: 'error',
          message: 'Koneksi database gagal'
      })
  }
})

routers.get('/product/:id', async(req, res) => {
    if(client.isConnected()){
        const db = client.db('belajar_mongo')
        const product = await db.collection('products').findOne({
            _id: ObjectId(req.params.id)
        })
        
        res.send({
            status: 'success',
            message: 'Single product',
            data: product
        })
    }else{
        res.send({
            status: 'error',
            message: 'Koneksi database gagal'
        })
    }
})

routers.get('/quotes/:id', async(req, res) => {
    if(client.isConnected()){
        const db = client.db('belajar_mongo')
        const quotes = await db.collection('quotes').findOne({
            _id: ObjectId(req.params.id)
        })
        console.log(quotes);
        res.send({
            status: 'success',
            message: 'Single quotes',
            data: quotes
        })
    }else{
        res.send({
            status: 'error',
            message: 'Koneksi database gagal'
        })
    }
})

// Jika menggunakan form-urlencoded
// routers.post('/products', async(req, res) => {

// Jika menggunakan form-data
routers.post('/products', multer().none(), async(req, res) => {
    if(client.isConnected()){
        const { name, price, stock, status } = req.body;
        const db = client.db('belajar_mongo');

        const result = await db.collection('products').insertOne({
            name: name,
            price: price,
            stock: stock,
            status: status
        })

        if(result.insertedCount == 1){
            res.send({
                status: 'success',
                message: 'Tambah product success'
            })
        }else{
            res.send({
                status: 'warning',
                message: 'Tambah product gagal'
            })
        }
    }else{
        res.send({
            status: 'error',
            message: 'Koneksi database gagal'
        });
    }
});

routers.put('/product/:id', multer().none(), async(req, res) => {
    if(client.isConnected()){
        const { name, price, stock, status } = req.body;
        const db = client.db('belajar_mongo');
        const result = await db.collection('products').updateOne(
            {_id: ObjectId(req.params.id)},
            {
                $set: {
                    name: name,
                    price: price,
                    stock: stock,
                    status: status
                }
            }
        )

        if(result.matchedCount == 1){
            res.send({
                status: 'success',
                message: 'Update product success'
            })
        }else{
            res.send({
                status: 'warning',
                message: 'Update product gagal'
            })
        }
    }else{
        res.send({
            status: 'error',
            message: 'Koneksi database gagal'
        })
    }
})

routers.delete('/product/:id', async(req, res) => {
    if(client.isConnected()){
        const db = client.db('belajar_mongo');
        const result = await db.collection('products').deleteOne(
            { _id: ObjectId(req.params.id) }
        )

        if(result.deletedCount == 1){
            res.send({
                status: 'success',
                message: 'Delete product success',
            })
        }else{
            res.send({
                status: 'warning',
                message: 'Delete product gagal',
            })
        }
    }else{
        res.send({
            status: 'error',
            message: 'Koneksi database gagal'
        })
    }
})
// done
routers.put('/quotes/:id', multer().none(), async(req, res) => {
  if(client.isConnected()){
      const { word } = req.body;
      const db = client.db('belajar_mongo');
      const result = await db.collection('quotes').updateOne(
          {_id: ObjectId(req.params.id)},
          {
              $set: {
                  word: word
              }
          }
      )

      if(result.matchedCount == 1){
          res.send({
              status: 'success',
              message: 'Update quotes success'
          })
      }else{
          res.send({
              status: 'warning',
              message: 'Update quotes gagal'
          })
      }
  }else{
      res.send({
          status: 'error',
          message: 'Koneksi database gagal'
      })
  }
})


module.exports = routers