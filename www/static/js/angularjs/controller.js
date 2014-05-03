
//set angularjs app by myself
var APP = angular.module('MyApp', []);

//change angularjs variable sign from {{ }} to << >>
APP.config(function($interpolateProvider){
	$interpolateProvider.startSymbol('<%');
	$interpolateProvider.endSymbol('%>');
}); 


//main index block
APP.controller("main-index-block", ['$scope', function($scope){
	$scope.checkMsg = {
		before: "請移動左方滾輪證明是人類",
		after: "已證實了,謝謝!!"
	}
	$scope.msg = $scope.checkMsg.before;
	$scope.showAdd = false;
	$scope.addPush = true;
	$scope.loginPush = true;
	$scope.pushAddToggle = function(){
		$scope.addPush = ($scope.addPush)? false: true;
		$scope.resetAddForm();
	}
	$scope.pushLoginToggle = function(){
		$scope.loginPush = ($scope.loginPush)? false: true;
		$scope.resetAddForm();
	}
	$scope.change = function(){
		if($scope.msg === $scope.checkMsg.before){
			$scope.msg = $scope.checkMsg.after;
			$scope.showAdd = true;
		}
		else{
			$scope.msg = $scope.checkMsg.before;
			$scope.showAdd = false;
		}
	}
	$scope.resetAddForm = function(){
		$scope.addForm = {};	
		if($scope.msg === $scope.checkMsg.after){
			$jq(".ui .toggle").click();
			$scope.change();
		}
	}

}]);

