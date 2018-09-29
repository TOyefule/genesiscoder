"use strict";
var llb = angular.module("languages", ['ngSanitize', 'ngRoute']);

llb.constant("URL", {
    siteRoot: "/languages/",
    contentSrc: "api/read-languages.php",
    featuredPhotographersSrc: "/lifelooksbeautiful.com/data/featured.json"
});


llb.config(["$locationProvider", "$routeProvider", "URL", function ($locationProvider, $routeProvider, URL) {

    $routeProvider
        .when("/", {redirectTo: URL.siteRoot})
        .when(URL.siteRoot, {templateUrl: URL.siteRoot + "views/language.php", controller: "MainController"})
        //Default
        .otherwise({redirectTo: URL.siteRoot});
    $locationProvider.html5Mode(true).hashPrefix('!');
    $locationProvider.html5Mode(true);
}]);
