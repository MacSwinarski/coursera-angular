(function () {
'use strict';

angular.module('NarrowItDownApp', [])
 .controller('NarrowItDownController', NarrowItDownController)
 .service('MenuSearchService', MenuSearchService)
 .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
 .directive('foundItems', FoundItemsDirective);


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItemsTemplate.html',
    restrict: 'E',
    scope: {
      items: '<foundItems',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var list = this;

}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrow = this;

  narrow.found = [];
  narrow.searchMenuItem = "";
  narrow.notFoundMessage = "";

  narrow.removeFound = function(indexOfItem) {
    narrow.found.splice(indexOfItem, 1);
  }

  narrow.searchMenu = function() {
    narrow.found = [];
    narrow.notFoundMessage = "";

    var isEmpty = function(str) {
      return (str.length === 0 || !str.trim());
    };
    var nothingFound = function() {
      narrow.notFoundMessage = "Nothing found";
    }

    if (isEmpty(narrow.searchMenuItem)) {
      nothingFound();
      return;
    }
    var foundItemsPromise = MenuSearchService.getMatchedMenuItems(narrow.searchMenuItem);
    foundItemsPromise.then(function(foundItems) {
      if (foundItems.length > 0) {
        narrow.found = foundItems;
      } else {
        nothingFound();
      }
    });
  };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  var getAllMenuItems = function() {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });

    return response;
  };

  service.getMatchedMenuItems = function(searchTerm) {
    var allMenuItemsPromise = getAllMenuItems();

    return allMenuItemsPromise.then(function (response) {
      var allItems = response.data.menu_items;

      return allItems.filter(function(menuItem) {
          return menuItem.description.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1;
      });
    });
  }

}

})();
