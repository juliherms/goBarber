// configure server express(import modified with sucrase).
import express from 'express';
import routes from './routes';
import path from 'path';

import './database';

class App {
    constructor(){
        this.server = express();
        this.middlewares();
        this.routes();
    }

    //method response to configure my middlewares/interceptor
    middlewares(){
        this.server.use(express.json()); //allow requests with json
        this.server.use(
            '/files',
             express.static(path.resolve(__dirname,'..','tmp','uploads'))
        ); //allow to request static files - show images url in a browser
    }

    //method responsible to configure routes in my application
    routes(){
        this.server.use(routes);
    }
}

export default new App().server;