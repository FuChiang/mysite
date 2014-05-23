
//main mask block
APP.directive('myMask', function() {
	return{
		//if set true then replace original items otherwise append into items 
		replace: true,
		// A=> attribute, E=> element, C=> class name, M=> comment
		restrict: 'A',
		//scope=> $scope, element=>object itsself, attr=>attribute in tag
		link: function(scope, element, attr){
			scope.$watch(attr.myMask, function(value){
				(value)?
					element.addClass("change-mask"):
					element.removeClass("change-mask");
			});
		}
	};
});

//add input focus
APP.directive('myFocus', ['$timeout', function(time) {
	return{
		//if set true then replace original items otherwise append into items 
		replace: true,
		// A=> attribute, E=> element, C=> class name, M=> comment
		restrict: 'A',
		//scope=> $scope, element=>object itsself, attr=>attribute in tag
		link: function(scope, element, attr){
			scope.$watch(attr.myFocus, function(value){
				if(value){
					time(function() {
						element[0].focus();
					}, 300);
				} 
			});
		}
	};

}]);

APP.directive('myShare', ['$timeout', function(time) {
	return{
		replace: true,
		restrict: 'A',
		link: function(scope, element, attr){
			element.bind("change", function(e){
				var file = (e.srcElement || e.target).files[0],
					max_upload = 2,
					reader = new FileReader(); 
				if((file.size/1024/1024) > max_upload){
					time(function(){
						scope.shareError = true;
					},100);
				}
				else{
					$jq(".progress").fadeIn();
					time(function(){
						scope.shareError = false;
					},100);
					reader.readAsDataURL(file);
		  
			     		reader.onload = function(e){ 
			     			var path = '';     			
			     			path = this.result;
			     			time(function(){
			     				scope.sharePic = path;
			     				scope.shareInput = false;
			     				scope.readCompleted = true;
			     				$jq(".progress").fadeOut();
			     			}, 500);
			     		}
				}	
			});

			scope.$watch(attr.myShare, function(value){
				if(value){
					element.val(null);
				}
			});
		}
	};
}]);

//main mask block
APP.directive('mySelect', function() {
	return{
		//if set true then replace original items otherwise append into items 
		replace: true,
		// A=> attribute, E=> element, C=> class name, M=> comment
		restrict: 'A',
		//scope=> $scope, element=>object itsself, attr=>attribute in tag
		link: function(scope, element, attr){
			element.bind("click", function(){
				scope.selectType = element.html();
			});
		}
	};
});





