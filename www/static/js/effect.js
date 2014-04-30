
//define originl jquery globle variable from $ to $jq
//set angularjs app by myself
var $jq = $.noConflict(), 
	myApp = angular.module('myApp', []);


//change angularjs variable sign from {{ }} to << >>
myApp.config(function($interpolateProvider){
	$interpolateProvider.startSymbol('<<');
	$interpolateProvider.endSymbol('>>');
}); 


//偵測視窗大小
$jq(window ).resize(function() {
	$jq(".win-size").html('width:'+window.innerWidth);
});

var mainPage = function(){

	var backbgSpeed = 25000; //main page background images speed

	if(window.innerWidth < 600){
		$jq("body").css("overflow-y", "hidden")
		//main index background play
		//$jq("body").css("overflow-y", "hidden").find(".fullscreen-main").animate({marginTop: "-28em"},backbgSpeed);
	}
}  



                       



