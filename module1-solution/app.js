(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

var LUNCH_MESSAGE_EMPTY = "Please enter data first"
var LUNCH_MESSAGE_PASS = "Enjoy!";
var LUNCH_MESSAGE_FAIL = "Too much!";
var LUNCH_MESSAGE_COLOR1 = "Too much!";
var LUNCH_LIMIT = 3;

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.lunchCsItems = "";
  $scope.lunchCsItemsStyle = {};
  $scope.lunchMessage = "";
  $scope.lunchMessageStyle = {};

  var removeEmptyStrings = function(arr) {
     return arr.filter(function(str) {
       return str != undefined && str.trim().length > 0;
     });
  }

  $scope.checkLunch = function () {
    var lunchCsItems = $scope.lunchCsItems;
    if (!lunchCsItems) {
      $scope.lunchMessageStyle.style = {"color":"red"};
      $scope.lunchCsItemsStyle.style = {"border-color":"red"};
      $scope.lunchMessage = LUNCH_MESSAGE_EMPTY;
      return;
    }
    var lunchItems = removeEmptyStrings(lunchCsItems.split(','));

    var numberOfItems = lunchItems.length;

    $scope.lunchMessageStyle.style = {"color":"green"};
    $scope.lunchCsItemsStyle.style = {"border-color":"green"};
    if (numberOfItems <= LUNCH_LIMIT) {
        $scope.lunchMessage = LUNCH_MESSAGE_PASS;
    } else {
        $scope.lunchMessage = LUNCH_MESSAGE_FAIL;
    }
  };
}

})();
