
//user add customer
APP.directive('ngAddShows', function() {
	return{
		//if set true then replace original items otherwise append into items 
		replace: true,
		// A=> attribute, E=> element, C=> class name, M=> comment
		restrict: 'A',
		//scope=> $scope, element=>object itsself, attr=>attribute in tag
		link: function(scope, element, attr){
			scope.$watch(attr.ngAddShows, function(value){
				(value)
					?
						element.removeClass("push")
					:
						element.addClass("push");		
						
			});
		}

	};

});

//user login customer
APP.directive('ngLoginShows', function() {
	return{
		//if set true then replace original items otherwise append into items 
		replace: true,
		// A=> attribute, E=> element, C=> class name, M=> comment
		restrict: 'A',
		//scope=> $scope, element=>object itsself, attr=>attribute in tag
		link: function(scope, element, attr){
			scope.$watch(attr.ngLoginShows, function(value){
				(value)
					?
						element.removeClass("push")
					:
						element.addClass("push");	
						
			});
		}

	};

});

