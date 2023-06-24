##Start a project!!!: ./start-dev.sh
##Or change settings in chatController:
"const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
  }
);"