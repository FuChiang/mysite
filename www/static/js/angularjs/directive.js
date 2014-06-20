
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

				if((file.size/1024/1024) > max_upload || fileName.match(/(jpg|gif|png)$/ig) === null){
					time(function(){
						scope.shareSizeError = true;
					},100);
				}
				else{
					time(function(){
						scope.photoLoad = true;
						scope.shareSizeError = false;
						scope.shareTypeError = false;
						scope.finialStep = true;
						scope.readingPhoto = true;
					},100);
					reader.readAsDataURL(file);
			     		reader.onload = function(e){ 
			     			var path = this.result;
			     			time(function(){
			     				scope.readCompleted = true;
			     				scope.photoLoad = false;
			     				scope.shareInput = false;
			     				scope.sharePic = path;
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
APP.directive('myUrlShare', ['$timeout', function(time) {
	return{
		//if set true then replace original items otherwise append into items 
		replace: true,
		// A=> attribute, E=> element, C=> class name, M=> comment
		restrict: 'A',
		//scope=> $scope, element=>object itsself, attr=>attribute in tag
		link: function(scope, element, attr){
			scope.$watch(attr.myUrlShare, function(value){
				if(value){
					element.val(null);
					time(function(){
						element[0].focus();
					}, 100);
						
				}
			});

			element.bind("change keyup input click", function(e){
				time(function(){
					scope.urlLink = element.val();
					scope.urlLinkError = false;
				}, 100);
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
			time(function() {
				element[0].focus();
			}, 300);
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
APP.directive('itemDisplay', ['$window', '$timeout', function($window, time) {
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
						width: "100%", 
						height: "100%",
						position: "relative",
						margin: false,
						backgroundSize: "auto, cover",
						backgroundPosition: "center"
					}).find(".image").css({
						width: "30em",
						height: false,
						marginBottom: "4%"
					}).end().find(".content").css({
						right: "1em",
						bottom: "1em"
					});
				
					setContent();
				}
				else if(value == 'multiple'){
					element.css({
						width: false, 
						height: false,
						position: "relative",
						margin: false
					}).find(".image").css({
						width: false,
						height: false,
						marginBottom: 0
					}).end().find(".content").css({
						right: "1em",
						bottom: "1em"
					});
					
					setContent();

				}
				else if(value == 'little'){
					element.css({
						width: false, 
						height: false,
						position: "relative",
						margin: false
					}).find(".image").css({
						width: "50%",
						height: "70%",
						marginBottom: "-6%"
					}).end().find(".content").css({
						right: "0.5em",
						bottom: "0.5em"
					});

					setContent();
				}
				else if(value == 'waterfall'){
					element.css({
						borderRadius: "0.5em"
					}).find(".image").css({
						width: "100%", 
						height: "100%",
						marginBottom: 0
					}).find(".photo-img").css({
						marginTop: 0,
						borderRadius: 0
					}).end().end().find(".content").css({
						right: "0.1em",
						bottom: "3.5em"
					});
				}
				else if(value == 'new'){
					$window.location.href = '/viewPhoto/new';
				}
				else if(value == 'popular'){
					$window.location.href = '/viewPhoto/popular';
				}

				setContent = function(){

					angular.element($window).off('resize');

					reuseEvent.backCoverEvent();

					element.css("borderRadius", 0)
					.find(".photo-img").css({
						marginTop: "10%",
						borderRadius: "1em"
					}).end().removeClass("water-shadow").parent().css({
						height: "100%",
						width: "100%"
					});
				}
			});
			
		}
	};
}]);


//photo menu display block
APP.directive('itemMenu', ['$window', function($window) {
	return{
		//if set true then replace original items otherwise append into items 
		replace: true,
		// A=> attribute, E=> element, C=> class name, M=> comment
		restrict: 'A',
		//scope=> $scope, element=>object itsself, attr=>attribute in tag
		link: function(scope, element, attr){
			scope.$watch(attr.itemMenu, function(value){

				scope.petName = false;

				if(value == 'single'){
					scope.photoShow = 'single_show';
				}
				else if(value == 'multiple'){
					scope.photoShow = 'multiple_show';
				}
				else if(value == 'little'){
					scope.photoShow = 'little_show';
				}
				else if(value == 'waterfall'){
					scope.photoShow = 'waterfall_show';
					scope.petName = true;
				}
			});
		}
	};
}]);


//photo menu display block
APP.directive('windowScroll', ['$window', '$http', '$compile', function($window, $http, $compile) {
	return{
		//if set true then replace original items otherwise append into items 
		replace: true,
		// A=> attribute, E=> element, C=> class name, M=> comment
		restrict: 'A',
		//scope=> $scope, element=>object itsself, attr=>attribute in tag
		link: function(scope, element, attr){

			var priority = $window.location.toString().split("/")[4],
				addNum = 200,
				reGetSize = function(){
					pageHeight = element.height(),
			 		winHeight = $window.innerHeight;
				},
				ajaxIng = false;

			angular.element($window).bind("scroll", function(value){
			 	var scrollTop = angular.element($window).scrollTop();

			 	//get body page content
				reGetSize();

				if(pageHeight <= winHeight+scrollTop+addNum && !ajaxIng){

					ajaxIng = true;

					$http({
					          method: 'POST',
						     data: {field: priority},
						     url: '/scrollNext'

				     }).success(function(data, status, headers, config){
				        	var i = 0, len = data.length, str = '';

				        	//check have any data require to show
		    				if(len == 0 || len == ""){
		    					//if no data then cancel inifinite effect
		    					angular.element($window).off();
		    				}
		    				else{
		    					for(; i < len ; i++){
			    					str += '<div class="item" data-item-display="itemList"><div class="image <%shadowClass%>"><a href=""><img class="photo-img" src="/static/img/photo/big/'+data[i].photo_filename+'"></a><div class="pet-name" ng-show="petName"><a href="">'+data[i].photo_pet_name+'</a></div></div>';
			    					str += '<div class="content" ng-hide="littleHide"><div class="menu"><button class="love" id="'+data[i].pid+'" title="喜歡這張照片" ng-click="addLove('+data[i].pid+');love'+data[i].pid+'=true" ng-disabled="love'+data[i].pid+'">';
			    					str += '<i class="heart red icon"></i><p class="love'+data[i].pid+'">'+data[i].photo_love+'</p></button><button class="comments" title="瀏覽相關評論" ><a href=""><i class="chat blue icon"></i></a><p>'+data[i].photo_comment+'</p></button>';
			    					str += '</div></div></div>';
			    				}

			    				//append to bottom
			    				element.append(str);

			    				//reset all angularjs controller event 
			    				$compile(element.contents())(scope);

			    				if(scope.photoShow == 'single_show'){
			    					scope.itemList = 'single';
								scope.itemMenuShow = 'single';
								reuseEvent.backCoverEvent();
							}
							else if(scope.photoShow == 'multiple_show'){
								scope.itemList = 'multiple';
								scope.itemMenuShow = 'multiple';
								reuseEvent.backCoverEvent();
							}
							else if(scope.photoShow == 'little_show'){
								scope.itemList = 'little';
								scope.itemMenuShow = 'little';
								reuseEvent.backCoverEvent();
							}
							else if(scope.photoShow == 'waterfall_show'){
								reuseEvent.checkWinSize();
							}
		
							ajaxIng = false;
		    				}

				     }).error(function(data, status, headers, config){
				        	deferred.reject();
				     });
				}
			});
		}
	};
}]);



