// Import express module
var express = require('express');
// Import path module
var path = require('path');
// Import logger module
var logger = require('morgan');

var cookieParser = require('cookie-parser');


var model = require('./model/model.js')


// Instantiate the express middleware
var app = express();
// Load logger module
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Set public folder to publish static content
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/products', function (req, res, next) {
  return res.json(model.products);
});

app.post('/api/users/signup', function (req, res, next) {
  var user = Model.signup(req.body.name, req.body.surname, req.body.birth, req.body.address, req.body.email, req.body.password);

  if (user) {
    // res.cookie('uid', user._id);

    return res.json(user);
  }
  return res.status(401).json({ message: 'Invalid credentials' });

});

app.post('/api/users/signin', function (req, res, next) {
  var user = model.signin(req.body.email, req.body.password);
  if (user) {
    res.cookie('uid', user._id);
    return res.json({});
  }
  return res.status(401).json({ message: 'Invalid credentials' });
});


app.get('/api/users/profile', function (req, res, next) {
  var uid = req.cookies.uid;
  if (!uid) {
      return res.status(401).send({ message: 'User has not signed in' });
  }

  var user = model.getUserById(uid);

  if (user) {
      return res.json(user);
  }

  return res.status(500).send({ message: 'No user' });
});


app.post('/api/orders', function (req, res, next) {
  var uid = req.cookies.uid;
  if (!uid) {
    return res.status(401).send({ message: 'User has not signed in' });
  }

  var order = model.purchase(uid,req.body.Address,req.body.cardOwner,req.body.card);
  console.log(order)
  if (order) {
    
    return res.json(order);
  }
  return res.status(503).json({ message: 'Checkout failed' });
});

app.get('/api/orders/id/:oid', function (req, res, next) {
  var oid = req.params.oid;
  var uid = req.cookies.uid;
  if (!uid) {
    return res.status(401).send({ message: 'User has not signed in' });
  }
  var order = Model.getOrder(uid,oid);
  if (order) {
    return res.json(order);
  }
  return res.status(500).send({ message: 'Cannot show order from this user' });
});





app.get('/api/cart/qty', function (req, res, next) {
  var uid = req.cookies.uid;
  if (!uid) {
    return res.status(401).send({ message: 'User has not signed in' });
  }
  var cartQty = model.getCartQty(uid);
  if (cartQty !== null) {
    return res.json(cartQty);
  }
  return res.status(500).send({ message: 'Cannot retrieve user cart quantity' });
});


/*app.get('/api/orders', function (req, res, next) {
  var uid = req.cookies.uid;
  if (!uid) {
      return res.status(401).send({ message: 'User has not signed in' });
  }

  var user = model.getUserById(uid); 
  var orders = user.orders; 
  if (orders) {
      return res.json(orders);
  }
  return res.status(401).send({ message: 'Cannot retrieve order' });
});
*/
app.get('/api/orders', function (req, res, next) {
  var uid = req.cookies.uid;
  if (!uid) {
    return res.status(401).send({ message: 'User has not signed in' });
  }
  var orders = Model.getOrdersByUserId(uid);
  console.log(orders)
  if (orders) {
    return res.json(orders);
  }
  return res.status(502).send({ message: 'Cannot retrieve orders' });
});


app.post('/api/cart/items/product/:pid', function (req, res, next) {
  var pid = req.params.pid;
  var uid = req.cookies.uid;
  if (!uid) {
    return res.status(401).send({ message: 'User has not signed in' });
  }
  var cart = Model.buy(uid, pid);
  if (cart) {
    return res.json(cart);
  }
  return res.status(500).send({ message: 'Cannot add item to cart' });
});

app.get('/api/cart', function (req, res, next) {
  var uid = req.cookies.uid;
  if (!uid) {
    return res.status(401).send({ message: 'User has not signed in' });
  }
  var cart = Model.getCartByUserId(uid);
  if (cart) {
    return res.json(cart);
  }
  return res.status(500).send({ message: 'Cannot retrieve cart' });
});

app.delete('/api/cart/items/product/:pid', function (req, res, next) {
  
  var pid = req.params.pid;
  var uid = req.cookies.uid;
  if (!uid) {
    return res.status(401).send({ message: 'User has not signed in' });
  }
  var cart = Model.remove(uid, pid, false);
 
  if (cart) {
    return res.json(cart);
  }
  return res.status(500).send({ message: 'Cannot remove item from cart' });
});

app.delete('/api/cart/items/product/:pid/all', function (req, res, next) {
  var pid = req.params.pid;
  var uid = req.cookies.uid;
  if (!uid) {
      return res.status(401).send({ message: 'User has not signed in' });
  }
  var cart = Model.removeAll(uid, pid, true);
  if (cart) {
      return res.json(cart);
  }
  return res.status(500).send({ message: 'Cannot remove items from cart' });
});



// Set redirection to index.html 
app.get(/\/.*/, function (req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Listen to port 3000
app.listen(3000, function () {
  console.log('GameShop Web app listening on port 3000!');
});

