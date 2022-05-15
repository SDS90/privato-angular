$( document ).ready(function() {



	//Высота окна
	setSizes();
	$(window).resize(function(){
		setSizes();

		if (($(".main-sidebar-wrapper").css("display") != "none")){
            $(".headtext").css("min-height",$(".headtext").closest(".row").find(".sidebar1").height())
        } else {
        	$(".headtext").css("min-height",0)
        }
	});

	$("body").on("click","#form_rash :input",function() {
	  	$("label[for='" + this.id + "']").toggleClass("asel");
	});

	/*$("body").on("click",".link-block",function(){
		var url = $(this).data("href");
		window.location.href = url;
		return false;
	});

	$("body").on("touchend",".link-block",function(event){
		event.preventDefault();
		$(this).trigger("click");
	})*/
	
   // Корректировка места заголовка
	
   $("#objh1").css("display","none");
   $("#h1").html($("#objh1").html());
   $("#objh1").html('');
	
	
   // Фильтр на главной
   $("body").on("click",".but_buy_button",function() {
   	    $(this).addClass('r_active');
	    $(this).closest(".sidebar1").find(".but_rent_button").removeClass("r_active");
		$(this).closest(".sidebar1").find(".form-rent").val("buy");
		$(this).closest(".sidebar1").find(".mln").html("млн.");	
   });
   
   $("body").on("click",".but_rent_button",function() {
   	    $(this).addClass("r_active");
	    $(this).closest(".sidebar1").find(".but_buy_button").removeClass("r_active");
		$(this).closest(".sidebar1").find(".form-rent").val("rent");
		$(this).closest(".sidebar1").find(".mln").html("тыс.");	
   });

   //Фильтр - список направлений
   $("body").on("change",".bootstrap-select .select-route",function(e){

   		var optionsArray = $(e.target).val();

   		$(this).closest("fieldset").find("select.select-town").val("");
   		$(this).closest("fieldset").find("select.select-town").trigger("change");

   		if ( (optionsArray != null) || (optionsArray != undefined) ) {

   			//Нас пункты
	   		$(this).closest("fieldset").find(".bootstrap-select.select-town li").hide();
	   		$(this).closest("fieldset").find(".bootstrap-select.select-town li a").each(function(){
	   			var $this = $(this);
	   			optionsArray.forEach(function(option){
	   				if ($this.hasClass("route-id-" + option)){
	   					 $this.closest("li").show();
	   				}
	   			})
	   		});

	   		//Посёлки
	   		$(this).closest("fieldset").find(".bootstrap-select.select-settlements li").hide();

	   		$(this).closest("fieldset").find(".bootstrap-select.select-settlements li a").each(function(){
	   			var $this = $(this);
	   			optionsArray.forEach(function(option){
	   				if ($this.hasClass("route-id-" + option)){
	   					 $this.closest("li").show();
	   				}
	   			})
	   		});
	   	} else {
	   		$(this).closest("fieldset").find(".bootstrap-select.select-town li").show();
	   		$(this).closest("fieldset").find(".bootstrap-select.select-settlements li").show();
	   	}
   });


	//Фильтр - список нас.пунктов
	$("body").on("change",".bootstrap-select .select-town",function(e){
   		var optionsArray = $(e.target).val();

   		if ( (optionsArray != null) && (optionsArray != undefined) ) {

	   		//Посёлки
	   		$(this).closest("fieldset").find(".bootstrap-select.select-settlements li").hide();

	   		$(this).closest("fieldset").find(".bootstrap-select.select-settlements li a").each(function(){
	   			var $this = $(this);
	   			optionsArray.forEach(function(option){
	   				if ($this.hasClass("town-id-" + option)){
	   					 $this.closest("li").show();
	   				}
	   			})
	   		});
	   	} else {
	   		$(this).closest("fieldset").find(".bootstrap-select.select-settlements li").show();

	   		var routesArray = $(this).closest("fieldset").find("select.select-route").val();

	   		if ( (routesArray != null) && (routesArray != undefined) ) {

	   			//Нас пункты
		   		$(this).closest("fieldset").find(".bootstrap-select.select-town li").hide();
		   		$(this).closest("fieldset").find(".bootstrap-select.select-town li a").each(function(){
		   			var $this = $(this);
		   			routesArray.forEach(function(option){
		   				if ($this.hasClass("route-id-" + option)){
		   					 $this.closest("li").show();
		   				}
		   			})
		   		});

		   		//Посёлки
		   		$(this).closest("fieldset").find(".bootstrap-select.select-settlements li").hide();

		   		$(this).closest("fieldset").find(".bootstrap-select.select-settlements li a").each(function(){
		   			var $this = $(this);
		   			routesArray.forEach(function(option){
		   				if ($this.hasClass("route-id-" + option)){
		   					 $this.closest("li").show();
		   				}
		   			})
		   		});
		   	} else {
		   		$(this).closest("fieldset").find(".bootstrap-select.select-town li").show();
		   		$(this).closest("fieldset").find(".bootstrap-select.select-settlements li").show();
		   	}
	   	}
   });


	//Фильтр - список направлений (мобильный)
	$("body").on("change",".mobile-select select.select-route",function(e){
		var optionVal = $(e.target).val();
		var selectTownsHTML = '<option value="0" selected>Населённый пункт</option>';
	   	var selectSettlementsHTML = '<option value="0" selected>Коттеджный посёлок</option>';

		if ( optionVal == "undefined" ) {
	   		privatoData.Towns.forEach(function(town){
	   			selectTownsHTML = selectTownsHTML + '<option value="' + town.id + '">' + town.nameRus + '</option>'
	   		});
	   		$(this).closest("fieldset").find("select.select-town").html("").html(selectTownsHTML);

	   		privatoData.Settlements.forEach(function(settlement){
	   			selectSettlementsHTML = selectSettlementsHTML + '<option value="' + settlement.id + '">' + settlement.nameRus + '</option>';
	   		});
	   		$(this).closest("fieldset").find("select.select-settlements").html("").html(selectSettlementsHTML);
		} else {
			//Нас пункты
	   		privatoData.Towns.forEach(function(town){
	   			if (town.route == optionVal){
	   				selectTownsHTML = selectTownsHTML + '<option value="' + town.id + '">' + town.nameRus + '</option>'
	   			}
	   		});

	   		$(this).closest("fieldset").find("select.select-town").html("").html(selectTownsHTML);


	   		//Посёлки
	   		privatoData.Settlements.forEach(function(settlement){
	   			if (settlement.routeID == optionVal){
	   				selectSettlementsHTML = selectSettlementsHTML + '<option value="' + settlement.id + '">' + settlement.nameRus + '</option>';
	   			}
	   		});

	   		$(this).closest("fieldset").find("select.select-settlements").html("").html(selectSettlementsHTML);
		}
	})

	//Фильтр - список нас.пунктов (мобильный)
	$("body").on("change",".mobile-select select.select-town",function(e){
		var optionVal = $(e.target).val();
		var selectTownsHTML = '<option value="0" selected>Населённый пункт</option>';
	   	var selectSettlementsHTML = '<option value="0" selected>Коттеджный посёлок</option>';


		if ( optionVal == "undefined" ) {

			var routesVal = $(this).closest("fieldset").find("select.select-route").val();

			if ( routesVal == "undefined" ) {

	   			privatoData.Towns.forEach(function(town){
	   				selectTownsHTML = selectTownsHTML + '<option value="' + town.id + '">' + town.nameRus + '</option>'
		   		});
		   		$(this).closest("fieldset").find("select.select-town").html("").html(selectTownsHTML);

		   		privatoData.Settlements.forEach(function(settlement){
		   			selectSettlementsHTML = selectSettlementsHTML + '<option value="' + settlement.id + '">' + settlement.nameRus + '</option>';
		   		});
		   		$(this).closest("fieldset").find("select.select-settlements").html("").html(selectSettlementsHTML);

			} else {
				//Нас пункты
				privatoData.Towns.forEach(function(town){
		   			if (town.route == routesVal){
		   				selectTownsHTML = selectTownsHTML + '<option value="' + town.id + '">' + town.nameRus + '</option>'
		   			}
		   		});
		   		$(this).closest("fieldset").find("select.select-town").html("").html(selectTownsHTML);

		   		//Посёлки
				privatoData.Settlements.forEach(function(settlement){
		   			if (settlement.routeID == routesVal){
		   				selectSettlementsHTML = selectSettlementsHTML + '<option value="' + settlement.id + '">' + settlement.nameRus + '</option>';
		   			}
		   		});
		   		$(this).closest("fieldset").find("select.select-settlements").html("").html(selectSettlementsHTML);
			}
		} else {

			//Посёлки
	   		privatoData.Settlements.forEach(function(settlement){
	   			if (settlement.townID == optionVal){
	   				selectSettlementsHTML = selectSettlementsHTML + '<option value="' + settlement.id + '">' + settlement.nameRus + '</option>';
	   			}
	   		});
	   		$(this).closest("fieldset").find("select.select-settlements").html("").html(selectSettlementsHTML);
		}
	})

   // переход по url в селектах
   
    $('body').on("click","#dynamic_select",function() {
			window.location = $(':selected',this).attr('href')
		  });
	$('body').on("click","#dynamic_select1",function() {
			window.location = $(':selected',this).attr('href')
	});
	
	
	// Собственникам
	$("body").on("click",".ow_more", function (event) {
		//отменяем стандартную обработку нажатия по ссылке
		event.preventDefault();

		//забираем идентификатор бока с атрибута href
		var id  = $(this).attr('href'),

		//узнаем высоту от начала страницы до блока на который ссылается якорь
		top = $(id).offset().top;
		
		//анимируем переход на расстояние - top за 1500 мс
		$('body,html').animate({scrollTop: top}, 1500);
		$(this).css('color','#1a1a1a');
		
	});
	$("body").on("hover",".ow_more", function (event) {
		$(this).css('color','#757575');
	}, function () {
		$(this).css('color','#1a1a1a');
	});
	
	
// расширенный поиск	
	$("body").on("click",".link_rash",function() {
		$(this).closest(".sidebar1").find(".form_rash").slideToggle(200);	
		setTimeout(function(){setSizes()},200);
		return false;
	});

	$("body").on("click","a.show-order", function(event){ // лoвим клик пo ссылки с id="go"
        event.preventDefault(); // выключaем стaндaртную рoль элементa
        $('#overlay').fadeIn(400, // снaчaлa плaвнo пoкaзывaем темную пoдлoжку
          function(){ // пoсле выпoлнения предъидущей aнимaции
            $('#modal_form') 
              .css('display', 'block') // убирaем у мoдaльнoгo oкнa display: none;
              .animate({opacity: 1, top: '50%'}, 200); // плaвнo прибaвляем прoзрaчнoсть oднoвременнo сo съезжaнием вниз
        });
    });
    /* Зaкрытие мoдaльнoгo oкнa, тут делaем тo же сaмoе нo в oбрaтнoм пoрядке */
    $("body").on("click", "#modal_close, #overlay", function(){ // лoвим клик пo крестику или пoдлoжке
        $('#modal_form')
            .animate({opacity: 0, top: '45%'}, 200,  // плaвнo меняем прoзрaчнoсть нa 0 и oднoвременнo двигaем oкнo вверх
                function(){ // пoсле aнимaции
                    $(this).css('display', 'none'); // делaем ему display: none;
                    $('#overlay').fadeOut(400); // скрывaем пoдлoжку
                }
            );
    });

    //Выползающие меню и фильтр
    $("body").on("click",".navbar-toggle",function(){
    	//if ($(event.target).closest(".navbar-toggle-logo")){return false;}
    	if ($(".navbar-collapse").hasClass("opened")){
    		$(".navbar-collapse").removeClass("opened");
    		setTimeout(function(){$("body").removeClass("opened");},400);
    	} else {
    		$("body").addClass("opened");
    		$(".navbar-collapse").addClass("opened");
    	}
    	if ($(".nav-filter").hasClass("opened")){
    		$(".nav-filter").removeClass("opened");
    	}
    	return false;
    });

    $("body").on("click",".navbar-search",function(){
    	if ($(".nav-filter").hasClass("opened")){
    		$(".nav-filter").removeClass("opened");
    		setTimeout(function(){$("body").removeClass("opened");},400);
    	} else {
    		$("body").addClass("opened");
    		$(".nav-filter").addClass("opened");
    	}
    	if ($(".navbar-collapse").hasClass("opened")){
    		$(".navbar-collapse").removeClass("opened");
    	}
    	return false;
    });

   /* $.fn.swipe = function( callback ) {
	    var touchDown = false,
	      originalPosition = null,
	      $el = $( this );

	    function swipeInfo( event ) {
	      var x = event.originalEvent.pageX,
	        y = event.originalEvent.pageY,
	        dx, dy;

	      dx = ( x > originalPosition.x ) ? "right" : "left";
	      dy = ( y > originalPosition.y ) ? "down" : "up";

	      return {
	        direction: {
	          x: dx,
	          y: dy
	        },
	        offset: {
	          x: x - originalPosition.x,
	          y: originalPosition.y - y
	        }
	      };
	    }

	    $el.on( "touchstart mousedown", function ( event ) {
	      touchDown = true;
	      originalPosition = {
	        x: event.originalEvent.pageX,
	        y: event.originalEvent.pageY
	      };
	    } );

	    $el.on( "touchmove mousemove", function ( event ) {
	      if ( !touchDown ) { return;}
	      var info = swipeInfo( event );
	      callback( info.direction, info.offset );
	    } );


	    $el.on( "touchend mouseup", function () {
	      touchDown = false;
	      originalPosition = null;
	    } );

	    
	    return true;
	  };*/

    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
	   	$("body").swipe( {
	   		threshold:0,
	   		excludedElements:$.fn.swipe.defaults.excludedElements,
	    	//Generic swipe handler for all directions
			swipeLeft:function(event, direction, distance, duration, fingerCount, fingerData) {
				//if (($(".navbar-toggle").css("display") != "none")){

					if ($("body").hasClass("opened")){
						$(".substrate-block").trigger("click");
					} else{
						$(".navbar-search").trigger("click");
					}
	      				
	      		//}
			},
			swipeRight:function(event, direction, distance, duration, fingerCount, fingerData) {
				//if (($(".navbar-toggle").css("display") != "none")){
					if ($("body").hasClass("opened")){
						$(".substrate-block").trigger("click");
					} else{
	      				$(".navbar-toggle").trigger("click"); 
	      			} 
				//}
	    	}
	  	});


		/*$("body").swipe(function( direction, offset ) {
		 // console.log( "Moving", direction.x, "and", direction.y );
		 // console.log( "Touch moved by", offset.x, "horizontally and", offset.y, "vertically" );   

			if (offset.x > 100){
			  	if ($("body").hasClass("opened")){
					$(".substrate-block").trigger("click");
				} else{
					$(".navbar-search").trigger("click");
				}
			} 

			if (offset.x < -100){
			  	if ($("body").hasClass("opened")){
					$(".substrate-block").trigger("click");
				} else{
      				$(".navbar-toggle").trigger("click"); 
      			}
			} 
		});*/


	}

    //Вверх
    $("body").on("click",".ontop",function(){
    	$('html, body').stop().animate({
				'scrollTop': 0
			}, 400, 'swing');
    	return false;
    });
	
    //Переключатели в поиске посёлка
	$("body").on("click",".sett_menu a",function(){
		if ($(this).hasClass("disabled")){
			return false;
		} else {
			$(".settlement-houses-list.show-block").removeClass("show-block");
			$(".sett_menu li.active").removeClass("active");
			$(this).closest("li").addClass("active");
			$(".settlement-houses-list").hide();
			$($(this).attr("href")).addClass("show-block").show();
			checkGallery();
		}
		
		return false;
	});

	$(".substrate-block").on("click touchstart",function(event){
		if ($(event.target).closest(".navbar-collapse, .nav-filter, .navbar-wrapper, .navbar-toggle").length) return;
		closeMenu();
		event.stopPropagation();
	});

	//Избранное
});

