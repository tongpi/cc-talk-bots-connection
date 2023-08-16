const axios = require('axios');

// 网站URL
const url = 'http://workspace.featurize.cn:47367/';

const API_KEY="iCkMy7ymtJ9qYzQRXkQpnAJEq7D4NyMU"
const options = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  }
}

// 发送表单数据的函数
async function sendFormData() {
  try {
    // 构建表单数据
    const formData = {
      // 在此添加表单字段和值
      message: 'ssssssss'
    };

    // 发送POST请求
    const response = await axios.post(url, formData,options);

    // 处理响应
    console.log(`请求成功: ${response.status}`);
    console.log(response.data);
  } catch (error) {
    // 处理错误
    console.error('请求出错:', error);
  }
}

// 设置并发请求数量和循环次数
const concurrency = 1; // 并发请求数量
const loopCount = 1; // 循环次数

// 执行压力测试
async function runPressureTest() {
  console.log(`开始进行压力测试：${concurrency}个并发请求，共${concurrency * loopCount}个请求`);

  const startTime = Date.now();

  // 创建并发请求
  const requests = [];
  for (let i = 0; i < concurrency; i++) {
    for (let j = 0; j < loopCount; j++) {
      requests.push(sendFormData());
    }
  }

  // 等待所有请求完成
  await Promise.all(requests);

  const endTime = Date.now();
  const duration = endTime - startTime;

  console.log(`压力测试完成，共花费${duration}毫秒`);
}

// 执行压力测试
runPressureTest();