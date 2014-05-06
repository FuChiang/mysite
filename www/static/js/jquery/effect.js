
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
		$jq_add_block = $jq(".main-add-in-block");

	$jq("body").css("overflow", "hidden");

	//login set
	$jq_login.SliderBlock({
		_block: "main-sign-in-block",
		_direct: "right"
	});

	//register set
	$jq_add.SliderBlock({
		_block: "main-add-in-block",
		_direct: "left"

	});

	//block close and open controller
	$jq(".remove").click(function(){
		($jq_add_block.is(":visible"))
			?$jq_add.click():$jq_login.click();
	});

	//add-check-bar
	$jq('.ui.checkbox').checkbox();

	//get csrf value
	//$jq("input[name='csrfmiddlewaretoken']").val();


}  







                       



