import homeComponent from './home.component';
import uiRouter from 'angular-ui-router';

export default angular
    .module('home', [
        uiRouter,
    ])
    .config(($stateProvider) => {
        'ngInject';

        $stateProvider
            .state('home', {
                template: '<home></home>',
                url: '/',
            });
    })
    .component('home', homeComponent)
    .name;
