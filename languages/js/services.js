"use strict";
//Page title

llb.factory('Page', function () {
    var title = 'My Life Looks Beautiful';
    return {
        title: function () {
            return title;
        },
        setTitle: function (newTitle) {
            title = newTitle;
        }
    }
});

//Tailor your greeting
llb.factory('Tailor', function () {
    var greeting = 'Visitor';
    var activeUser = sessionStorage.getItem('member');
    if (activeUser) {
        greeting = activeUser;
    } else {
        greeting = 'User';
    }
//    log.info('');
    return {
        greet: function () {
            return greeting;
        },
        setGreeting: function (name, scope) {
            var user = sessionStorage.setItem('user', name);
            greeting = user;
            scope.userName = 'Visitor';
        },
        goodbye: function () {
            sessionStorage.removeItem('user')
        }
    };
});

//Authentication services
llb.factory('AuthService', function ($http, $location, sessionService, URL) {
    return {
        login: function (creds, scope) {
//            var email = creds['email'];
//            var password = CryptoJS.MD5(creds['password']);
//            API call clients
//            var $promise = $http.get(URL.apiUrl + 'clients/' + email + '/' + password); //Production
//            scope.authenticated = false;
//            $promise.then(function (data) {
//                if (data.data.length > 0) {
//                    if (data.data[0].clientid) {
//                        var clientData = data.data[0].clientid;
//                        var clientAsap = JSON.stringify(data.data[0]);
//                        var clientUID = data.data[0].password;
//                        sessionService.set('asapclient', clientAsap);
//                        sessionService.set('client', clientData);
//                        sessionService.set('clientid', clientUID);
//                        $location.path('/dashboard');
//                    }
//                }
//                else {
//                    return scope.error = "Invalid email or password, please try again!";
//                    $location.path('/');
//                }
//            });
        },

        verify: function (scope) {
            var mid = sessionService.get('memberid');
            var ak = sessionService.get('authkey');
            if (mid) {
                log.info('auth service: member logged in');
                log.debug('member id: ' + mid);
                log.debug('authkey: ' + ak);
                var parseuser = sessionService.get('user');
                var user = JSON.parse(parseuser);
                scope.user = user;
                scope.member = scope.user['user'];
                scope.recruits = scope.member['recruits'];
                scope.count = scope.user['recruitcount'];
                scope.logstatus = true;
                scope.loggedin = true;
                return true;
            } else {
                scope.logstatus = false;
                log.warn('auth service: member not logged in');
                return false;
            }
            log.warn('auth service: user not logged in');
//            var path = '{"clientid":"' + user + '","password":"' + cid + '"}';
//            var $promise = $http.post(URL.apiUrl + 'authenticate.php', path);
//            $promise.then(function (data) {
//                scope.client = data.data[0];
//            });
        },
        validate: function (formdata, $scope) {
            var path = '{"email":"' + formdata.email + '"}';
            var $promise = $http.post(URL.apiUrl + 'verifyaccount.php', path);
            $promise.then(function (data) {
                var valid = data.data[0]
                if (valid) {
                    $http({method: "POST", url: URL.contactUrl, data: formdata});
                    $scope.success = "We've sent you an email from 'noreply@adswebwork.com'.<br/>Check your email for instructions on how to reset your password.";
                }
                else {
                    $scope.error = "We do not have that user account on file!<br/>Please double check your email and try again.";
                }
            });
        },
        saveUserName: function (name) {
            sessionService.set('username', name);
        },
        changePassword: function (scope, email) {
            var cid = email;
            var resetemailObject = '{"email":"' + cid + '"}';
            var $promise = $http.post(URL.apiUrl + 'authenticate.php?reset=password', resetemailObject);
            $promise.then(function (data) {
                scope.client = data.data[0];
            });
        },
        resetPassword: function (scope, email) {
            var cid = email;
            var resetemailObject = '{"email":"' + cid + '"}';
            var $promise = $http.post(URL.apiUrl + 'authenticate.php?reset=password', resetemailObject);
            $promise.then(function (data) {
                scope.client = data.data[0];
            });
        },
        getContent: function (scope) {
            var uid = sessionService.get('clientid');
            var $promise = $http.get(URL.apiUrl + 'content/' + uid);
            $promise.then(function (data) {
                scope.fullcontent = data.data[0].content;
                scope.list = data.data[0].content; //set content
                scope.imagepath = data.data[0].imagepath;
                scope.gallery = data.data[0].gallery;
                sessionService.set('asapcontent', JSON.stringify(data.data[0].content));
                scope.uid = data.data[0]._id.$oid;
//                console.log(scope.uid);
            });
        },

        logout: function () {
            sessionService.destroy('memberid');
            sessionService.destroy('authkey');
            sessionService.destroy('user');
            log.warn('user has logged out');
            $location.path('/');
        },

        authorized: function () {
            var checkUser = $http.post(URL.apiUrl + 'check_session.php');
            return checkUser;
        },

        saveData: function (id, title, content) {
            var uid = sessionService.get('clientid');
            content = JSON.stringify(content);
//            sessionService.set('asapcontent', (content));
//            var content = $.param(content);
            content = content.substr(1);
            content = content.substr(0, content.length - 21);
//            console.log(content)
            var $promise = $http.get(URL.apiUrl + 'update/' + uid + '/' + title + '/' + uid);
            //var $promise = $http.get(URL.apiUrl + 'update/'+uid+'/'+title+'/'+content);
            $promise.then(function (data) {
                return data;
            });
//           console.log(newContent);
        }
    }
});

//Session management
llb.factory('sessionService', [function () {
    return {
        set: function (key, value) {
            return sessionStorage.setItem(key, value);
        },

        get: function (key) {
            return sessionStorage.getItem(key);
        },

        destroy: function (key) {
            return sessionStorage.removeItem(key);
        }
    }
}]);


llb.factory('Filter', function () {
    var filterState = false;
    return {
        filteredState: function () {
            return filterState;
        },
        setFilter: function (scope, name) {
            filterState = true;
            log.debug('Filter is active');
            // scope.subCategory = name;
            log.info('Category set in filter as: ' + name);
            return name;
        },
        getFilter: function(){
            return name;
        }
    };
});
