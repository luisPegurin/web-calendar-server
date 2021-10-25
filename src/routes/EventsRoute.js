const EventsController = require('../controllers/EventsController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

module.exports = (app) => {
    app.get('/events',[
    	AuthMiddleware.validJWTNeeded,
    	EventsController.events
    ]);
    app.post('/events',[
    	AuthMiddleware.validJWTNeeded,
    	EventsController.addEvent
    ]);
    app.delete('/events/:id',[
    	AuthMiddleware.validJWTNeeded,
    	EventsController.deleteEvent
    ]);    
    app.put('/events',[
    	AuthMiddleware.validJWTNeeded,
    	EventsController.updateEvent
    ]);    
}