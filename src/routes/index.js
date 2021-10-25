const EventsRoute = require('./EventsRoute');
const UsersRoute = require('./UsersRoute')
module.exports = (app) => {
    EventsRoute(app)
    UsersRoute(app)
}
