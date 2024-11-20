import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Sequelize } from 'sequelize';

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the environment and load the configuration
const env = process.env.NODE_ENV || 'development';
const configPath = path.join(__dirname, '../config/config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))[env];

// Initialize Sequelize with configuration from the config file
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: config.logging || false, // Optional: Set to true or false based on your need
});

const db = {};

// Ensure we are looking at the correct directory
const modelsDir = __dirname;


try {
  const resolvedModelsDir = path.resolve(modelsDir);

  // Read files in the directory
  const files = fs.readdirSync(resolvedModelsDir)
    .filter(file => file.indexOf('.') !== 0 && file !== path.basename(__filename) && file.slice(-3) === '.js' && !file.includes('.test.js'));

  // Log the list of model files
  // console.log('Model files:', files);

  // Import each model file dynamically
  for (const file of files) {
    const modelPath = path.join(resolvedModelsDir, file);
    const modelURL = new URL(`file://${path.resolve(modelPath)}`);
    // console.log(`Model URL: ${modelURL.href}`);

    try {
      const model = (await import(modelURL)).default;
      // console.log('Imported model:', model); // Debugging: Check what is imported

      if (model && typeof model === 'function') {
        const instance = model(sequelize, Sequelize.DataTypes);
        db[instance.name] = instance;
      } else {
        console.warn(`Model ${file} is not a valid function`);
      }
    } catch (error) {
      console.error(`Error importing model from ${modelURL.href}:`, error);
    }
  }

  // // Log models loaded
  console.log('Loaded models:', Object.keys(db));

  // Set up associations if defined
  for (const modelName of Object.keys(db)) {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  }

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

} catch (error) {
  console.error('Error reading files or importing models:', error);
}

export default db;


// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const process = require('process');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;
