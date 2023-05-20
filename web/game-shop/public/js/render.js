function render(url, container, context) {
    return $.ajax({
        url: url,
        method: 'GET'
    }).done(function (source) {
        var template = Handlebars.compile(source);
        var html = template(context);
        $(container).html(html);
    }).fail(function (error) {
        console.error('GET ', url, error);
    });
}
function navigateTo(event, url) {
    event.preventDefault();
    history.pushState(null, '', url);
    route();
}

function route() {
    var path = location.pathname;
    var matches = null;
    var templates = ['cart', 'index', 'order', 'profile', 'purchase', 'signin', 'signup']
    var context = { user: Model.getUserId(), messages: { success: Messages.success, danger: Messages.danger } };
    Messages.clear();
    var cartQtyP = Model.getCartQty().done(function (cartQty) {
      context.cartQty = cartQty;
    }).fail(function () {
      console.error('Cannot retrieve cart quantity');
    });
    console.log('ROUTING ', path);
    if (matches = path.match(/^\/$/)) {
        var productsP = Model.getProducts().done(function (products) {
            context.products = products;
        }).fail(function () {
            console.error('Cannot retrieve products');
        });
        $.when(cartQtyP, productsP).always(function () {
            render('/templates/index.hbs', '#content', context);
        });
    }
    else if (matches = path.match(/^\/order\/id\/([0-9^\/]+)\/?$/)) {
        var orderP = Model.getOrder(matches[1]).done(function (order) {
          context.order = order;
        }).fail(function () {
          console.error('Cannot retrieve orders');
          $.when(cartQtyP,orderP).always(function () {
            render('/templates/not-found.hbs', '#content', context);
          });
        }); 
        $.when(cartQtyP,orderP).always(function () {
          render('/templates/order.hbs', '#content', context);
        });
      } else if (matches = path.match(/^\/cart\/?$/)) {
        var cartP = Model.getCart().done(function (cart) {
          context.cartItems = cart;
        }).fail(function () {
          console.error('Cannot retrieve cart');
        });
        $.when(cartQtyP, cartP).always(function () {
          render('/templates/cart.hbs', '#content', context);
        });
    }else if (matches = path.match(/^\/purchase\/?$/)) {
      console.log("Ruteo con context")
      var cartP = Model.getCart().done(function (cart) {
        context.cartItems = cart;
      }).fail(function () {
        console.error('Cannot retrieve cart');
      });
      $.when(cartQtyP, cartP).always(function () {
        render('/templates/purchase.hbs', '#content', context);
      });
    }else if (matches = path.match(/^\/profile\/?$/)) {
        console.log("Ruteo con context")
        var profileP = Model.getProfile().done(function (profile) {
          context.user = profile;
          //console.log(context.user);
        }).fail(function () {
          console.error('Cannot retrieve profile');
        });
        var ordersP = Model.getOrdersByUserId().done(function (orders) {
          context.orders = orders;
        }).fail(function () {
          console.error('Cannot retrieve user orders');
        })
        $.when(cartQtyP, profileP, ordersP).always(function () {
          render('/templates/profile.hbs', '#content', context);
        });
    
      }
    //  
    //     if (matches[1] == "profile") {


    //         var ordersP = Model.getUserOrders().done(function(orders) {
    //             context.orders = orders;
    //         }).fail(function(error) {
    //             console.error('Cannot retrieve orders');
    //         });

            

    //     }
    //  
        else if ((matches = path.match(/^\/([^\/]*)\/?$/)) && templates.includes(matches[1])) {
        $.when(cartQtyP).always(function () {
            render('/templates/' + matches[1] + '.hbs', '#content', context);
        });
    } else {
        $.when(cartQtyP).always(function () {
            render('/templates/not-found.hbs', '#content', context);
        });
    }
}

function loadPartial(url, partial) {
    return $.ajax({
        url: url,
        method: 'GET'
    }).done(function (source) {
        Handlebars.registerPartial(partial, source);
    }).fail(function (error) {
        console.error('GET ', url, error);
    });
}

$(function () {
    
    Handlebars.registerHelper('formatPrice', function (price) {
        var result = (Math.round(price * 100) / 100).toFixed(2) + '€';
        return new Handlebars.SafeString(result);
    });
    Handlebars.registerHelper('totalPrice', function (price, qty) {
        var resultTotal = (price * qty) + '€';
        return new Handlebars.SafeString(resultTotal);
    });
    Handlebars.registerHelper('subtotal', function (cartItems) {
       let subtotal = 0;
        for (item of cartItems) {
        subtotal += item.qty * item.product.price;
        }
        return subtotal;
    });

    Handlebars.registerHelper('tax', function (cartItems) {
        let tax = 0;
        for (item of cartItems) {
            tax += item.product.tax * item.qty;
        }
        return tax;
    });

    Handlebars.registerHelper('total', function (cartItems) {
      let total=0;
      for(item of cartItems){
        total += item.qty * (item.product.price + item.product.tax);
      }
      return total;
    });
    Handlebars.registerHelper('totalPriceItem', function (price,tax,qty) {
        return (price + tax) * qty;
    });


    Handlebars.registerHelper('subtotalOrderItem', function (qty, price) {
        var result = qty * price
    
        return new Handlebars.SafeString(result);
      });
      Handlebars.registerHelper('subtotalOrder', function (orderItems) {
        var result = 0
    
        for (i = 0; i < orderItems.length; i++) {
          result = result + (orderItems[i].qty * orderItems[i].price)
        }
    
        return new Handlebars.SafeString(result);
      });
      Handlebars.registerHelper('taxOrder', function (orderItems) {
        var result = 0
    
        for (i = 0; i < orderItems.length; i++) {
          result = result + (orderItems[i].qty * orderItems[i].tax)
        }
    
        return new Handlebars.SafeString(result);
      });
      Handlebars.registerHelper('totalOrder', function (orderItems) {
        var result = 0
    
        for (i = 0; i < orderItems.length; i++) {
          result = result + (orderItems[i].qty * orderItems[i].tax) + (orderItems[i].qty * orderItems[i].price);
        }
    
        return new Handlebars.SafeString(result);
      });
      Handlebars.registerHelper('formatDate', function (date) {
        var result
        var t = new Date(date)
        //console.log(t);
    
    
        let dd = String(t.getDate()).padStart(2, '0');
        let mm = String(t.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = t.getFullYear();
        result = mm + "/" + dd + "/" + yyyy;
    
        return new Handlebars.SafeString(result);
      });

    window.addEventListener('popstate', (event) => route(), false);
    $.when(loadPartial('/partials/navbar.hbs', 'navbar'),
        loadPartial('/partials/header.hbs', 'header'),
        loadPartial('/partials/messages.hbs', 'messages'),
        loadPartial('/partials/footer.hbs', 'footer')
    ).always(function () {
        route();
    });
});


// function signin_clicked(e) {
//     e.preventDefault();
//     e.stopPropagation();
//     $('#signin-form').submit();
// }

