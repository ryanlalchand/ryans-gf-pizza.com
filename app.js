//handles requests
const { request } = require("express");
var express = require("express");
var app = express();

// Load handlebars middleware
const expressHandlebars = require("express-handlebars");

// Tell handlebars to use main as template
app.engine(
  "handlebars",
  expressHandlebars({
    defaultLayout: "main",
  })
);

// Tell express to use handlebars as its view engine when output rendered
app.set("view engine", "handlebars");

// Tell handlebars static content in views subdirectory
app.use(express.static("views"));

// Get the session handling middleware for express
const expressSession = require("express-session");

// Set its properties
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: "0034fu0qwe9845paenu334yU", // Secret key to sign session ID
    cookie: { maxAge: 600000 }, // Session exprires in 600,000 ms (10 minutes)
  })
);

// Front page when enter site
app.get("/", (request, response) => {
  response.render("home.handlebars");
});

//loads Order instance
const Order = require("./order.js");

// Page to display the order
app.get("/Order", (request, response, next) => {
  response.render("order.handlebars");
});

//initialize pizza order
app.use("/AddToCart", Order.newPizza);

app.get("/AddToCart", (request, response, next) => {
  response.render("cart.handlebars", { pizzas: request.session.pizzas });
});

app.get("/ViewCart", (request, response, next) => {
  response.render("cart.handlebars", { pizzas: request.session.pizzas });
});

app.get("/getDelivery", (request, response, next) => {
  response.render("delivery.handlebars");
});

//initialize delivery order
app.use("/PlaceOrder", Order.getDelivery);

app.get("/PlaceOrder", (request, response, next) => {
  if (request.session.deliveryErrors.error) {
    response.render("delivery.handlebars", {
      deliveryErrors: request.session.deliveryErrors,
      deliveryInfo: request.session.deliveryInfo,
    });
    //if there are errors, render the delivery page with the errors
  } else {
    next();
  }
});

app.get("/PlaceOrder", (request, response, next) => {
  if(request.query.delivery){
    request.session.totalPrice += 5;
  }

  response.render("summary.handlebars", {
    deliveryInfo: request.session.deliveryInfo,
    pizzas: request.session.pizzas,
    totalPrice: request.session.totalPrice,
    delivery: request.query.delivery,
  });
});

// Default handler if request URL does not match the above
app.use((request, response) => {
  response.status(404);
  response.send("404 Page Not Found");
});

// Default handler for runtime errors
app.use((err, request, response, next) => {
  console.log(err.message);
  response.status(500);
  response.send("500 Server Error");
});

app.listen(8085);
console.log("Go to http://localhost:8085/");
