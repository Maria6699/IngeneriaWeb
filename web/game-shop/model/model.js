Model = {}
Model.products = [{
    _id: 1,
    title: 'DUNLOP OMEGA AMARILLA 2019',
    description: 'The  DUNLOP OMEGA YELLOW 2019 is one of the new Dunlop rackets for this 2019 season. It is an initiation level racket, but with a quality and touch that will make us feel comfortable on the court from the first moment.',
    url: 'img/juego1.jpg',
    price: 50,
    tax: 2.1
}, {
    _id: 2,
    title: 'Molten BG2010 Baloncesto',
    description: 'Molten BG2010 Basketball, Indoor/Outdoor, FIBA ​​Approved, Premium Rubber, Deep Groove, Size 6, Orange/Ivory, Suitable for 12, 13, 14 Year Old Boys and 14 Year Old Girls and Adults',
    url: 'img/imagen2.jpg',
    price: 90,
    tax: 4.25
}, {
    _id: 3,
    title: 'SMALL SOCCER GOAL FOR OUTDOORS',
    description: 'Small folding soccer goal xqmax.Size: 50x44x44cm.Made of polypropylene.Weight: 620 grams, fabric: 38 grams.Includes 2 metal stirrups.',
    url: 'img/imagen3.jpg',
    price: 35,
    tax: 0.5
}, {
    _id: 4,
    title: 'Philonext 2-Pack Training Badminton Rackets with 3 Shuttlecocks',
    description: 'SOLID CONSTRUCTION - One piece design. Built-in T-joint that holds the shaft to the face of the racket. Prevent deformation caused by playing badminton, make the racket more stable, achieve high-precision control performance. ',
    url: 'img/imagen4.jpg',
    price: 15,
    tax: 0.15
}, {
    _id: 5,
    title: 'Professional Table Tennis Racket. Advanced.',
    description: 'High Performance Paddle: Senston ping pong paddles are sturdy and have a good layer of padding with just the right firmness for excellent ball control. ',
    url: 'img/imagen5.jpg',
    price: 45,
    tax: 2
}, {
    _id: 6,
    title: 'Proform Tour de France CBC Indoor Cycling Bike + 1 Month iFit Individual Membership',
    description: 'ProForm Tour de France Bike .At ProForm, we know performance. As one of the most famous brands in the fitness industry',
    url: 'img/imagen6.jpg',
    price: 98,
    tax: 12
}, {
    _id: 7,
    title: 'KIT SNORKEL Y BUCEO CRESSI MATRIX + GAMMA',
    description: 'MÁSCARA CRESSI MATRIX: Mejorada visibilidad en las zonas inferior y lateral gracias a su Formato Big Eyes. Montura radial de  espesor mínimo.',
    url: 'img/imagen7.jpg',
    price: 89.9,
    tax: 3.4
}, {
    _id: 8,
    title: 'MIKASA V200W GARA VOLLEYBALL EXCLUSIVE FIVB',
    description: 'After passing the most rigorous FIVB homologation tests, the V200W ball, starting from the 2019 World Cup, will become the official and exclusive ball of all FIVB competitions.',
    url: 'img/imagen8.jpg',
    price: 48,
    tax: 2.78
}
    // More products...
];
Model._cartItemsCount = 3;
Model.cartItems = [{
    _id:1,
    qty:2,
    product:Model.products[0]
},{
    _id:2,
    qty:1,
    product:Model.products[5]
}];
Model._orderItemsCount=3;
Model.orderItems=[{
    _id:0,
    qty:2,
    product:Model.products[0],
    price: 50,
    tax: 0.21
},{
    _id:1,
    qty:1,
    product:Model.products[5],
    price:98,
    tax: 0.21
}];
Model._ordersCount=2;
Model.orders=[{
    _id:1,
    number: 1234567890,
    date: Date.UTC(2022,6,6),
    address: 'Avd España, nº11, Albacete',
    cardholder: 'Maria Gomez Gomez',
    cardnumber: '6589 8929 1028 9929',
    orderItems: [Model.orderItems[0],Model.orderItems[1]]
}];
Model._usersCount = 4;
Model.users = [{
    _id: 1,
    email: 'johndoe@example.com',
    password: '1234',
    name: 'John',
    surname: 'Doe',
    birthdate: new Date(1990, 1, 1),
    address: '123 Main St, 12345 New York, USA',
    cartItems: [],
    orders: []
},
{
    _id: 2,
    email: 'maria.gomez60@alu.uclm.es',
    password: '1111',
    name: 'Maria',
    surname: 'Gomez',
    birthdate: new Date(2000, 7, 12),
    address: '23 Calderon de la Barca, 1345 Albacete, Spain',
    cartItems: [Model.cartItems[0],Model.cartItems[1]],
    orders: [Model.orders[0]]
},
{
    _id: 3,
    email: 'ivonne.barata@alu.uclm.es',
    password: '2222',
    name: 'Ivonne',
    surname: 'Barata',
    birthdate: new Date(2000, 8, 5),
    address: '23 Av.España, 1345 Albacete, Spain',
    cartItems: [],
    orders: []
}];





Model.signin = function (email, password) {

    for (var i = 0; i < Model.users.length; i++) {
        if (Model.users[i].email == email && Model.users[i].password == password)

            return Model.users[i];

    }
    return null;
};


