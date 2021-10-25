const UsersController = require('../controllers/UsersController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');


module.exports = (app) => {
    app.post('/user',UsersController.addUser);    
    app.post('/login',[
    	AuthMiddleware.isEmailAndPasswordMatch,
    	UsersController.login,
    ]);
}