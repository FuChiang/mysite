
//define originl jquery globle variable from $ to $jq
var $jq = $.noConflict();

//dynamic observer window size
$jq(window ).resize(function() {
	$jq(".win-size").html('width:'+window.innerWidth);
});



/************************************/
/*main index set*/
/************************************/
var mainPage = function(){

	var $jq_add = $jq(".add-button"),
		$jq_login = $jq(".login-button"),
		$jq_add_input = $jq(".add-account");

	//hide scrollbar
	$jq("body").css("overflow-x", "hidden");


	//login set
	$jq_login.SliderBlock({
		_block: "main-sign-in-block",
		_direct: "left",
		_focusEffect: false
	});

	//register set
	$jq_add.SliderBlock({
		_block: "main-add-in-block",
		_direct: "left",
		_focusEffect: false

	});

	//focus pointer in input filed
	//$jq_add.on("click", function(){
	//	$jq_add_input.focus();
	//});

/*
	//disable another button event that can avoid error by double click
	$jq_add.on("click", function(){
		$jq(".add-account").focus();
		($jq_login.css("opacity") == 1)
			?
				$jq_login.css("opacity",0.5)
			:
				$jq_login.css("opacity",1);
	
	});
	$jq_login.on("click", function(){
		($jq_add.css("opacity") == 1)
			?
				$jq_add.css("opacity",0.5)
			:
				$jq_add.css("opacity",1);
	
	});
*/
	//add-check-bar
	$jq('.ui.checkbox').checkbox();

}  







                       