Model.signout = function (uid) {
    var user = Model.getUserById(uid);
    user = null;
    return true;
};

Model.signup = function (name, surname, birth, address, email, password) {
    var newUser  = null;
    for (var i = 0; i < Model.users.length; i++){
        if ((Model.users[i].email == email)){
            return null;
        }
    }

    newUser= {
        _id: Model._usersCount++,
        email: email,
        password: password,
        name: name,
        surname: surname,
        birthdate: (2022, 5, 12),
        address: address,
        cartItems: [],
        orders: []

    }
    
    Model.users.push(newUser);
    return newUser;

};



Model.buy = function (uid,pid) {
    var product = Model.getProductById(pid);
    var user = Model.getUserById(uid);
    if (user && product) {
        for (var i = 0; i < user.cartItems.length; i++) {
            var item =user.cartItems[i];
            if (item.product._id == pid) {
                item.qty++;
                return user.cartItems;
            }
        }
    
        var item={
            _id:Model._cartItemsCount++,
            product: product,
            qty:1
        };
        user.cartItems.push(item);
        Model.cartItems.push(item);
        return user.cartItems;
    }
    return null;
    
};


Model.remove = function(uid, pid, all = false) {
    var user = Model.getUserById(uid);
    if (user) {
      for (var i = 0; i < user.cartItems.length; i++) {
        var item = user.cartItems[i];
        if (item.product._id == pid) {
          if (!all && (item.qty > 1)) {
            item.qty--;
          } else {
            user.cartItems.splice(i, 1);
            Model.cartItems.splice(Model.cartItems.indexOf(item), 1);
          }
          
          return user.cartItems;
        }
      }
    }
    return null;
  };

Model.removeAll = function (id) {
    if (Model.user) {
        for (var i = 0; i < Model.user.cartItems.length; i++) {
            var item = Model.user.cartItems[i];
            if (item.product._id == id) {
                Model._cartItemsCount--;
                Model.user.cartItems.splice(i, 1);

            }
        }
    }
};



Model.getUserById = function (userid) {
    for (var i = 0; i < Model.users.length; i++) {
        if (Model.users[i]._id == userid) {
            return Model.users[i];
        }
    }
    return null;
};

Model.getCartQty = function (uid) {
    var user = Model.getUserById(uid);
    if (user) {
        var count = 0;
        for (var i = 0; i < user.cartItems.length; i++) {
            count += user.cartItems[i].qty;
        }
        return count;
    }
    return null;
};
Model.getProductById = function (pid) {
    for (var i = 0; i < Model.products.length; i++) {
        if (Model.products[i]._id == pid) {
            return Model.products[i];
        }
    }
    return null;
};

Model.getCartByUserId = function (uid) {
    var user = Model.getUserById(uid);
    if (user) {
      return user.cartItems;
    }
    return null;
  }
  
Model.purchase = function (uid,Address, cardowner, card) {

    dateAux = new Date();
    cartItemsAux = [];
    numberAux = Date.now();
    var user = Model.getUserById(uid);
  
    order = {
      number: numberAux,
      date: dateAux,
      address: Address,
      cardHolder: cardowner,
      cardNumber: card,
      orderItems: []
  
    }
  

    for (i = 0; i < user.cartItems.length; i++) {
      priceaux = user.cartItems[i].product.price;
      taxaux = user.cartItems[i].product.tax;
  
  
  
      order.orderItems.push({
        qty: user.cartItems[i].qty,
        price: priceaux,
        tax: taxaux,
        product: user.cartItems[i].product
      });
  
    }
    user.orders.push(order)
    numCI = user.cartItems.length;
    for (i = 0; i < numCI; i++) {
      user.cartItems.pop();
    }
  
    return order
  
  }
  


Model.remove= function (uid, pid, all = false) {
    var user = Model.getUserById(uid);
    if (user) {
        for (var i = 0; i < user.cartItems.length; i++) {
            var item = user.cartItems[i];
            if (item.product._id == pid) {
                if (!all && (item.qty > 1)) {
                    item.qty--;
                } else {
                    user.cartItems.splice(i, 1);
                    Model.cartItems.splice(Model.cartItems.indexOf(item),1);
                }
                return user.cartItems;
            }
        }
    }
    return null;
};
Model.removeAll= function (uid, pid, all = true) {
    var user = Model.getUserById(uid);
    if (user) {
        for (var i = 0; i < user.cartItems.length; i++) {
            var item = user.cartItems[i];
            if (item.product._id == pid) {
                if (all){
                    user.cartItems.splice(i,1);
                    Model.cartItems.splice(Model.cartItems.indexOf(item),1);
                }
                }
                return user.cartItems;
                
            }
        }
        return null;
    };
/*Model.getOrder = function(number){
    for (var i = 0; i < user.orders.length; i++) {
        var ord = Model.orders[i];
        if(Model.orders[i].number == number){
            return ord;
        }

    }
    return null;
    

}*/

Model.getOrdersByUserId = function (uid) {
    var user = Model.getUserById(uid);
    if (user) {
      return user.orders;
    }
    return null;
  }

Model.getOrder = function (uid,number) {
    var user = Model.getUserById(uid);
    if (user) {
      for (i = 0; i < user.orders.length; i++) {
        if (user.orders[i].number == number) {
          return user.orders[i];
        }
      }
    }
    else return null;
  }


module.exports = Model;