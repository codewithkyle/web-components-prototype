(function(){
var User = (function () {
    function User() {
        console.log('User constructor');
    }
    User.prototype.getUser = function () {
        console.warn('Line item fetch not yet implemented');
    };
    return User;
}());

window.User = new User();
})();
