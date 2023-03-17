const express = require("express");

const router = express.Router();

//Ruta para loguear al usuario
router.post("/login" , ( req , res ) => {
    const { name , lastname , email , instagram , address , age  } = req.body;
    if (name && lastname && email && instagram && address && age ) { 
        //Creo la sesion
        req.session.username= name;
        req.session.lastname= lastname;
        req.session.email= email;
        req.session.instagram= instagram;
        req.session.address= address;
        req.session.age= age;
        res.redirect("/");
    }else{
        res.render("login" , { error: "Por favor ingresa los campos para poder ingresar"})
    }
})


router.get("/logout" , ( req , res ) => {
    req.session.destroy((error) => {
        if (error) {
            console.log(error);
            res.redirect("/")
        } else {
            res.render("logout")
        }
    })
})

module.exports = { AuthRouter: router }