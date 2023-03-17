const express = require("express");
const Contenedor = require("../containers/contenedorProductos");

const router = express.Router();

const productosApi = new Contenedor("productos.txt");

router.get("/" , async ( req , res ) => {
    const productos = await productosApi.getAll();
    res.send( productos );
});

router.get("/electronic" , ( req , res ) => {
    res.send("Productos Electronicos");
})

router.get("/:id" , async ( req, res ) => {
    const productId = req.params.id;
    const product = await productosApi.getById(parseInt(productId));
    if (product) {
        return res.send(product)
    } else{
        return res.send({ error: "Producto no encontrado"})
    }
})

router.post("/" , async ( req , res ) => {
    const newProduct = req.body;
    const result = await productosApi.save(newProduct);
    res.send(result);
})


router.put("/:id" , async ( req , res ) => {
    const cambioObj = req.body;
    const productId = req.params.id;
    const result = await productosApi.updateById(parseInt(productId) , cambioObj );
    res.send( result );
})

router.delete("/:id" , async ( req , res ) => {
    const productId = req.params.id;
    const result = await productosApi.deleteById( parseInt(productId) , cambioObj );
    res.send( result );
})


module.exports = { productsRouter: router }