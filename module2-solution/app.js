(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;

  toBuy.toBuyItems = ShoppingListCheckOffService.getToBuyItems();

  toBuy.buy = function(indexOfItemToBuy) {
    ShoppingListCheckOffService.buy(indexOfItemToBuy);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBought = this;

  alreadyBought.alreadyBoughtItems = ShoppingListCheckOffService.getAlreadyBoughtItems();
}

function ShoppingListCheckOffService() {
  var service = this;

  var toBuyItems = [];
  var alreadyBoughtItems = [];

  var init = function() {
    toBuyItems.push({ name: "Canyon Aeroad", quantity: 10 });
    toBuyItems.push({ name: "Canyon Speedmax", quantity: 5 });
    toBuyItems.push({ name: "Sepcialized Roubaix", quantity: 7 });
    toBuyItems.push({ name: "Santa Cruz Stigmata", quantity: 3 });
    toBuyItems.push({ name: "Cannondale SuperX", quantity: 5 });
    toBuyItems.push({ name: "BMC TimeMachine", quantity: 3 });
  }

  init();

  service.getToBuyItems = function() {
    return toBuyItems;
  };

  service.getAlreadyBoughtItems = function() {
    return alreadyBoughtItems;
  };

  service.buy = function(indexOfItemToBuy) {
      var itemToBuy = toBuyItems.splice(indexOfItemToBuy, 1)[0];
      alreadyBoughtItems.push(itemToBuy);
  }

}

})();
