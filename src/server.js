const express = require("express");

//Routers

const { viewsRouter } = require("./routes/viewsRouter");
const { productsRouter } = require("./routes/products");
const { AuthRouter } = require("./routes/authRouter");

//Servicios

const { options } = require("./config/databaseConfig");

//Conexiones para sessions

const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");

//Server

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static( __dirname + "/public"));

//Motor de plantillas

const handlebars = require("express-handlebars");

//Configuracion de motor de plantilla

app.engine("handlebars" , handlebars.engine() );
app.set( "views" , __dirname+"/views");
app.set("view engine" , "handlebars");

//Configuro la session

app.use(cookieParser());
app.use(session({
    store: MongoStore.create({
        mongoUrl: options.mongoDB.mongoUrlSessions,
        ttl:600
    }),
    secret: "claveSecreta",
    resave: false,
    saveUninitialized: false
}))

//Routes

//Views Routes
app.use(viewsRouter);
app.use("/api/productos" , productsRouter );
app.use("/api/auth" , AuthRouter );

//Express Server

const PORT = 8080;

const server = app.listen( PORT , () => {
    console.log(`Listening app on port ${PORT}`);
})