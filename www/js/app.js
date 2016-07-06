// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'chart.js'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
      if (cordova.platformId === 'ios' && window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.messenger', {
    url: '/messenger',
    views: {
      'menuContent': {
        templateUrl: 'templates/messages.html',
        controller: 'MessengerCtrl'
      }
    }
  })

  .state('app.charts', {
    url: '/charts',
    views: {
      'menuContent': {
        templateUrl: 'templates/charts.html',
        controller: 'ChartsCtrl'
      }
    }
  })

  .state('app.account', {
      url: '/account',
      views: {
        'menuContent': {
          templateUrl: 'templates/account.html',
          controller: 'AccountCtrl'
        }
      }
  })

  .state('app.docs', {
    url: '/docsLinks',
    views: {
      'menuContent': {
        templateUrl: 'templates/docs.html',
        controller: 'DocumentationCtrl'
      }
    }
  })

  .state('app.login', {
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'templates/login.html',
          controller: 'AppCtrl'
        }
      }
    })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
