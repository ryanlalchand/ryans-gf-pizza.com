module.exports = {
  newPizza(request, response, next) {
    var pizza = {
      size: request.query.size,
      sauce: request.query.sauce,
      //cheeses
      parmesan: request.query.parmesan,
      veganParmesan: request.query.veganParmesan,
      shreddedMozz: request.query.shreddedMozz,
      veganMozz: request.query.veganMozz,
      //meats
      pepperoni: request.query.pepperoni,
      sausage: request.query.sausage,
      bacon: request.query.bacon,
      salami: request.query.salami,
      //veggies
      greenPeppers: request.query.greenPeppers,
      mushrooms: request.query.mushrooms,
      onions: request.query.onions,
      olives: request.query.olives,
    };

    //if pizza array doesn't exist, add to session
    if (!request.session.pizzas) {
      request.session.pizzas = [];
    }

    //push new pizza
    request.session.pizzas.push(pizza);

    //calculate total price after adding to session
    if (!request.session.totalPrice) {
      request.session.totalPrice = 0;
    }

    if (pizza.size === "Small - $12") {
      request.session.totalPrice += 12;
    } else if (pizza.size === "Medium - $16") {
      request.session.totalPrice += 16;
    } else if (pizza.size === "Large - $20") {
      request.session.totalPrice += 20;
    }

    next();
  },

  getDelivery(request, response, next) {
    //create deliveryInfo object and add to session
    var deliveryInfo = {
      name: request.query.name,
      address: request.query.address,
      city: request.query.city,
      state: request.query.state,
      zip: request.query.zip,
      phone: request.query.phone,
      creditNum: request.query.creditNum,
    };

    request.session.deliveryInfo = deliveryInfo;

    //initialize delivery errors and set them to true if user doesn't fill out all fields
    //add to session after all logic has been completed
    var deliveryErrors = {
      noName: false,
      noAddress: false,
      noCity: false,
      noState: false,
      noZip: false,
      noPhone: false,
      noCreditNum: false,
      error: false,
    };

    if (deliveryInfo.name == "") {
      deliveryErrors.noName = true;
      deliveryErrors.error = true;
    }
    if (deliveryInfo.address == "") {
      deliveryErrors.noAddress = true;
      deliveryErrors.error = true;
    }
    if (deliveryInfo.city == "") {
      deliveryErrors.noCity = true;
      deliveryErrors.error = true;
    }
    if (deliveryInfo.state == "") {
      deliveryErrors.noState = true;
      deliveryErrors.error = true;
    }
    if (deliveryInfo.zip == "") {
      deliveryErrors.noZip = true;
      deliveryErrors.error = true;
    }
    if (deliveryInfo.phone == "") {
      deliveryErrors.noPhone = true;
      deliveryErrors.error = true;
    }
    if (deliveryInfo.creditNum == "") {
      deliveryErrors.noCreditNum = true;
      deliveryErrors.error = true;
    }

    request.session.deliveryErrors = deliveryErrors;

    next();
  },
};
