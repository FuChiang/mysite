
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
					fileName = file.name.split('.')[1],
					max_upload = 2,
					reader = new FileReader(); 

				if((file.size/1024/1024) > max_upload){
					time(function(){
						scope.shareSizeError = true;
					},100);
				}
				else if(fileName.match(/(jpg|gif|png)$/ig) === null){
					time(function(){
						scope.shareTypeError = true;
					},100);
				}
				else{
					$jq(".readLoad").fadeIn();
					time(function(){
						scope.shareSizeError = false;
						scope.shareTypeError = false;
						scope.readCompleted = true;
						scope.finialStep = true;
					},100);
					reader.readAsDataURL(file);
			     		reader.onload = function(e){ 
			     			var path = '';     			
			     			path = this.result;
			     			time(function(){
			     				$jq(".readLoad").hide();
			     				scope.sharePic = path;
			     				scope.shareInput = false;
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

//main mask block
APP.directive('shareName', ['$timeout', function(time) {
	return{
		//if set true then replace original items otherwise append into items 
		replace: true,
		// A=> attribute, E=> element, C=> class name, M=> comment
		restrict: 'A',
		//scope=> $scope, element=>object itsself, attr=>attribute in tag
		link: function(scope, element, attr){
			element.on("keyup", function(){
				if(element.val() != ""){
					time(function(){
						scope.nextStep = true;
					}, 100);
				}
				else{
					time(function(){
						scope.nextStep = false;
					}, 100);
				}
			});
		}
	};
}]);

//photo out display block
APP.directive('itemDisplay', ['$window', function($window) {
	return{
		//if set true then replace original items otherwise append into items 
		replace: true,
		// A=> attribute, E=> element, C=> class name, M=> comment
		restrict: 'A',
		//scope=> $scope, element=>object itsself, attr=>attribute in tag
		link: function(scope, element, attr){
			scope.$watch(attr.itemDisplay, function(value){
				if(value == 'single'){
					element.css({
						"width": "100%", 
						"height": false
					}).find(".photo-img").css({
						"width": false,
						"height": false
					}).end().find(".content").css("display", "block");
				}
				else if(value == 'multiple'){
					element.css({
						"width": false, 
						"height": false
					}).find(".photo-img").css({
						"width": false,
						"height": false
					}).end().find(".content").css("display", "block");
				}
				else if(value == 'waterfall'){
					element.css("width", false).find(".photo-img").css({
						"width": "50%",
						"height": "50%"
					}).end().find(".content").css("display", "none");
				}
				else if(value == 'new'){
					$window.location.href = '/viewPhoto/new';
				}
				else if(value == 'popular'){
					$window.location.href = '/viewPhoto/popular';
				}
				else if(value == 'chat'){
					$window.location.href = '/viewPhoto/comment';
				}
			});
		}
	};
}]);


//photo menu display block
APP.directive('itemMenu', function() {
	return{
		//if set true then replace original items otherwise append into items 
		replace: true,
		// A=> attribute, E=> element, C=> class name, M=> comment
		restrict: 'A',
		//scope=> $scope, element=>object itsself, attr=>attribute in tag
		link: function(scope, element, attr){
			scope.$watch(attr.itemMenu, function(value){
				if(value == 'small'){
					scope.single = 'singleMenu';
				}
				else if(value == 'original'){
					scope.single = '';
				}
			});
		}
	};
});





