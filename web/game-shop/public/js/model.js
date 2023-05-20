Model = {}

Model.getProducts = function () {   //
    return $.ajax({ url: '/api/products', method: 'GET' });
};

Model.signup = function (name, surname, birth, address, email, password) {
  return $.ajax({
      url: '/api/users/signup',
      method: 'POST',

      data: { name, surname, birth, address, email, password}
  });
};

Model.signin = function (email, password) {
    return $.ajax({
        url: '/api/users/signin',
        method: 'POST',
        data: { email, password }
    });
};

Model.getProfile = function () {
  return $.ajax({
      url: '/api/users/profile',
      method: 'GET',
  });
};


Model.purchase = function(Address, cardowner, card) {
  return $.ajax({
      url: '/api/orders',
      method: 'POST',
      data: {Address,cardowner,card}
  });
};

Model.getOrder = function (oid){
  return $.ajax({
      url: '/api/orders/id/'+oid,
      method: 'GET',
      
  });
};


Model.getOrdersByUserId = function () {
  return $.ajax({
      url: '/api/orders',
      method: 'GET',
  });
};





Model.getUserId = function () {
    var uid = RegExp('uid=[^;]+').exec(document.cookie);
    if (uid) {
        uid = decodeURIComponent(uid[0].replace(/^[^=]+./, ""));
        return uid;
    }
    return null;
};

Model.signout = function () {
    document.cookie = 'uid=;expires=0;path=/;'
};

Model.getCartQty = function () {
    return $.ajax({
        url: '/api/cart/qty',
        method: 'GET'
    });
};

Model.buy = function (pid) {
    return $.ajax({
      url: '/api/cart/items/product/' + pid,     
      method: 'POST'
    });
  };

  Model.getCart = function () {  
    return $.ajax({
      url: '/api/cart',
      method: 'GET'
    });
  };


  Model.remove = function (pid, all = false) {
      return $.ajax({
          url: '/api/cart/items/product/' + pid + (all ? '/all' : ''),
          method: 'DELETE'
      });
  };
  Model.removeAll = function (pid, all = true) {
    return $.ajax({
        url: '/api/cart/items/product/' + pid + (all ? '/all' : ''),
        method: 'DELETE'
    });
  };
  