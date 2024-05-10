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
  const res = id ? results.find(o => o.locationid === id) : 'not found id:' + id
  return id ? res : results
}


const imagesRouter = new Router();
imagesRouter.get('/getQueryCSV/:id', (ctx) => {
  const { id } = ctx.params;

  try {
    // 读取id数据
    const data = getFinedResultes(id);

    // 设置响应头
    ctx.type = 'application/json';

    // 发送返回值
    ctx.body = {
      code: 0,
      message: 'success',
      results: data
    };
  } catch (error) {
    ctx.status = 404;
    ctx.body = 'not found';
  }
})

module.exports = imagesRouter