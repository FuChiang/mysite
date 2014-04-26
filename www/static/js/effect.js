

var $jq = $.noConflict(), //define originl jquery globle variable from $ to $jq
	myApp = angular.module('myApp', []); //set angularjs app by myself

myApp.config(function($interpolateProvider){
	$interpolateProvider.startSymbol('<<');
	$interpolateProvider.endSymbol('>>');
}); 

//偵測視窗大小
$jq(window ).resize(function() {
	$jq(".win-size").html('width:'+window.innerWidth);
	//window.innerHeight;
});

var mainPage = function(){

	var picNum = 5; //main page background images sum 
	
	$jq(".main-back-img").css("background-image", "url(/static/img/background/index_" + Math.ceil(Math.random()*picNum) + ".jpg)");

}  



                       



