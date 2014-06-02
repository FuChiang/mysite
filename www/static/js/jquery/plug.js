//************************************/
/* Repeat user plug in set that make by jquery
/************************************/

(function($) {
    $.fn.extend({
    		//slider block plug in
    		SliderBlock: function(setting){
    			this.on("click", function(){
    				var default_Setting = {
			    			_direct: "right",
			    			_block: "",
			    			_speed: 200,
			    			_effect: "linear",
			    			_disabled: true,
			    			_focusEffect: false,
			    			_width: "noDefine",
			    			_height: "noDefine"

			    		},
			    		_move = 0,
				    	_block,
				    	_smargin = {},
				    	_emargin = {},
				    	_final_Setting,
				    	_button = $(this);

			    	//set default
		    		_final_Setting = $.extend(default_Setting,setting);
		    		_final_Setting._block = $("."+_final_Setting._block) || $("#"+_final_Setting._block);

		    		//use user define size 
		    		if(_final_Setting._width !== "noDefine"){
		    			//set layout width and height
			    		_final_Setting._block.css({
			    			width: _final_Setting._width
			    		});
		    		}

		    		//use user define size 
		    		if(_final_Setting._height !== "noDefine"){
		    			//set layout width and height
			    		_final_Setting._block.css({
			    			height: _final_Setting._height
			    		});
		    		}
		    		
		    		//set move distance
		    		if(_final_Setting._direct == "right" || _final_Setting._direct == "left"){
		    			_move = "-"+_final_Setting._block.width()+"px";
		    		}
		    		else{
		    			_move =  "-"+_final_Setting._block.height()+"px";
		    		}

		    		//set focus effect 
		    		_final_Setting._focusEffect = (_final_Setting._focusEffect)? "2px dotted white":"";

		    		//set hide and show of margin number
		    		_emargin[_final_Setting._direct] = _move;
		    		_smargin[_final_Setting._direct] = 0;

		    		//cancel click mthod of button tag that avoid error situation from double click 
		    		if(_final_Setting._disabled) _button.attr("disabled", true).css("border",_final_Setting._focusEffect);

		    		if(_final_Setting._block.is(":visible")){
			    			_final_Setting._block.animate(_emargin, _final_Setting._speed, _final_Setting._effect, function(){
							_final_Setting._block.css("display", "none");
							_button.attr("disabled", false).css("border","");
					});
				}
				else{
					_final_Setting._block.css(_final_Setting._direct, _move).css("display", "block").animate(_smargin, _final_Setting._speed, _final_Setting._effect, function(){
						_button.attr("disabled", false);
					});
				}

				//set close layout
				//_final_Setting._block.find(".remove").click(function(){_button.click();});

    			});	
    		}//end SliderBlock plug
    	}); //end fn.extend
})(jQuery);