function checkGallery(){
    $(".settlement-houses-list.show-block .galleria-wrapper").each(function(){
        //Активируем галерею
        var $this =  $(this);
        var totalImages = $this.find("img").length;
        var imagesLoaded = 0;

        if (totalImages == 1){
            $this.closest(".object-gallery").find(".fa").hide();
        }http://ws-des.com/showroom/privato-angular/#/sale/object/3311

        var onImgLoad = function(object, callback){
            object.each(function(){
                if (this.complete || /*for IE 10-*/ $(this).height() > 0) {
                    callback.apply(this);
                }
                else {
                    $(this).on('load', function(){
                        callback.apply(this);
                    });
                }
            });
        };

        onImgLoad($this.find("img"), function(){
            imagesLoaded++;
            if (imagesLoaded == totalImages){
            	//$this.removeClass("loading");
                loadGallery($this);
                //$("#showObjectList").removeClass("loading"); 
                $(window).resize(function(){
                    loadGallery($this);
                });
            }
        });

        function loadGallery($this){

            var galleryHeight = $this.find("img").eq(0).height();
            var length = $this.find("img").length;

            $this.cycle("destroy");
            $this.css({"width":"","height":"", "position":"relative"});
            $this.find(".galleria").css({"width":"","height":"","position":"relative"});

            $this.find("img").each(function(){

                if ( ($(this).height() < galleryHeight) ){
                    galleryHeight = $(this).height();
                }
            });

            $this.find("img").each(function(){
            	if (  $(this).css("margin-top") < 0 ){
            		//$(this).css("margin-top",(galleryHeight - $(this).height()))
            	}
            }); 

            $this.cycle({
                fx: 'fade',
                speed: 200, 
                timeout: 0,
                prev: $this.closest(".object-gallery").find(".prev"),
                next: $this.closest(".object-gallery").find(".next"),
                after:function(currSlideElement, nextSlideElement){
                    $this.closest(".object-gallery").find(".counter").text(parseInt($(nextSlideElement).index() + 1) + " из " + length);
                }
            });  
        }
    })
}

