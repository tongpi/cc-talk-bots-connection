const { Builder, By, Key } = require('selenium-webdriver');

// 网站URL
const url = 'http://workspace.featurize.cn:47367/';

// 表单字段和值
const formData = {
  field1: 'value1',
  field2: 'value2',
  // ...
};

// 并发请求数量和循环次数
const concurrency = 1; // 并发请求数量
const loopCount = 1; // 循环次数

// 执行e2e压力测试
async function runE2ePressureTest() {
  console.log(`开始进行e2e压力测试：${concurrency}个并发请求，共${concurrency * loopCount}个请求`);

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

  console.log(`e2e压力测试完成，共花费${duration}毫秒`);
}

// 发送表单数据的函数
async function sendFormData() {
  // 创建WebDriver实例
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    // 导航到网站
    await driver.get(url);

    const ele =driver.findElement(By.className("t-bc st-bt st-bz st-c0 st-c1 st-c2 st-c3 st-c4 st-c5 st-c6 st-bw st-b8 st-c7 st-c8 st-c9 st-ca st-cb st-cc st-cd st-ce st-ae st-af st-ag st-cf st-ai st-aj st-by st-cg st-ch st-ci st-am st-cp"))
    console.log(ele)
    // 填写表单字段
    for (const field in formData) {
      // await driver.findElement(By.className  .name(field)).sendKeys(formData[field], Key.RETURN);
      const ele =driver.findElement(By.className("t-bc st-bt st-bz st-c0 st-c1 st-c2 st-c3 st-c4 st-c5 st-c6 st-bw st-b8 st-c7 st-c8 st-c9 st-ca st-cb st-cc st-cd st-ce st-ae st-af st-ag st-cf st-ai st-aj st-by st-cg st-ch st-ci st-am st-cp"))
      console.log(ele)
      await driver.findElement(By.className("t-bc st-bt st-bz st-c0 st-c1 st-c2 st-c3 st-c4 st-c5 st-c6 st-bw st-b8 st-c7 st-c8 st-c9 st-ca st-cb st-cc st-cd st-ce st-ae st-af st-ag st-cf st-ai st-aj st-by st-cg st-ch st-ci st-am st-cp")).sendKeys(formData[field], Key.RETURN);
    }

    // 等待一段时间，模拟用户操作
    await driver.sleep(500);

    // 清除表单字段
    for (const field in formData) {
      await driver.findElement(By.name(field)).clear();
    }

    // 关闭浏览器
    await driver.quit();
  } catch (error) {
    console.error('e2e压力测试出错:', error);
    // 关闭浏览器（如果发生错误）
    await driver.quit();
  }
}

// 执行e2e压力测试
runE2ePressureTest();