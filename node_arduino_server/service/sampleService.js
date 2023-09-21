const logger = require("../lib/logger");
const departmentDao = require("../dao/departmentDao");

const service = {
  // department 입력
  async reg(params) {
    let inserted = null;

    try {
      inserted = await departmentDao.insert(params);
      logger.debug(`(departmentService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(departmentService.reg) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },
};

module.exports = service;
