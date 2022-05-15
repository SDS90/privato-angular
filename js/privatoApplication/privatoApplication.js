'use strict';

var privatoApplication = angular.module('privatoApplication', ['ngRoute']);

privatoApplication.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
    $routeProvider
        //Главная
		.when('/', {
          templateUrl: 'partials/main.html',
          controller: 'MainCtrl',
          resolve: {
              factory: checkRouting
          }
      })

    //Объект
    .when('/object/:ID', { 
          templateUrl:'partials/object.html',
          controller: 'ObjectCtrl',
          resolve: {
              factory: checkRouting
          }
      })

    .when('/sale/object/:ID', { 
          templateUrl:'partials/object.html',
          controller: 'ObjectCtrl',
          resolve: {
              factory: checkRouting
          }
      })

    .when('/rent/object/:ID', { 
          templateUrl:'partials/object.html',
          controller: 'ObjectCtrl',
          resolve: {
              factory: checkRouting
          }
      })
    
    //Продажа
    .when('/sale', {
          templateUrl: 'partials/list.html',
          controller: 'ListCtrl',
          resolve: {
              factory: checkRouting
          }
      })
    //Аренда
    .when('/rent', {
          templateUrl: 'partials/list.html',
          controller: 'ListCtrl',
          resolve: {
              factory: checkRouting
          }
      })
    //Посёлки
    .when('/settlements', {
          templateUrl: 'partials/list.html',
          controller: 'ListCtrl',
          resolve: {
              factory: checkRouting
          }
      })
    //Посёлки
    .when('/chosen/:userID', {
          templateUrl: 'partials/list.html',
          controller: 'ListCtrl',
          resolve: {
              factory: checkRouting
          }
      })
    //Собственникам
    .when('/owners', { 
          templateUrl:'partials/owners.html',
          controller: 'OwnersCtrl',
          resolve: {
              factory: checkRouting
          }
      })

    //Контакты
    .when('/contacts', { 
          templateUrl:'partials/contacts.html',
          controller: 'ContactsCtrl',
          resolve: {
              factory: checkRouting
          }
      })



    //Посёлок
    .when('/settlement/:ID', { 
          templateUrl:'partials/settlement.html',
          controller: 'SettlementCtrl',
          resolve: {
              factory: checkRouting
          }
      })

    .otherwise({
        templateUrl: 'partials/list.html',
          controller: 'ListCtrl',
          resolve: {
              factory: checkRouting
          }
      });

    //$locationProvider.html5Mode(true);
    //Красивые урлы: http://iantonov.me/page/krasivye-url-dlja-angularjs-ubiraem-hesh-tegi
                
                $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                                
                /**
                * The workhorse; converts an object to x-www-form-urlencoded serialization.
                * @param {Object} obj
                * @return {String}
                */ 
               var param = function(obj) {
                 var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

                 for(name in obj) {
                   value = obj[name];

                   if(value instanceof Array) {
                     for(i=0; i<value.length; ++i) {
                       subValue = value[i];
                       fullSubName = name + '[' + i + ']';
                       innerObj = {};
                       innerObj[fullSubName] = subValue;
                       query += param(innerObj) + '&';
                     }
                   }
                   else if(value instanceof Object) {
                     for(subName in value) {
                       subValue = value[subName];
                       fullSubName = name + '[' + subName + ']';
                       innerObj = {};
                       innerObj[fullSubName] = subValue;
                       query += param(innerObj) + '&';
                     }
                   }
                   else if(value !== undefined && value !== null)
                     query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                 }

                 return query.length ? query.substr(0, query.length - 1) : query;
               };

               // Override $http service's default transformRequest
               $httpProvider.defaults.transformRequest = [function(data) {
                 return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
               }];
  }
]);

var checkRouting= function ($q, $rootScope, $location) {
    return true;
};

privatoApplication.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit(attr.onFinishRender);
                });
            }
        }
    }
});
