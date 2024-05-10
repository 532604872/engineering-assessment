const Router = require('koa-router');
const getQueryCSV = require('./getQueryCSV');

const router = new Router();
router.use(getQueryCSV.routes());

module.exports = {
  router,
};
