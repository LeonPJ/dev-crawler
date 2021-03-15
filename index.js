
//require('dotenv').config();
import webdriver, { Builder, By, Key, until } from 'selenium-webdriver';
//import chrome from 'selenium-webdriver/chrome';

//const options = new.browser.Options();

async function seven() {
    const driver = await new webdriver.Builder().forBrowser('chrome').build();
    await driver.manage().window().setRect({ width: 1200, height: 800, x: 0, y: 0 });// set browser windows size
    const sevenPage = 'https://myship2.7-11.com.tw/C2C/Page02';// 7-11 package value page
    driver.get(sevenPage);
    await driver.wait(until.elementLocated(By.xpath(`/html/body/div/div[2]/div[2]`)));// wait page ready

    //here
    await driver.wait(until.findElement(By.xpath(`//*[@id="shippingValue"]`)).sendKeys('756_888'));// ??
    /*const normalShip = await driver.wait(until.elementLocated(By.xpath(`/html/body/div[2]/div[2]/div[1]/div[2]/a/img`)));// choose 一般積材
    normalShip.click();*/
}

seven();