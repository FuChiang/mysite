
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
					time(function(){
						scope.photoLoad = true;
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
						height: "100%"
					}).find(".image").css({
						width: "30em",
						height: false,
						marginTop: "3.8%"
					}).end().find(".content").addClass("singleLove").end().find(".owner").addClass("singleOwner");
				
					scope.littleHide = false;
				}
				else if(value == 'multiple'){
					element.css({
						width: false, 
						height: false,
					}).find(".image").css({
						width: false,
						height: false
					}).end().find(".content").removeClass("singleLove").end().find(".owner").removeClass("singleOwner");
					
					scope.littleHide = false;
				}
				else if(value == 'little'){
					element.css({
						width: false, 
						height: "15em"
					}).find(".image").css({
						width: "50%",
						height: "70%",
						marginTop: "2%"
					});

					scope.littleHide = true;
				}
				else if(value == 'new'){
					$window.location.href = '/viewPhoto/new';
				}
				else if(value == 'popular'){
					$window.location.href = '/viewPhoto/popular';
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
				if(value == 'single'){
					scope.photoShow = 'single_show';
				}
				else if(value == 'multiple'){
					scope.photoShow = 'multiple_show';
				}
				else if(value == 'little'){
					scope.photoShow = 'little_show';
				}
			});
		}
	};
});


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
				};

			angular.element($window).bind("scroll", function(value){
			 	var scrollTop = angular.element($window).scrollTop();

			 	//get body page content
				reGetSize();

				if(pageHeight <= winHeight+scrollTop+addNum){
					$http({
					          method: 'POST',
						     data: {field: priority},
						     url: '/scrollNext'

				     }).success(function(data, status, headers, config){
				        	var i = 0, len = data.length, str = '';

				        	//check have any data require to show
		    				if(len == 0){
		    					//if no data then cancel inifinite effect
		    					angular.element($window).off();
		    				}
		    				else{
		    					for(; i < len ; i++){
			    					str += '<div class="item" data-item-display="itemList"><div class="owner" ng-hide="littleHide"><a href=""><img class="own-img" src="/static/img/member/photo/'+data[i].pic+'" title="'+data[i].account+'"></a><span>'+data[i].photo_pet_name+'</span></div>';
			    					str += '<div class="image <%shadowClass%>"><a href=""><img class="photo-img" src="/static/img/photo/big/'+data[i].photo_filename+'"></a></div><div class="content" ng-hide="littleHide">';
			    					str += '<div class="menu"><button class="love" id="'+data[i].pid+'" title="喜歡這張照片" ng-click="addLove('+data[i].pid+');love'+data[i].pid+'=true" ng-disabled="love'+data[i].pid+'">';
			    					str += '<i class="heart red icon"></i><p class="love'+data[i].pid+'">'+data[i].photo_love+'</p></button><button class="comments" title="瀏覽相關評論" ><a href=""><i class="chat blue icon"></i></a><p>'+data[i].photo_comment+'</p></button>';
			    					str += '</div></div></div>';
			    				}

			    				//append to bottom
			    				element.append(str);

			    				//restart all angularjs controller event 
			    				$compile(element.contents())(scope);

			    				if(scope.photoShow == 'single_show'){
			    					scope.itemList = 'single';
								scope.itemMenuShow = 'single';
							}
							else if(scope.photoShow == 'multiple_show'){
								scope.itemList = 'multiple';
								scope.itemMenuShow = 'multiple';
							}
							else if(scope.photoShow == 'little_show'){
								scope.itemList = 'little';
								scope.itemMenuShow = 'little';
							}

							//set background photo
							reuseEvent.backCoverEvent();
		    				}


				     }).error(function(data, status, headers, config){
				        	alert('ajax 錯誤代碼='+data);
				     });
				}
			});
		}
	};
}]);



