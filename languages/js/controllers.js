"use strict";
function MainController($scope, $http, URL, Filter, $routeParams) {
    log.info('Main controller loaded');
    // scrollToView('body');
    $scope.subCat = Filter.filteredState();
    $scope.submitSuccess = false;
    $scope.getLanguages = function () {
        var contentSrc = URL.contentSrc;
        $http({method: "GET", url: contentSrc}).success(function (data) {
            $scope.languages = data.languages;
            log.info('Site content returned successfully');
            return true;
        })
            .error(function (data, status, headers, config) {
            });

    };
    $scope.contactShoots = "";
    $scope.addToContact = function (toAdd) {
        log.info(toAdd + ' to be added to contact form');
        //add tag to message
        $scope.contactShoots += '-' + toAdd;
        log.debug('shoots: ' + $scope.contactShoots);
        //remove from tags when clicked
        $('.booking-' + toAdd).hide();
    }
    $scope.processForm = function () {
        log.info("Form processor triggered");
        var formFields = $scope.contactForm;
        var x = 0; //valid form
        //if any field is empty - invalidate the form
        if (!formFields.fullname || !formFields.email || !formFields.subject || !formFields.message) {
            x++;
        }
        ;
        if (x > 0) {
            log.info('invalid contact form')
            $scope.successMessage = '<p class="errorMessage">All Fields required: Please verify you have entered valid values for this form</p>';
        }
        if (x < 1) { //send the form if valid 
            $http({method: "POST", url: URL.contactUrl, data: formFields}).success(function (data) {
                $scope.successMessage = data.message;
                if (data.success) {
                    $scope.success = 'true';
                    $scope.submitSuccess = true;
                    $scope.containerLabel = 'Successful contact';
                }
            })
                .error(function (data) {
                    $scope.errorLabel = 'Error: ';
                    $scope.errorMsg = 'We are unable to process your form at this time, please try again later';
                });
        }
    }


    $scope.startBanner = function (bannerId) {
        log.debug('Starting banner');
        log.info('Banner id: ' + bannerId);
    }

    $scope.filterByCategory = function (category) {
        //TODO: finalize filter functionality
        log.debug('Filter request');
        log.info('Category to filter: ' + category);
        Filter.setFilter(category);
        $scope.currentFilter = category;
        // $scope.subCategory = category;
    }
    $scope.photographerRequest = function () {
        $scope.selectedPhotographer = $routeParams.photographer;
    }
    $scope.resetMenu=function(){
        log.debug('menu reset');
        $('.menu-item').removeClass('current-menu-item');
    }
    $scope.activatePage = function (pageName) {
        $scope.resetMenu();
        // $('.menu-item').removeClass('current_page_item');
        $("#" + pageName+"-page").addClass('current-menu-item');
        log.info('page set to active');
    }
    $scope.featured = function () {
        log.info('Featured Controller Loaded');
        var featured = '';
        $scope.featuredphotographer = false;
        var featuredSrc = URL.featuredPhotographersSrc;
        $http({method: "GET", url: featuredSrc}).success(function (data) {
            $scope.featuredphotogs = data.featured;
            var featured = data.featured;
            log.info('Featured content returned successfully');

            //set featured
            log.info('Featured route params requested:');
            if ($routeParams.feature) {
                $scope.featuredphotographer = true;
                $scope.photographer = featured.filter(function (i) {
                    return i.client === $routeParams.feature;
                });
            }

            return true;
        })
            .error(function (data, status, headers, config) {
            });
    }

}
function teamController($scope, $http, URL) {
    log.info('Contact Controller Loaded');
}

function PortfolioController($scope) {
    log.info('Portfolio Controller Loaded');
    log.info('Route Parameters to be displayed');
    // log.warn($routeParams);
    // log.debug('Page loaded: ' + $routeParams.client);

    $scope.initPortfolio = function () {
        log.info('Portfolio initialized')
    }
    log.info('Portfolio stalled')

}
function PortfolioDetailsController($scope) {
    log.info('Portfolio Controller Loaded');

}
function ContactController($scope, $http, URL) {
    log.info('Contact Controller Loaded');
}






