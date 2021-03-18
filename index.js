
//require('dotenv').config();
import webdriver, { Builder, By, Key, until } from 'selenium-webdriver';
//import chrome from 'selenium-webdriver/chrome';
//const options = new.browser.Options();

async function seven() {
    let driver = await new webdriver.Builder().forBrowser('chrome').build();
    await driver.manage().window().setRect({ width: 1200, height: 800, x: 0, y: 0 });// set browser windows size

    const sevenPage = 'https://myship2.7-11.com.tw/C2C/Page02';// 7-11 package value page
    await driver.get(sevenPage);
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="nextStep"]`)));// wait page ready
    //here
    await driver.findElement(By.xpath('//*[@id="shippingValue"]')).click();// open select
    await driver.findElement(By.xpath('//*[@id="shippingValue"]/option[2]')).click();// select 1000

    const enterPrice = await driver.wait(until.elementLocated(By.xpath(`//*[@id="orderAmount"]`)));// enter price
    enterPrice.sendKeys("1000");// 1000, 2000, 3000, 4000, 5000

    const nextStep = await driver.wait(until.elementLocated(By.xpath(`//*[@id="nextStep"]`)));
    nextStep.click();
}

seven();