//Работа с фильтром

$(function(){
	$("body").on("submit",".filter-form",function(){
		filterObj = getFormData($(this),filterObj);
		//Данные, которые будут отправляться
		//console.log(filterObj);
		var counter = 0, routeConter = 0, townCounter = 0;
		for (var key in filterObj) {
		  counter++;
		}
		if (filterObj.route){
			if ((counter == 2) && (filterObj.route.length == 1) && (filterObj.town == undefined)){
				window.location.href = "/showroom/privato-angular/#/" + filterObj.rent + "/" + filterObj.route[0];
				return false;
			}
			if ((counter == 3) && (filterObj.route.length == 1) && (filterObj.town.length = 1)){
				window.location.href = "/showroom/privato-angular/#/" + filterObj.rent + "/" + filterObj.route[0] + "/" + filterObj.town[0];
				return false;
			}
		}

		if (filterObj.town){
			var townRoute = undefined;
			if ((counter == 3) && (filterObj.route.length == undefined) && (filterObj.town.length = 1)){
				privatoData.Towns.forEach(function(town){
                    if (town.id == filterObj.town[0]){
                        townRoute = town.route;
                    }
                });
                if (townRoute != undefined){
                	window.location.href = "/showroom/privato-angular/#/" + filterObj.rent + "/" + townRoute + "/" + filterObj.town[0];
					return false;
                }
				
			}
		}

		//var filterObjJSON =  encodeURIComponent(JSON.stringify($.toJSON(filterObj)));
		var filterObjString = "";
		for (var key in filterObj){
			filterObjString = filterObjString + "?" + key + ":" + filterObj[key];
		}
		filterObjString = filterObjString.slice(1);

		window.location.href = "/showroom/privato-angular/#/" + $(this).find(".form-rent").val() + "/search/" + encodeURIComponent(filterObjString);
		return false;
	});
});

//Собираем данные формы
function getFormData(form,obj){
	obj = {};
	var inputs = form.find("input[type=text], input[type=hidden], select");
	inputs.each(function(){
		//$(this).focus();
		if ($(this).val() && ($(this).val()!=undefined) && ($(this).val()!="undefined")  && ($(this).val()!=":null")){
			if ( !$(this).hasClass("placeholder")){
				if ($(this).hasClass("intData")){
					obj[$(this).attr('name')] = parseInt($(this).val());
				}
				else{
					obj[$(this).attr('name')] = $(this).val();
				}
			}
		}
	});	
	var checkboxes = form.find("input[type=checkbox]");
	checkboxes.each(function(){
		if ($(this).prop("checked")){
			obj[$(this).attr('name')] = "checked";
		}
	});
	return obj;
}