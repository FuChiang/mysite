
//set angularjs app by myself
var APP = angular.module('MyApp', []);

//change angularjs variable sign from {{ }} to << >>
APP.config(function($interpolateProvider){
	$interpolateProvider.startSymbol('<%');
	$interpolateProvider.endSymbol('%>');
}); 


//main index block
APP.controller("main-index-block", ['$scope', function($scope){
	var checkMsg = {
		before: "請移動左方滾輪證實為人類",
		after: "已證實,謝謝!!"
	};
	
	$scope.onlyStrAndNum = "/[a-z0-9]/i";
	$scope.level = false;
	$scope.inputFocus = false;
	$scope.accountShow = false;
	$scope.pwdShow = false;
	$scope.emlShow = false;

	//set join form
	$scope.joinMember = {
		addClick: false,
		addChange: false,
		showAdd: false,
		addAccount: '',
		addPassword: '',
		addEmail: '',
		msg: checkMsg.before,
		change: function(){
			if($scope.joinMember.msg === checkMsg.before){
				$scope.joinMember.msg = checkMsg.after;
				$scope.joinMember.showAdd = true;
			}
			else{
				$scope.joinMember.msg = checkMsg.before;
				$scope.joinMember.showAdd = false;
			}
		},
		pushAddToggle: function(){
			if($scope.joinMember.addClick){
				$scope.level = false;
				$scope.inputFocus = false;
				$scope.joinMember.addClick = false;
				$scope.joinMember.addChange = '';
			}
			else{
				$scope.level = true;
				$scope.inputFocus = true;
				$scope.accountShow = false;
				$scope.pwdShow = false;
				$scope.emlShow = false;
				$scope.joinMember.addClick = true;
				$scope.joinMember.addChange = 'push';
				$scope.joinMember.addAccount =  '';
				$scope.joinMember.addPassword = '';
				$scope.joinMember.addEmail = '';
				$scope.joinMember.resetCheckBar();
				
			}
		},
		resetCheckBar: function(){
			if($scope.joinMember.msg === checkMsg.after){
				$jq(".ui .toggle").click();
				$scope.joinMember.change();
			}
		},
		addSend: function(){
			var user = $scope.joinMember.addAccount,
				pwd = $scope.joinMember.addPassword,
				eml = $scope.joinMember.addEmail;

		}
	}

	//set login form
	$scope.loginMember = {
		loginClick: false,
		loginChange: false,
		loginAccount: '',
		loginPassword: '',
		pushLoginToggle: function(){
			if($scope.loginMember.loginClick){
				$scope.level = false;
				$scope.inputFocus = false;
				$scope.loginMember.loginClick = false;
				$scope.loginMember.loginChange = '';
			}
			else{
				$scope.accountShow = false;
				$scope.pwdShow = false;
				$scope.loginMember.loginClick = true;
				$scope.level = true;
				$scope.inputFocus = true;
				$scope.loginMember.loginChange = 'push';
				$scope.loginMember.loginAccount =  '';
				$scope.loginMember.loginPassword = '';
			}
		}

	}

}]);

