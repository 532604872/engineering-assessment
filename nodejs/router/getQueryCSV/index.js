/**
 * @Description: 获取表格数据
 * @Author: zero
 * @Date: 2024-05-10 19:16:17
 * @LastEditors: zero
 * @LastEditTime: 2024-05-10 19:16:17
 *
 * 【验证方式】地址栏输入：http://localhost:5001/getQueryCSV/1569152
*/

const Router = require('koa-router');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser'); // fast-csv

const fileDir = path.join(__dirname, '../../../doc'); // 文件目录
const filePath = `${fileDir}/Mobile_Food_Facility_Permit.csv`;// 文件路径

const results = [];

fs.createReadStream(filePath)
.pipe(csv()) // fast-csv： csv.parse()
.on('data', (data) => results.push(data))
.on('end', () => {
  // console.log(results);
  // 在这里可以对结果进行处理
});

// 获取行数据
function getFinedResultes(id) {
  const res = results.find(o => o.locationid === id)
  return res ? [res] : []
}

// 异常处理
function errorCollect(ctx) {
  ctx.status = 404;
  ctx.body = 'not found';
}


const imagesRouter = new Router();

// 根据ID查询
/*imagesRouter.get('/getQueryCSV/:id', (ctx) => {
  const { id } = ctx.params;

  try {
    // 读取id数据
    const data = id ? getFinedResultes(id) : [];

    // 设置响应头
    ctx.type = 'application/json';

    // 发送返回值
    ctx.body = {
      code: 0,
      message: 'success',
      results: data
    };
  } catch (error) {
    errorCollect(ctx)
  }
})*/

// 分页查询
imagesRouter.post('/postQueryCSV', (ctx) => {
  const { page, pageSize } = ctx.request.body;

  try {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    const result = results.slice(offset, offset + limit);

    // 设置响应头
    ctx.type = 'application/json';

    // 发送返回值
    ctx.body = {
      code: 0,
      message: 'success',
      result: {
        page,
        pageSize,
        results: result,
        totalNum: results.length
      }
    };
  } catch (error) {
    errorCollect(ctx)
  }
})

// 获取全部数据
imagesRouter.get('/getQueryCSV', (ctx) => {
  const { id } = ctx.query

  try {
    // 读取id数据
    const data = id ? getFinedResultes(id) : results;

    // 设置响应头
    ctx.type = 'application/json';

    // 发送返回值
    ctx.body = {
      code: 0,
      message: 'success',
      results: data
    };
  } catch (error) {
    errorCollect(ctx)
  }
})

module.exports = imagesRouter