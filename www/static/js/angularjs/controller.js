
//set angularjs app by myself
var APP = angular.module('MyApp', []);

//set model configure 
APP.config(function($interpolateProvider, $httpProvider){

	//get django csrf token to angularjs x-csrf token
	$httpProvider.defaults.headers.post['X-CSRFToken'] = $jq('input[name=csrfmiddlewaretoken]').val();

	//add request information that can let django use build function of request.is_ajax() 
	$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

	//change angularjs variable sign from {{ }} to <% %>
	$interpolateProvider.startSymbol('<%');
	$interpolateProvider.endSymbol('%>');
}); 


//main index block
APP.controller("main-index-block", ['$scope', '$http', '$window', function($scope, $http, $window){
	var checkMsg = {
		before: "請點擊左方滾輪證實為人類",
		after: "已證實,謝謝!!"
	};
	
	$scope.onlyStrAndNum = "/^[0-9a-z]+$/i";
	$scope.level = false;
	$scope.inputFocus = false;
	$scope.accountShow = false;
	$scope.pwdShow = false;
	$scope.emlShow = false;

	//facebook login
	$scope.facebookLogin = function(){
		FB.login(function(response) {
			if(response.authResponse){
				FB.api('/me', function (response) {
					$http({
				            method: 'POST',
				            data: {name: response.name, email: response.email, id: response.id},
				            url: 'member/facebookLogin'
				      }).success(function(data, status, headers, config){
			          		$window.location.href = '/home';
				      }).error(function(data, status, headers, config){
				        	alert('status='+status);
				      });  
				});
			}
		},{ scope: 'email' });
	}

	//google login
	$scope.googleLogin = function(){
		var url = "https://www.google.com/accounts/o8/ud?openid.ns=http://specs.openid.net/auth/2.0"+
				 "&openid.return_to=http://www.cutepaw.idv.tw/member/googleLogin&openid.ns.ax=http://openid.net/srv/ax/1.0&openid.identity=http://specs.openid.net/auth/2.0/identifier_select"+
				 "&openid.ax.mode=fetch_request&openid.ax.required=email,firstname,lastname&openid.ax.type.firstname=http://axschema.org/namePerson/first"+
				 "&openid.ax.type.lastname=http://axschema.org/namePerson/last&openid.ax.type.email=http://schema.openid.net/contact/email"+
				 "&openid.realm=http://www.cutepaw.idv.tw/&openid.mode=checkid_setup&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select";
	
  		document.location.href = url;
	}

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
			var url = 'member/join',
				parameters = {account: $scope.joinMember.addAccount, password: $scope.joinMember.addPassword, email: $scope.joinMember.addEmail};
			
			//open load mask
			$scope.load = true;

			//ajax call
			$scope.joinMember.joinAjax(url, parameters);
		},
		joinAjax: function(urls, parameters){
			 $http({

		            method: 'POST',
		            data: parameters,
		            url: urls

		      }).success(function(data, status, headers, config){
	          		if(data == 'add error'){
	          			alert('申請的資料格式有錯！！');
	          			//close load mask
					$scope.load = false;
	          		}
	          		else if(data == 'add existed'){
	          			$scope.addForm.username.$setValidity('unique', false);
	          			//close load mask
					$scope.load = false;
	          		}
	          		else if(data == 'add right'){
					$window.location.href = '/home';
	          		}
		      }).error(function(data, status, headers, config){
		        	alert('status='+status);
		      });  
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
		},
		loginSend: function(){
			var url = 'member/login',
				parameters = {account: $scope.loginMember.loginAccount, password: $scope.loginMember.loginPassword};
			//open load mask
			$scope.load = true;

			//ajax call
			$scope.loginMember.loginAjax(url, parameters);
		},
		loginAjax: function(urls, parameters){
			 $http({

		            method: 'POST',
		            data: parameters,
		            url: urls

		      }).success(function(data, status, headers, config){
	          		if(data == 'login error'){
	          			alert('登入的資料格式有錯！！');
	          			//close load mask
					$scope.load = false;
	          		}
	          		else if(data == 'login notExist'){
	          			$scope.loginForm.username.$setValidity('notExist', false);
	          			//close load mask
					$scope.load = false;
	          		}
	          		else if(data == 'login right'){
					$window.location.href = '/home';
	          		}
		      }).error(function(data, status, headers, config){
		        	alert('status='+status);
		      });  
		}
	}

	//set search block
	$scope.searchSubject = {
		searchClick: false,
		pushSearch: function(){
			if($scope.searchSubject.searchClick){
				$scope.inputFocus = false;
				$scope.level = false;
				$scope.searchSubject.searchClick = false;
			}
			else{
				$scope.level = true;
				$scope.inputFocus = true;
				$scope.searchSubject.searchClick = true;
				$scope.searchSubject.petName = '';
			}
			
		}
	}

	$scope.mail = function(){
		$scope.mailShow = ($scope.mailShow)? false:true;
	}


}]);

