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

//initialize delivery order
app.use("/AddToCart", Order.getDelivery);

app.get("/Delivery", (request, response, next) => {
  response.render("delivery.handlebars");
});

app.get("/PlaceOrder", (request, response, next) => {
  if (
    request.session.errors_array.noName ||
    request.session.errors_array.noAddress ||
    request.session.errors_array.noCity ||
    request.session.errors_array.noState ||
    request.session.errors_array.noZip ||
    request.session.errors_array.noPhone ||
    request.session.errors_array.noCreditNum
  ) {
    response.render("order.handlebars", {
      errors_array: request.session.errors_array,
      deliveryInfo: request.session.deliveryInfo,
    });
    //if there are errors, render the order page with the errors
  } else {
    next();
  }
});

app.get("/PlaceOrder", (request, response, next) => {
  response.render("summary.handlebars", {
    errors_array: request.session.errors_array,
    deliveryInfo: request.session.deliveryInfo,
    pizzas: request.session.pizzas,
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
