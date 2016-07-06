angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $timeout, List, $window) {
    var _self = this;
    _self.client = List.clientReference();
    $scope.loggedIn = false;
    $scope.loginData = {};

    $scope.doLogin = function (socialNetwork) {
        _self.client.login(socialNetwork).done(loginResponse);
    };

    var loginResponse = function (response) {
        var url = _self.client.applicationUrl + '/.auth/me';
        var headers = new Headers();

        headers.append('X-ZUMO-AUTH', _self.client.currentUser.mobileServiceAuthenticationToken);
        $window.fetch(url, { headers: headers })
            .then(function (data) {
                return data.json();
            }).then(function (user) {
                $scope.user = user[0].user_claims;
                console.log("User has been authenticated successfully:", $scope.user);
            });
    };

    /*
    // After registering you App for Push Notification services in Azure notification hub, add the following plugin. You will also need to congigure senderID in Google GCM. 
    // Plugin name: cordova plugin add phonegap-plugin-push --variable SENDER_ID="XXXXXXX"
    // Once that is done, uncomment the code snippet below to enable Push notification in your app.

    var pushRegistration = null;
    function registerForPushNotifications() {
        pushRegistration = PushNotification.init({
            android: {
                senderID: 'Your_Project_ID'
            },
            ios: {
                alert: 'true',
                badge: 'true',
                sound: 'true'
            },
            wns: {

            }
        });

        pushRegistration.on('registration', function (data) {
            _self.client.push.register('gcm', data.registrationId);
        });

        pushRegistration.on('notification', function (data, d2) {
            alert('Push Received: ' + data.message);
        });

        pushRegistration.on('error', handleError);
    }
    registerForPushNotifications();
    */
})

.controller('DocumentationCtrl', function ($scope, Docs, $window) {
    $scope.docs = Docs.all();
    $scope.openurl = function (url) {
        $window.open(url, '_blank');
    };
})

.controller('AccountCtrl', function ($scope, userData) {
    $scope.userData = userData.all();
})

.controller('ChartsCtrl', function ($scope, Charts) {
    $scope.barChart = Charts.barChart();
    $scope.radarChart = Charts.radarChart();
})

//Add azure websites URL in services.js to store messages on the backend.
.controller('MessengerCtrl', function ($scope, Messages, List, $ionicScrollDelegate) {
    var messageOptions = Messages.all();
    $scope.messages = messageOptions.slice(0, messageOptions.length);

    $scope.add = function (messageText) {
        if (messageText) {
            List.addItem(messageText).then(function (response) {
                console.log('server response', response, messageText);
                var nextMessage = {
                    content: '<p>' + messageText + '</p>'
                };
                $scope.messages.push(angular.extend({}, nextMessage));

                $ionicScrollDelegate.scrollBottom(true);
                $scope.$apply();
            });
        }

    };
});