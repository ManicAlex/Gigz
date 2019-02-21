describe('Clicking on the login button ', function(){  
    var username,password,button1;
    beforeEach(function() {
        browser.get('/login');
        button1 =  element(by.css('.button1'))
    });

    it('should have a title', function() {  
        expect(browser.getTitle()).toEqual('Gigz');
    });
    it('should move to register', function() {
        button1.click();
     ////   demo();
    
        expect(browser.getCurrentUrl()).toMatch('/register');
      });

});
