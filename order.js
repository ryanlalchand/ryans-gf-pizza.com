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
      request.session.errors_array.noName = true;
    }
    if (deliveryInfo.address == "") {
      request.session.errors_array.noAddress = true;
    }
    if (deliveryInfo.city == "") {
      request.session.errors_array.noCity = true;
    }
    if (deliveryInfo.state == "") {
      request.session.errors_array.noState = true;
    }
    if (deliveryInfo.zip == "") {
      request.session.errors_array.noZip = true;
    }
    if (deliveryInfo.phone == "") {
      request.session.errors_array.noPhone = true;
    }
    if (deliveryInfo.creditNum == "") {
      request.session.errors_array.noCreditNum = true;
    }
    next();
  },
};
