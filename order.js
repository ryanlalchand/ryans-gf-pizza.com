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

    var pizzas = [];
    pizzas.push(pizza);
    request.session.pizzas = pizzas;
    request.session.numberOfPizzas += 1;

    if(pizza.size==="small"){
      request.session.totalPrice += 12;
    } else if(pizza.size==="medium"){
      request.session.totalPrice += 16;
    } else if(pizza.size==="large"){
      request.session.totalPrice += 20;
    }

    next();
  },

  getDelivery(request, response, next) {
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

    if (deliveryInfo.name == "") {
      request.session.errors.noName = true;
    }
    if (deliveryInfo.address == "") {
      request.session.errors.noAddress = true;
    }
    if (deliveryInfo.city == "") {
      request.session.errors.noCity = true;
    }
    if (deliveryInfo.state == "") {
      request.session.errors.noState = true;
    }
    if (deliveryInfo.zip == "") {
      request.session.errors.noZip = true;
    }
    if (deliveryInfo.phone == "") {
      request.session.errors.noPhone = true;
    }
    if (deliveryInfo.creditNum == "") {
      request.session.errors.noCreditNum = true;
    }
    next();
  },
};
