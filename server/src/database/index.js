const Sequelize = require('sequelize');
const mongoose = require('mongoose');
const User = require('../app/models/User');

const databaseConfig = require('../config/database');
const mongoConfig = require('../config/mongoConfig');

const models = [User];

class Database {
  constructor() {
    this.init();
    // this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map((model) => model.init(this.connection));
    models.map(
      (model) => model.associate && model.associate(this.connection.models),
    );
  }

  mongo() {
    try {
      this.mongoConnection = mongoose.connect(mongoConfig.connection, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      });
      console.log('connected to mongo');
    } catch (error) {
      console.log('not connect to mongodb');
    }
  }
}

module.exports = new Database();