function setSizes(){
	$("#viewBlock").css("min-height",$(window).height() - $("footer").outerHeight(true));

	var filterHeight = $(window).height();
	var menuHeight = $(window).height();

	if ($(".nav-filter fieldset").outerHeight() >= filterHeight){
		$(".nav-filter fieldset").css("max-height",filterHeight);
		$(".nav-filter fieldset").addClass("overflow");
	} else {
		$(".nav-filter fieldset").css("max-height","none");
		$(".nav-filter fieldset").removeClass("overflow");
	}

	if ($(".navbar-collapse").outerHeight() >= menuHeight){
		$(".navbar-collapse").css("max-height",menuHeight);
		$(".navbar-collapse").addClass("overflow");
	} else {
		$(".navbar-collapse").css("max-height","none");
		$(".navbar-collapse").removeClass("overflow");
	}
	
	/*if (($(".navbar-toggle").css("display") != "none")){
		$(".navbar-collapse, .nav-filter, body").removeClass("opened");
	}*/
}

function RedirectToPage(element){
	document.location = $(element).data("href");
}

function closeMenu(){
	$(".navbar-collapse, .nav-filter").removeClass("opened");
    setTimeout(function(){$("body").removeClass("opened");},400);
}


 // Поселок: продажа / аренда / участки
 
 function sett_content(cat,id) {
	$( document ).ready(function() {			  
 

	  
			 $.ajax({
				type:'GET',
				url: "/sett_content.php",
				cache: true,
				data:{'cat':cat, 'id':id}, //параметры запроса
				success: function(html){
				  $("#sett_content").html(html);
				}
			  });
	  
	  	  for(var m = 1; m < 4; m++) {
			 if (m==cat)
				$('#cat'+m).addClass("active");
			 else
				$('#cat'+m).removeClass("active");
		  }
			  return false;
			  
  });
}
   


