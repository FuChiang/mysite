
//AJAX Method
APP.factory('ajax',['$http', function($http){
	var val = '';
	return {
		query: function(urls, parameters){
			$http({

		          method: 'POST',

			     data: parameters,

			     url: urls

	        	}).success(function(data, status, headers, config){
	          		 val = data;
	        	}).error(function(data, status, headers, config){
	        		alert('ajax 錯誤代碼='+status);
	       	});
		},
		get: function(){
			return val;
		}
	};
}]);