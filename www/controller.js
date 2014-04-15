

var students = function($scope){
	$scope.newItem = "";
	$scope.people = [{name:'Tom', isFinish:false}];
	$scope.add = function(){
		if(this.newItem){
			this.people.push({name:this.newItem, isFinish:false});
			this.newItem = "";
		}
	}
	$scope.remove = function(item){
		item.isFinish = true;
	}
}


var Test = function($scope){
	$scope.value = 'None';
}

var selectOption = function($scope){
	$scope.option = 
	[
		{
			id:01,
			color:'blue',
			type:'T-shirt'
		},
		{
			id:02,
			color:'red',
			type:'Pants'
		}
	];
}
var templateTest = function($scope){
	$scope.a = 'hello';
}

var search = function($scope){
	$scope.category = ['red', 'blue', 'green'];
}
