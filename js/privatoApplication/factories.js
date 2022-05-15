'use strict';

privatoApplication.factory('PrivatoDataFactory',['$http', function($http){ 
        var obj = {};        
        
        //Получение списка домов
        obj.GetHousesList = function(){
                    
            var methodAddress = "ajax/housesList";

            $("#showObjectList").addClass("loading");
            
            return $http({
                    url: methodAddress,
                    method: "POST",
                    data: {}
                });
		};

        //Получение списка избранного
        obj.GetChosen = function(){
                    
            var methodAddress = "ajax/housesList";

            $("#showObjectList").addClass("loading");
            
            return $http({
                    url: methodAddress,
                    method: "POST",
                    data: {}
                });
        };

        //Получение данных дома
        obj.GetHouseData = function(){
                    
            var methodAddress = "ajax/houseData";

            $("#showObject").addClass("loading");
            
            return $http({
                    url: methodAddress,
                    method: "POST",
                    data: {}
                });
        };

        //Получение списка посёлков
        obj.GetSettlementsList = function(){
                    
            var methodAddress = "ajax/settlementsList";

            $("#showObject").addClass("loading");
            
            return $http({
                    url: methodAddress,
                    method: "POST",
                    data: {}
                });
        };

        //Получение данных посёлка
        obj.GetSettlementData = function(){

            var methodAddress = "ajax/settlementData";

            $("#showObject").addClass("loading");
            
            return $http({
                    url: methodAddress,
                    method: "POST",
                    data: {}
                });
        };


    return obj;

}])

.factory('PrivatoUserFactory', [ function(){

	return {
		//'setUserData': function(userData){

		//},
		//'getUserData': function(){
		//	return tntUser;
		//}
	}

	
}]);