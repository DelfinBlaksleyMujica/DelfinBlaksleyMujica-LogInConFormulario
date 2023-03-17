//Middleware para cuando se haga una solicitud verificar si el usuario tiene una sesion
//activa, si tiene la session activa lo voy a dejar pasar para que complete la solicitud 
//sino le voy a retornar el mensaje

const checkLogged = ( req , res , next ) => {
    //Si el usuario tiene sesion activa
    if (req.session.username) {
        next();
    } else {
        res.redirect("/login");
    }
}


//Middleware para que si el usuario ya esta logueado, es decir si ya tiene una sesion activa no voy a dejarlo entrar 
//a la seccion de iniciar sesion, pero va a poder moverse por todas las otras secciones por el middleware de arriba
//Si el usuario esta logueado lo redirije al home y si no esta logueado le permite seguir en la seccion de login 
//para loguearse

const userNotLogged = ( req , res , next ) => {
    //Si el usuario tiene sesion activa
    if (req.session.username) {
        res.redirect("/")
    } else {
        next();
    }
}

module.exports = { checkLogged , userNotLogged }