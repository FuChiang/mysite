
APP.factory('myUtils', ['$q', function($q){
	return {
		isImg: function(url){

			var deferred = $q.defer(),
				image = new Image();

			image.onerror = function() {
	                deferred.reject();
	           };

	           image.onload = function() {
	                deferred.resolve();
	           };

	           image.src = url;
	        
	           return deferred.promise;
		}
	};
}]);