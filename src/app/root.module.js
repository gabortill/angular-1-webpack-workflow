import angular from 'angular';
import componentsModule from './components/components.module';
import rootComponent from './root.component';
import uiRouter from 'angular-ui-router';

angular
    .module('root', [
        componentsModule,
        uiRouter,
    ])
    .component('root', rootComponent)
    .config(($locationProvider, $urlRouterProvider) => {
        'ngInject';

        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
    });
