const fs = require('fs');

let config = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'nestjsx_crud_error',
  synchronize: false,
  migrationsRun: true,
  logging: true,
  entities: ['dist/models/entities/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/**/*{.ts,.js}'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/models/entities',
    migrationsDir: 'src/migrations',
    subscribersDir: 'src/subscriber',
  },
};

if (fs.existsSync('./ormconfig.local.js')) {
  const localConfig = require('./ormconfig.local');

  console.debug('Local DB config is also provided!');
  // console.debug(localConfig);

  config = Object.assign(config, localConfig);
  // console.debug(config);
} else {
  console.debug('No local DB config is provided, using default only...');
}

module.exports = config;
