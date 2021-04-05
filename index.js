const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(express.urlencoded({extended:false}));

app.use(cors())

// Middleware menangani error 404
app.use((req, res, next) => {
    res.status(404).send('RESOURCE TIDAK DITEMUKAN');
});

// Middleware menangani error 500
const errorHandling = (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('TERJADI KESALAHAN / INTERNAL SERVER ERROR')
}

app.use(errorHandling)

app.listen(port, () => console.log(`Server runnin at http://localhost:${port}`))