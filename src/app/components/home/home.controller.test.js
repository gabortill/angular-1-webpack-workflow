/* eslint-env mocha */
import HomeController from './home.controller';

require('chai').should();

describe('home component', () => {
    it('should have been defined', () => {
        const ctrl = new HomeController();

        ctrl.should.not.to.be.an('undefined');
    });
});
