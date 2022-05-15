'use strict';

//=============== Контроллеры

//Главная
privatoApplication.controller('MainCtrl', ['$scope','PrivatoDataFactory', function($scope, PrivatoDataFactory){
        window.document.title = "Privato Estate - Главная";

        $('html, body').scrollTop(0);
        $(".navbar-nav a").removeClass("active");
        closeMenu();

        console.log("<!-- Основной объектв в HEAD сайта -->");
        console.log(privatoData);
        console.log("<!-- / --> ");

        $scope.privatoData = privatoData;

        //Стилизуем фильтр
        $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
            $('.selectpicker').each(function () {
                $(this).selectpicker('destroy');
                $(this).selectpicker();
            });
        });

        $(window).trigger("resize");

}])

//Списковая
.controller('ListCtrl', ['$scope','PrivatoDataFactory', function($scope, PrivatoDataFactory){

        $('html, body').scrollTop(0);
        $scope.errorShow = false;
        $("#showObjectList").addClass("loading");
        closeMenu();

        $scope.privatoData = privatoData;
        pageURL = window.location.hash;
        var url = window.location.hash.split('/');

        $scope.filterHouseShow = true;
        $scope.settlementBlockClass = "";

        $scope.pageHeader = "";
        $scope.data = {};
        var formObj = {};

        $(".navbar-nav a").removeClass("active");
        $(".navbar-nav a[href='#/" + url[1] + "']").addClass("active");
        

        //Стилизуем фильтр
        $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {

            if (url[2] != "search"){

                $("select option").each(function(){
                    $(this).attr("selected",false);
                });

                $("select[name=route] option").each(function(){
                    if ($(this).val() == url[2]){
                        $(this).attr("selected","selected");
                    }
                });

                $("select[name=town] option").each(function(){
                    if ($(this).val() == url[3]){
                        $(this).attr("selected","selected");
                    }
                });

                $('.selectpicker').each(function () {
                    $(this).selectpicker('destroy');
                    $(this).selectpicker();
                });

            } else {
                //formObj = JSON.parse(JSON.parse(decodeURIComponent(url[3])));

                //Распарсим ссылку
                decodeURIComponent(url[3]).split('?').forEach(function(obj){
                    var objData = obj.split(':');
                    objData[1] = objData[1].split(',');
                    formObj[objData[0]] = objData[1];
                });

                $("select option").each(function(){
                    $(this).attr("selected",false);
                });

                for (var key in formObj){

                    if (typeof(formObj[key]) == "object"){

                        formObj[key].forEach(function(name){
                            $("select[name=" + key + "] option").each(function(){
                                if ($(this).val() == name){
                                    $(this).attr("selected","selected");
                                }
                            });
                        });

                        $(".checkbox[name=" + key + "]").each(function(){
                            $(this).prop("checked",true);
                        });

                        $("input[name=" + key + "]").each(function(){
                            $(this).val(formObj[key][0]);
                        });
                    }
                    
                }

                $('.selectpicker').each(function () {
                    $(this).selectpicker('destroy');
                    $(this).selectpicker();
                });                
            }

            //Определяем, что за список
            switch (url[1]) {
                //Продажа
                case 'sale':{
                    $(".form-rent").val("sale");
                    $scope.pageHeader = "Продажа загородной недвижимости";
                    $scope.href= "#/sale/object/";
                    privatoData.Towns.forEach(function(town){
                        if (town.id == url[3]){
                            $scope.pageHeader = "Продажа загородной недвижимости в деревне " + town.nameRus;
                        }
                    });
                    window.document.title = $scope.pageHeader;   

                    //Данные для запроса
                    console.log(filterObj)
                    $scope.data = filterObj; //getFormData($(".filter-form"),filterObj);
                    console.log("<!-- Отправка данных для запроса списка домов (если ничего не выбрано - уходит пустой запрос) -->");
                    console.log($scope.data);
                    console.log("<!-- / --> ");

                    //Запрос на получение списка домов
                    $scope.errorShow = false;
                    PrivatoDataFactory.GetHousesList($scope.data).then(handleRequest, handleErrorRequest);            
                    break;
                }
                //Аренда
                case 'rent':{
                    $(".form-rent").val("rent");
                    $scope.pageHeader = "Аренда загородной недвижимости";
                    $scope.href= "#/rent/object/";
                    privatoData.Towns.forEach(function(town){
                        if (town.id == url[3]){
                            $scope.pageHeader = "Аренда загородной недвижимости в деревне " + town.nameRus;
                        }
                    });
                    window.document.title = $scope.pageHeader;  

                    //Данные для запроса
                    $scope.data = filterObj; //getFormData($(".filter-form"),filterObj);
                    console.log("<!-- Отправка данных для запроса списка домов (если ничего не выбрано - уходит пустой запрос) -->");
                    console.log($scope.data);
                    console.log("<!-- / --> ");

                    //Запрос на получение списка домов
                    $scope.errorShow = false;
                    PrivatoDataFactory.GetHousesList($scope.data).then(handleRequest, handleErrorRequest);
                    break;
                }
                //Избранное
                case 'chosen':{
                    $(".form-rent").val("sale");
                    $scope.pageHeader = "Избранное";
                    window.document.title = $scope.pageHeader;  

                    console.log("<!-- Идёт запрос на получение списка избранного по userID -->");

                    //Запрос на получение списка домов
                    $scope.errorShow = false;
                    PrivatoDataFactory.GetChosen($scope.data).then(handleRequest, handleErrorRequest);
                    break;
                }
                //Посёлки
                case 'settlements':{
                    $(".form-rent").val("settlements");
                    $scope.pageHeader = "Коттеджные посёлки";
                    window.document.title = $scope.pageHeader;                    
                    $scope.settlementBlockClass = "list_pos";
                    $scope.filterHouseShow = false;
                    $scope.href= "#/settlement/";

                    //Данные для запроса
                    $scope.data = filterObj; //getFormData($(".filter-form"),filterObj);
                    console.log("<!-- Отправка данных для запроса списка посёлков (если ничего не выбрано - уходит пустой запрос) -->");
                    console.log($scope.data);
                    console.log("<!-- / --> ");

                    //Запрос на получение списка посёлков
                    $scope.errorShow = false;
                    PrivatoDataFactory.GetSettlementsList($scope.data).then(handleRequest, handleErrorRequest);
                    
                    break;
                }
                default :{
                    window.location.href = "/showroom/privato-angular/";
                    //Тут будет редирект на 404
                    break;
                }
            }
                
        });
    
        //Обработка ответа
        var handleRequest = function(data){
            $scope.errorShow = false;
            console.log("<!-- Ответ на запрос (список домов или посёлков) -->");
            console.log(data.data)
            console.log("<!-- / --> ");

            $scope.objectList = data.data;
            $scope.objectList.object.forEach(function(object){
                object.dollarPrice = String(object.dollarPrice).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
                if (object.chosen){
                    object.chosenClass="glyphicon-heart";
                    object.chosenTitle="Убрать из избранного";
                } else {
                    object.chosenClass="glyphicon-heart-empty";
                    object.chosenTitle="Добавить в избранное";
                }

                if (url[1] == "settlements"){
                    object.href = "#/settlement/" + object.id;
                } else {
                    object.href = "#/" + object.advType + "/object/" + object.id;
                }
            });

            $("#showObjectList").removeClass("loading");

            //Открываем страницу на определённом месте
            //var scrolltop = $("#acont").offset().top;
            //$("html,body").scrollTop(scrolltop);

        }

        //Обработка ошибки
        var handleErrorRequest = function(error){
            console.log("<!-- Ответ на запрос (список домов), ошибка -->");
            console.log(error)
            console.log("<!-- / --> ");
            $scope.errorShow = true;
            $scope.errorText = "По Вашему запросу ничего не найдено."
        }

        $scope.$on('ngRepeatHousesFinished', function(ngRepeatFinishedEvent) {

            if (url[1] == "settlements") {
                $("#showObjectList").removeClass("loading");
            } else {
                $(".galleria-wrapper").each(function(){
                    //Активируем галерею
                    var $this =  $(this);
                    var totalImages = $this.find("img").length;
                    var imagesLoaded = 0;

                    $this.addClass("load");

                    if (totalImages == 1){
                        $this.closest(".object-gallery").find(".fa").hide();
                    }

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
                            $this.removeClass("load");
                            loadGallery($this);
                            //$("#showObjectList").removeClass("loading"); 
                            $(window).resize(function(){
                                loadGallery($this);
                            });
                        }
                    });

                    function loadGallery($this){

                        $this.cycle("destroy");
                        $this.css({"width":"","height":"", "position":"relative"});
                        $this.find(".galleria").css({"width":"","height":"", "position":"relative"});

                        $this.find("img").css("margin-top",0);
                        var galleryHeight = $this.find("img").eq(0).height();
                        var length = $this.find("img").length;

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
            
        });

}])

