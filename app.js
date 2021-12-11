//handles requests
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

//loads Pizza instance
const Pizza = require("./Pizza.js");

// Front page when enter site
app.get("/", (request, response) => {
  response.render("home.handlebars");
});

// Page to display the order
app.get("/Order", (request, response, next) => {
  response.render("order.handlebars");
});

// Step 2: Parse input for order
app.get("/PlaceOrder", (request, response, next) => {

  next();
});

// Step 3: Check guess
app.use("/MakeGuess", Game.checkGuess);

// Step 4: Determine if game is over or not
app.get("/MakeGuess", (request, response, next) => {
  //console.log(request.guess, request.session.correct);

  //if guess is correct, game over
  //if not, send to next guess

  //YES I WAS TRYING TO EVALUATE GAME.ISCORRECT THE WHOLE TIME
  if (request.session.isCorrect) {
    response.render("GameOver.handlebars", {
      guesses: request.session.guesses,
    });
  } else {
    response.render("NextGuess.handlebars", {
      tooHigh: request.session.tooHigh,
    });
  }
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
