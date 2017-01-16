import angular from 'angular';
import uiRouter from 'angular-ui-router';

angular
    .module('root', [
        uiRouter,
    ])
    .component('root', {
        controller: class RootController {
            constructor() {
                window.console.log('root controller');
            }
        },
        template: `
            <h1>
                root component
            </h1>
        `,
    })
    .config(($locationProvider, $urlRouterProvider) => {
        'ngInject';

        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
    });