//Объект
.controller('ObjectCtrl', ['$scope','PrivatoDataFactory', function($scope, PrivatoDataFactory){

        $('html, body').scrollTop(0);
        $(".navbar-nav a").removeClass("active");
        closeMenu();
        var url = window.location.hash.split('/');
        $(".navbar-nav a[href='#/" + url[1] + "']").addClass("active");

        if (pageURL == ""){
            $scope.backHref = "#/sale";
        } else {
            $scope.backHref = pageURL; 
        }
        
        pageURL = window.location.hash;

        window.document.title = "Данные объекта";
        $scope.privatoData = privatoData;

        $('html, body').scrollTop(0);
        $scope.errorShow = false;
        $("#showObject").addClass("loading");

        //Запрос на получение списка домов
        $scope.errorShow = false;

        $scope.onLoad = function(){
            PrivatoDataFactory.GetHouseData({}).then(handleRequest, handleErrorRequest);
        };


        //Обработка ответа
        var handleRequest = function(data){
            $scope.errorShow = false;
            console.log("<!-- Ответ на запрос данных дома -->");
            console.log(data.data)
            console.log("<!-- / --> ");

            $scope.objectData = data.data;
            $scope.objectData.dollarPrice = String($scope.objectData.dollarPrice).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
            $scope.objectData.roublePrice = String($scope.objectData.roublePrice).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

            $scope.objectData.settlementData.pricesFrom = String($scope.objectData.settlementData.pricesFrom).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
            $scope.objectData.settlementData.pricesTo = String($scope.objectData.settlementData.pricesTo).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

            if ($scope.objectData.chosen){
                $scope.objectData.chosenClass="glyphicon-heart";
                $scope.objectData.chosenTitle="Убрать из избранного";
            } else {
                $scope.objectData.chosenClass="glyphicon-heart-empty";
                $scope.objectData.chosenTitle="Добавить в избранное";
            }

            window.document.title = $scope.objectData.pageHeader;

            if ($scope.objectData.landscape == true){
                $scope.objectData.landscape = "Есть";
            } else {
                $scope.objectData.landscape = "Нет";
            }

            //$("#showObject").removeClass("loading");

                
        }

        //Обработка ошибки
        var handleErrorRequest = function(error){
            console.log("<!-- Ответ на запрос (данные дома), ошибка -->");
            console.log(error)
            console.log("<!-- / --> ");
            $scope.errorShow = true;
            $scope.errorText = "По Вашему запросу ничего не найдено."
        }
        
        //Стилизуем фильтр
        $('.selectpicker').each(function () {
            $(this).selectpicker('destroy');
            $(this).selectpicker();
        });

        $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
            //Активируем галерею
            var totalImages = $("#gallery img").length;
            var imagesLoaded = 0;
            

            var onImgLoad = function(selector, callback){
                $(selector).each(function(){
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

            onImgLoad('#gallery img', function(){
                imagesLoaded++;
                if (imagesLoaded == totalImages){
                    loadGallery();
                    $("#showObject").removeClass("loading"); 
                    $(window).resize(function(){
                        $( "#gallery" ).jGallery().destroy();
                        loadGallery();
                    });
                }
            });

            function loadGallery(){
                var galleryHeight = 0;
                var thumbHeight = 125;
                $("#gallery img").each(function(){
                    if ($(this).height() > galleryHeight){
                        galleryHeight = $(this).height();
                    }
                });

                if ($(window).width() < 750){
                    thumbHeight = 90;
                }

                galleryHeight = galleryHeight + thumbHeight + 20;
                $( "#gallery" ).jGallery( {
                    "transitionCols":"1",
                    "transitionRows":"1",
                    "thumbnailsPosition":"bottom",
                    "thumbType":"image",
                    "thumbHeight":thumbHeight,
                    "browserHistory": false,
                    "backgroundColor":"FFFFFF",
                    "textColor":"102930",
                    "mode":"standard",
                    "height":galleryHeight + "px",
                    "zoomSize": 'fit',
                    "draggableZoomHideNavigationOnMobile": false,
                    "tooltips": false,
                    "draggableZoom": false,
                    "thumbnailsHideOnMobile": false
                });

                // карта    
                $('.map.single').each(function(){
                    var container = this;
                    var latlng = new google.maps.LatLng(
                        parseFloat($(container).data('lat')),
                        parseFloat($(container).data('lng'))
                    );
                    var mapOptions = {
                        zoom: parseInt($(container).data('zoom')),
                        center: latlng,
                        zoomControl: true,
                        mapTypeControl: false,
                        streetViewControl: false,
                        scrollwheel: false,
                        draggable: false,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                    var map = new google.maps.Map(container, mapOptions);
                
                    var marker = new google.maps.Marker({
                        position: latlng,
                        map: map,
                        icon: $(container).data('marker')
                    });
                });
            }

            

        });

}])

//Посёлок
.controller('SettlementCtrl', ['$scope','PrivatoDataFactory', function($scope, PrivatoDataFactory){

        window.document.title = "Коттеджный посёлок";

        if (pageURL == ""){
            $scope.backHref = "#/settlements";
        } else {
            $scope.backHref = pageURL; 
        }
        
        pageURL = window.location.hash;

        $(".navbar-nav a").removeClass("active");
        $(".navbar-nav a[href='#/settlements']").addClass("active");
        closeMenu();

        $scope.privatoData = privatoData;

        $('html, body').scrollTop(0);
        $scope.errorShow = false;
        $("#showObject").addClass("loading");

        //Запрос на получение списка домов
        $scope.errorShow = false;

        $scope.onLoad = function(){
            PrivatoDataFactory.GetSettlementData({}).then(handleRequest, handleErrorRequest);
        };


        //Обработка ответа
        var handleRequest = function(data){
            $scope.errorShow = false;
            console.log("<!-- Ответ на запрос данных посёлка -->");
            console.log(data.data)
            console.log("<!-- / --> ");

            $scope.settlementData = data.data;
            $scope.settlementData.pricesFrom = String($scope.settlementData.pricesFrom).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
            $scope.settlementData.pricesTo = String($scope.settlementData.pricesTo).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

            window.document.title = "Коттеджный посёлок" + $scope.settlementData.name;

            $scope.settlementData.sale.forEach(function(object){
                object.dollarPrice = String(object.dollarPrice).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
                if (object.chosen){
                    object.chosenClass="glyphicon-heart";
                    object.chosenTitle="Убрать из избранного";
                } else {
                    object.chosenClass="glyphicon-heart-empty";
                    object.chosenTitle="Добавить в избранное";
                }
            });

            $scope.settlementData.rent.forEach(function(object){
                object.dollarPrice = String(object.dollarPrice).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
                if (object.chosen){
                    object.chosenClass="glyphicon-heart";
                    object.chosenTitle="Убрать из избранного";
                } else {
                    object.chosenClass="glyphicon-heart-empty";
                    object.chosenTitle="Добавить в избранное";
                }
            });

            $scope.settlementData.lands.forEach(function(object){
                object.dollarPrice = String(object.dollarPrice).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
                if (object.chosen){
                    object.chosenClass="glyphicon-heart";
                    object.chosenTitle="Убрать из избранного";
                } else {
                    object.chosenClass="glyphicon-heart-empty";
                    object.chosenTitle="Добавить в избранное";
                }
            });

            $scope.settlementData.landsNum = $scope.settlementData.lands.length;
            if ($scope.settlementData.landsNum == 0){
                $scope.settlementData.landsClass = "disabled";
            } else {
                $scope.settlementData.landstClass = "";
                $("#showLands").trigger("click");
            }

            $scope.settlementData.rentNum = $scope.settlementData.rent.length;
            if ($scope.settlementData.rentNum == 0){
                $scope.settlementData.rentClass = "disabled";
            } else {
                $scope.settlementData.rentClass = "";
                $("#showRent").trigger("click");
            }

            $scope.settlementData.saleNum = $scope.settlementData.sale.length;
            if ($scope.settlementData.saleNum == 0){
                $scope.settlementData.saleClass = "disabled";
            } else {
                $scope.settlementData.saleClass = "";
                $("#showSale").trigger("click");
            }           
        }

        //Обработка ошибки
        var handleErrorRequest = function(error){
            console.log("<!-- Ответ на запрос (данные посёлка), ошибка -->");
            console.log(error)
            console.log("<!-- / --> ");
            $scope.errorShow = true;
            $scope.errorText = "По Вашему запросу ничего не найдено."
        }
        
        //Стилизуем фильтр
        $('.selectpicker').each(function () {
            $(this).selectpicker('destroy');
            $(this).selectpicker();
        });

        $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
            //Активируем галерею
            var totalImages = $("#gallery img").length;
            var imagesLoaded = 0;
            

            var onImgLoad = function(selector, callback){
                $(selector).each(function(){
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

            onImgLoad('#gallery img', function(){
                imagesLoaded++;
                if (imagesLoaded == totalImages){
                    loadGallery();
                    $("#showObject").removeClass("loading"); 
                    $(window).resize(function(){
                        $( "#gallery" ).jGallery().destroy();
                        loadGallery();
                    });
                }
            });

            function loadGallery(){
                var galleryHeight = 0;
                var thumbHeight = 125;
                $("#gallery img").each(function(){
                    if ($(this).height() > galleryHeight){
                        galleryHeight = $(this).height();
                    }
                });

                if ($(window).width() < 750){
                    thumbHeight = 90;
                }

                galleryHeight = galleryHeight + thumbHeight + 20;
                $( "#gallery" ).jGallery( {
                    "transitionCols":"1",
                    "transitionRows":"1",
                    "thumbnailsPosition":"bottom",
                    "thumbType":"image",
                    "thumbHeight":thumbHeight,
                    "browserHistory": false,
                    "backgroundColor":"FFFFFF",
                    "textColor":"102930",
                    "mode":"standard",
                    "height":galleryHeight + "px",
                    "zoomSize": 'fit',
                    "draggableZoomHideNavigationOnMobile": false,
                    "tooltips": false,
                    "draggableZoom": false,
                    "thumbnailsHideOnMobile": false
                });

                // карта    
                $('.map.single').each(function(){
                    var container = this;
                    var latlng = new google.maps.LatLng(
                        parseFloat($(container).data('lat')),
                        parseFloat($(container).data('lng'))
                    );
                    var mapOptions = {
                        zoom: parseInt($(container).data('zoom')),
                        center: latlng,
                        zoomControl: true,
                        mapTypeControl: false,
                        streetViewControl: false,
                        scrollwheel: false,
                        draggable: false,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                    var map = new google.maps.Map(container, mapOptions);
                
                    var marker = new google.maps.Marker({
                        position: latlng,
                        map: map,
                        icon: $(container).data('marker')
                    });
                });
            }
        });

        $scope.$on('ngRepeatHousesFinished', function(ngRepeatFinishedEvent) {
            checkGallery();
        });
}])

//Контакты
.controller('ContactsCtrl', ['$scope','PrivatoDataFactory', function($scope, PrivatoDataFactory){
        window.document.title = "Контакты";

        $('html, body').scrollTop(0);
        $(".navbar-nav a").removeClass("active");
        $(".navbar-nav a[href='#/contacts']").addClass("active");
        closeMenu();
        
        $scope.privatoData = privatoData;

        //Стилизуем фильтр
        $('.selectpicker').each(function () {
            $(this).selectpicker('destroy');
            $(this).selectpicker();
        });

        function initialize() {
            var latlng = new google.maps.LatLng(56.323678, 44.0);
            var myOptions = {
                zoom: 15,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false,
                draggable: false,
            };
            var map = new google.maps.Map(document.getElementById("map"),myOptions);
            
            setMarkers(map, places);
        }   
      
        var places =  eval($("#map").data('places'));
     
        function setMarkers(map, locations) {
            
            var latlngbounds = new google.maps.LatLngBounds();  
            
            var image = new google.maps.MarkerImage('images/marker.png',      
                new google.maps.Size(259, 64),      
                new google.maps.Point(0,0),      
                new google.maps.Point(0, 0));   
           
            for (var i = 0; i < places.length; i++) {
                var myLatLng = new google.maps.LatLng(locations[i][1], locations[i][2]);
                
                latlngbounds.extend(myLatLng);
                var marker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    icon: image,
                    title: locations[i][0],
                }); 
            }
        
            map.setCenter( latlngbounds.getCenter(), map.fitBounds(latlngbounds));   
        };

        initialize();

}])

//Собственникам
.controller('OwnersCtrl', ['$scope','PrivatoDataFactory', function($scope, PrivatoDataFactory){
        window.document.title = "Собственникам";
        $('html, body').scrollTop(0);
        $(".navbar-nav a").removeClass("active");
        $(".navbar-nav a[href='#/owners']").addClass("active");
        closeMenu();

        $scope.privatoData = privatoData;
        
        //Стилизуем фильтр
        $('.selectpicker').each(function () {
            $(this).selectpicker('destroy');
            $(this).selectpicker();
        });

}])