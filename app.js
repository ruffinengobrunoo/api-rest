const express = require('express')
const app = express ()
const port = 4000

app.use(express.json())
app.use(express.urlencoded({extended:false})) 

app.listen (port, () => {

    console.log(`servidor corriendo en puerto ${port}`)

});

// datos array

let productos = []

// rutas

app.get('/productos', (req, res) =>{

    console.log('listado de productos')
    res.json(productos)

})

app.post('/productos', (req, res) =>{
    productos.push(req.body)
    console.log(productos.length)
    nuevoProd = {id : productos.length, ...req.body}
    // genera un id y le agrega una copia en req.body
    productos.push(nuevoProd)
    res.json({"id": nuevoProd,
              "mensaje": 'producto agregado',
              "producto": req.body})
})

app.put('/productos', (req, res) =>{

    res.send('actualizando un producto')

})

app.delete('/productos', (req, res) =>{

    res.send('eliminando un producto')

})

app.get('/productos/:id', (req, res) =>{

    console.log(req.params)
    res.send(`mostrando un producto`)

})
