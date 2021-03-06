import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import databaseConfig from '../config/database';
import User from '../app/models/user';
import File from '../app/models/file';
import Appointment from '../app/models/appointment';

//my models
const models = [User,File,Appointment];

/**
 * Class responsible to configure models in the database
 */
class Database {
    constructor() {
        this.init();
        this.mongo();
    }

    init(){
        this.connection = new Sequelize(databaseConfig);
        models
            .map(model => model.init(this.connection))
            .map(model => model.associate && model.associate(this.connection.models));
    }

    mongo(){
        this.mongoConnecton = mongoose.connect(
            'mongodb://localhost:27017/gobarber',
            {
                useNewUrlParser: true,
                useFindAndModify: true
            }
        );
    }
}

export default new Database();