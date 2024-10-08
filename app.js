const express = require('express')
const app = express ()
const port = 4000

// "traduce" los datos ingresados por el usuario desde el front para poder usarlos en el back
app.use(express.json())
app.use(express.urlencoded({extended:false})) 

app.listen (port, () => {

    console.log(`servidor corriendo en puerto ${port}`)

});

// datos array

let productos = []

// rutas

// pide los productos existentes
app.get('/productos', (req, res) =>{

    console.log('listado de productos')
    res.json(productos)

})
// agregar producto
app.post('/productos', (req, res) =>{
   
    console.log(productos.length)
    nuevoProd = {id : productos.length + 1, ...req.body}
    // genera un id y le agrega una copia en req.body

    productos.push(nuevoProd)
    // sube el producto 
    res.json({
              "mensaje": 'producto agregado',
              "producto": req.body})
})



// actualiza producto
app.put('/productos/:id', (req, res) =>{

    // encuentra el producto pedido por medio de un ID con parametros recorriendo el array "productos".
    const prodEncontrado = productos.find((p) => p.id==req.params.id)
    if(!prodEncontrado){
    // si no encuentra lo pedido, retorna un estado de error 404 y un mensaje
      return  res.status(404).json('no se encuentra el producto')
    }
    console.log(req.params.id)
    console.log(req.body)
    const newData=req.body;
    //recorre el array buscando el atributo pedido y suplanta el vector que cumple la condicion con nueva informacion \\ condicional ternario ? if : else (solo se puede usar en condiciones de una linea)
    productos = productos.map(p=> p.id==req.params.id ?{...p, ...newData} : p ) 
    // debe ir si o si en una sola linea, por eso el if ternario
    res.json('producto actualizado')

})


// ... significa copia

// elimina producto
app.delete('/productos/:id', (req, res) =>{
 
    const prodEncontrado = productos.find((p) => p.id==req.params.id)
    if(!prodEncontrado){
      return  res.status(404).json('no se encuentra el producto')
    }
    // lee todo el vector y crear uno nuevo sin el que dice el parametro (si pones constante se rompe qn lo diria..)
    productos = productos.filter((p)=>p.id!=req.params.id)
    console.log(productos)
    res.json('producto eliminado')

})


// mirar un solo producto
app.get('/productos/:id', (req, res) =>{

    console.log(req.params.id)
    
    
// formato largo
    // const prodEncontrado = productos.find((producto) =>{
    //     return producto.id == req.params.id
    // })

   // se eliminan las llaves y el return
   const prodEncontrado = productos.find((p) => p.id==req.params.id)
    if(!prodEncontrado){
      return  res.status(404).json('no se encuentra el producto')
    }
    res.json({
            "mensaje": "producto encontrado",
            "prod": prodEncontrado
        })
    
})