function addnote(id,cat,action,itm,favpage) {
	$( document ).ready(function() {	
			   $.ajax({
				  type:'GET',
				  url: "/addnote.php",
				  cache: false,
        		  crossDomain: true,
  				  dataType: 'json',
				  data:{'id':id, 'cat':cat, 'action':action,'item':itm,'favpage':favpage},//параметры запроса
				  success: function(data){
		
 					//	alert(data.favlink);
					  $("#total_fav").html(data.total);
					  $("#like_"+id).html(data.like);
					//  $("#ids").val(data.ids);
					  $("#favlink").html(data.favlink);
					 
				  }
				});
				
				if (action=="del") { 
					$('#obj_'+id).remove();
					$('#naj_c').html(($('#naj_c').html()-1)); 
				}
				
				return false;
});

}

/* актуальные селекты */



function aselect() {	
	
	//console.log($('#route').val());
	// 		route     town		

			   $.ajax({
				  type:'POST',
				  url: "/aselect.php",
				  cache: false,
        		  crossDomain: true,
  				  dataType: 'json',
				  data:{'route':$('#route').val(), 'town':$('#town').val()},//параметры запроса
				  success: function(data){
		
					 // $("#route").html(data.route);
					  $("#town").html(data.town).trigger('chosen:updated');
					  $("#settl").html(data.settl).trigger('chosen:updated');
					//$("#res").html(data.res);
 					// $('.chosen-select').trigger('chosen:updated');
					 
					 
				  }
				});
				
  
				return false;

}


$(function() {
    $('#route').change(function() {
		aselect();
    });
	$('#town').change(function() {
		aselect();
    }); 
});

	/*
// слайдер фото в каталоге
$( document ).ready(function() {


$(".fotorama_slider").hover(
  function() {
    
	var ft = $(this);
	
	ft.addClass("fotorama_slider2");
	ft.removeClass("fotorama_slider");
	
	//alert($(this).data('id'));
	 $.ajax({
	  type:'GET',
	  url: "/dopfoto.php",
	  cache: false,
	  data:{'id':$(this).data('id')},//параметры запроса
	  success: function(html){
	
		 ft.html(html);
		 
	  }
	  });
  
  
  }, function() {
   
	return false;
  }
);

return false;
});
*/