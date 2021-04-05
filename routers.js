const express = require('express');
const client = require('./connection');
const routers = express.Router();
const app = express();

// raw json from postman
app.use(express.json());
// Form form-urlencoded from postman
app.use(express.urlencoded());

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

module.exports = routers