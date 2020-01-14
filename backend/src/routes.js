const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.put('/devs/:dev_id', DevController.update);
routes.delete('/devs/:dev_id', DevController.destroy);
routes.get('/search', SearchController.index);

module.exports = routes;