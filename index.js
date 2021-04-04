
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

    //page 02
    await driver.findElement(By.xpath('//*[@id="shippingValue"]')).click();// open select
    await driver.findElement(By.xpath('//*[@id="shippingValue"]/option[2]')).click();// select 1000

    const enterPrice = await driver.wait(until.elementLocated(By.xpath(`//*[@id="orderAmount"]`)));// enter price
    enterPrice.sendKeys("1000");
    const nextStep = await driver.wait(until.elementLocated(By.xpath(`//*[@id="nextStep"]`)));
    nextStep.click();

    //page 03
    await driver.wait(until.elementLocated(By.xpath(`/html/body/div/div[2]/div[1]`)));
    //寄件人姓名
    const senderName = await driver.wait(until.elementLocated(By.xpath(`//*[@id="senderName"]`)));
    senderName.sendKeys("寄件人測試");
    //寄件人手機
    const senderPhone = await driver.wait(until.elementLocated(By.xpath(`//*[@id="senderPhone"]`)));
    senderPhone.sendKeys("0912345678");
    //寄件人mail
    const senderEmail = await driver.wait(until.elementLocated(By.xpath(`//*[@id="senderEmail"]`)));
    senderEmail.sendKeys("test@gmail.com");

    const parentWindow = await driver.getWindowHandle();// 起始主視窗ID
    // 退貨門市視窗
    const returnStore = await driver.wait(until.elementLocated(By.xpath(`//*[@id="checkStore"]`)));
    returnStore.click();

    await driver.wait(async () => (await driver.getAllWindowHandles()).length === 2);//確認是否開啟第二個視窗

    const windows = await driver.getAllWindowHandles();// 抓取所有視窗ID
    windows.forEach(async handle => {
        if (handle !== parentWindow) {
            await driver.switchTo().window(handle);
        }
    });

    // 退貨門市視窗
    await driver.wait(until.titleIs('電子地圖查詢系統'));// 等待 進入新視窗

    const selectByName = await driver.wait(until.elementLocated(By.xpath(`//*[@id="byID"]/a`)));
    selectByName.click();

    await driver.sleep(1000);
    await driver.switchTo().frame(0);

    await driver.wait(until.elementLocated(By.id(`storeIDKey`))).sendKeys("148133");
    // await driver.wait(until.elementLocated(By.id("storeIDKey"))).sendKeys("");
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="send"]`))).click();
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="ol_stores"]/li`))).click();
    await driver.switchTo().parentFrame();
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="sevenDataBtn"]`))).click();
    await driver.sleep(500);
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="AcceptBtn"]`))).click();
    await driver.sleep(500);
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="submit_butn"]`))).click();   
}

seven();