APP.controller("dashboard-content-block", ['$scope', '$window', '$http', '$timeout', 'myUtils', function($scope, $window, $http, time, myUtils){
	
	$scope.shareInput = false;
	$scope.shareError = false;
	$scope.urlInputShow = false;
	$scope.urlLinkError = false;
	$scope.photoLoad = false;
	$scope.readingPhoto = false;
	$scope.readCompleted = false;
	$scope.titleInput = '';

	$scope.clickUpload = function(){
		$jq(".share-pic-img").click();
	}

	$scope.deletePhoto = function(photo_id, photo_name){
		$http({
		          method: 'POST',
			     data: {id: photo_id, name: photo_name},
			     url: '/deletePhoto'

	     }).success(function(data, status, headers, config){
	        	$window.location.reload();
	     }).error(function(data, status, headers, config){
	        	alert('ajax 錯誤代碼='+data);
	     });
	}

	$scope.photoUrl = function(){
		if($scope.urlInputShow){
			$scope.urlInputShow = false;
			$scope.photoUrlUpload = false;
		}
		else{
			$scope.urlInputShow = true;
			$scope.photoUrlUpload = true;
		}

		$scope.urlLinkError = false;
	}

	$scope.reUpload = function(){
		$scope.readCompleted = false;
		$scope.readingPhoto = false;
		$scope.finialStep = false; 
		$scope.shareInput = true;
		$scope.urlInputShow = false;
	}

	$scope.urlUpload = function(){
		var link = $scope.urlLink;

		if(link == ""){
			$scope.urlLinkError = true;
		}
		else{
			myUtils.isImg(link).then(function(){
	           	time(function(){
	           		$scope.photoLoad = true;
	           		$scope.urlLinkError = false;
	           		$scope.shareSizeError = false;
					$scope.shareTypeError = false;
					$scope.readingPhoto = true;
					$scope.finialStep = true;
	           		$scope.shareInput = false;
	           		
	           		time(function(){
	           			$scope.photoLoad = false;
	           			$scope.sharePic = link;
	           			$scope.readCompleted = true;
	           		}, 500);
	           	}, 100);

	           }, function(){
	           	$scope.urlLinkError = true;
	           });
		}
	}

}]);

APP.controller("view-content-block", ['$scope', '$http', '$timeout', function($scope, $http, time){
	
	$scope.photoShow = 'multiple_show';
	$scope.shadowSet = 'noShadow';
	$scope.shadowButton = 'black';
	$scope.shadowIcon = 'adjust';
	$scope.shadowTitle = '陰影模式顯示';

	$scope.addLove = function(photo_id){

		var loveId = 'love'+photo_id,
			$jq_love =  $jq("."+loveId);

		$jq_love.html(parseInt($jq_love.html(), 10)+1);

		$http({
		          method: 'POST',
			     data: {id: photo_id},
			     url: '/updatePhotoLove'

	     }).error(function(data, status, headers, config){
	        	alert('ajax 錯誤代碼='+data);
	     });
	}

	$scope.shadow = function(e){
		if($scope.shadowSet == 'noShadow'){
			$scope.shadowSet = 'shadowing';
			$scope.shadowClass = 'shadowShow';
			$scope.shadowButton = '';
			$scope.shadowIcon = 'hide';
			$scope.shadowTitle = '關閉陰影顯示';
		}
		else{
			$scope.shadowSet = 'noShadow';
			$scope.shadowClass = false;
			$scope.shadowButton = 'black';
			$scope.shadowIcon = 'adjust';
			$scope.shadowTitle = '陰影模式顯示';
		}

		time(function(){
			reuseEvent.backCoverEvent();
		}, 200);
		
	}
	
}]);

APP.controller("aside-bar-block", ['$scope', '$http', '$timeout', function($scope, $http, $timeout){

	

}]);
 