//Import Router from express to be able to define routes.
const routes = require('express').Router();
//Import our database-service-file.
const dbService = require('./database');

// All routes will begin with /api/ on the webpage for the routes in this file.
//
routes.get('/', (req, res) => { //Default route, nothing really happens here
    //Send a response to the webbrowser that this is the entrypoint for the api.
    res.send("Entrypoint for the web api");
});

/**
 * Get a todo
 * @param id
 * All params in the url is identified with the : symbol
 */
routes.get('/getTodo/:id', async (req, res) => {
    try {
        // save the id from the request 
        const id = req.params.id;
        // call getTodo and supply the id to the function
        const todo = await dbService.getTodo(id);

        //Did we get a result?
        if (todo) {
            //If we got a result, send it to the browser
            res.send(todo);
        }
        else {
            throw new Error(`Could not fetch todo with id ${id}`);
        }
    } catch (error) {
        // We didnt get a result, so send a error to the browser
        res.status(404)
            .json(error);
    }
});

routes.get('/getTodos', async (req, res) => {
    try {
        const todos = await dbService.getTodos();
        if (todos) {
            res.json(todos);
        }
        else {
            throw new Error(`Could not fetch todos.`);
        }
    } catch (error) {
        res.status(404)
            .json(error);
    }
});

/**
 * Save a todo
 * Retrieves the json-formatted object from frontend
 * from res.body since we're using app.use(express.json())
 * in server.js
 */
routes.post('/saveTodo', async (req, res) => {
    const values = req.body;

    try {

        const username = values.username;
        const task = values.task;

        await dbService.saveTodo(username, task);
        res.send({
            message: 'New task inserted into tasks',
        })

    } catch (error) {
        res.status(404)
            .json(error);
    }
});
routes.post('/updateTodo/:id', async (req, res) => {
    try {
        await dbService.updateTodo(req.params.id, req.body.done);
        res.status(200).json({});
    } catch (error) {
        res.status(404).json(error);
    }

});

routes.get('/deleteTodo/:id', async (req, res) => {
    try {
        await dbService.deleteTodo(req.params.id);
        res.status(200).json({});
    } catch (error) {
        res.status(404).json(error);
    }

});

// Export routes so we can use them in server.js
module.exports = routes;