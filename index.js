
//require('dotenv').config();
import webdriver, { Builder, By, Key, until } from 'selenium-webdriver';
import fs from 'fs';
import QRCode from 'qrcode';
async function seven() {
    let driver = await new webdriver.Builder().forBrowser('chrome').build();
    await driver.manage().window().setRect({ width: 1200, height: 800, x: 0, y: 0 });// set browser windows size

    const sevenPage = 'https://myship2.7-11.com.tw/C2C/Page02';// 7-11 package value page
    await driver.get(sevenPage);
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="nextStep"]`)));// wait page ready

    //page 02
    await driver.findElement(By.xpath('//*[@id="shippingValue"]')).click();// open select
    await driver.findElement(By.xpath('//*[@id="shippingValue"]/option[2]')).click();// select 1000

    await driver.wait(until.elementLocated(By.xpath(`//*[@id="orderAmount"]`))).sendKeys("1000");// enter price

    await driver.wait(until.elementLocated(By.xpath(`//*[@id="nextStep"]`))).click();// next page

    //page 03
    await driver.wait(until.elementLocated(By.xpath(`/html/body/div/div[2]/div[1]`)));
    //寄件人姓名
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="senderName"]`))).sendKeys("寄件人測試");
    //寄件人手機
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="senderPhone"]`))).sendKeys("0912345678");
    //寄件人mail
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="senderEmail"]`))).sendKeys("receive@gmail.com");
    const parentWindow = await driver.getWindowHandle();// 起始主視窗ID
    //console.log("first main: " + parentWindow);
    // 退貨門市視窗
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="checkStore"]`))).click();

    await driver.wait(async () => (await driver.getAllWindowHandles()).length === 2);//確認是否開啟第二個視窗

    const windows = await driver.getAllWindowHandles();// 抓取所有視窗ID
    windows.forEach(async handle => {
        if (handle !== parentWindow) {
            await driver.switchTo().window(handle);
            //console.log("first sub: " + handle);
        }
    });

    // 退貨門市選擇
    await driver.wait(until.titleIs('電子地圖查詢系統'));// 等待 電子地圖查詢系統
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="byID"]/a`))).click();// 門市店號

    await driver.sleep(500);
    await driver.switchTo().frame(0);// Switches to the first frame
    await driver.wait(until.elementLocated(By.id(`storeIDKey`))).sendKeys("148133");
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="send"]`))).click();
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="ol_stores"]/li`))).click();
    await driver.switchTo().parentFrame();
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="sevenDataBtn"]`))).click();
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="AcceptBtn"]`)));
    await driver.sleep(500);
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="AcceptBtn"]`))).click();
    await driver.sleep(500);
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="submit_butn"]`))).click();
    await driver.switchTo().window(parentWindow);// back to main window
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="nextStep"]`))).click();// next page

    // page 04
    await driver.wait(until.elementLocated(By.xpath(`/html/body/div[1]/div[2]/div[2]/div/div[1]/div[1]`)));
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="receiverName"]`))).sendKeys("收件人測試");
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="receiverPhone"]`))).sendKeys("0987654321");
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="receiverEmail"]`))).sendKeys("send@gmail.com");

    //parentWindow = await driver.getWindowHandle();// 起始主視窗ID
    //console.log("second main: " + parentWindow);
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="checkStore"]`))).click();// 收件門市

    await driver.wait(async () => (await driver.getAllWindowHandles()).length === 2);//確認是否開啟第二個視窗
    //console.log("success to page 4");
    const sWindows = await driver.getAllWindowHandles();
    sWindows.forEach(async handle => {
        if (handle !== parentWindow) {
            await driver.switchTo().window(handle);
            //console.log("second sub: " + handle);
        }
    });
    await driver.wait(until.titleIs('電子地圖查詢系統'));// 等待 電子地圖查詢系統
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="byID"]/a`))).click();// 門市店號

    await driver.sleep(500);
    await driver.switchTo().frame(0);// Switches to the first frame
    await driver.wait(until.elementLocated(By.id(`storeIDKey`))).sendKeys("948502");
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="send"]`))).click();
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="ol_stores"]/li`))).click();
    await driver.switchTo().parentFrame();
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="sevenDataBtn"]`))).click();
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="AcceptBtn"]`)));
    await driver.sleep(500);
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="AcceptBtn"]`))).click();
    await driver.sleep(500);
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="submit_butn"]`))).click();
    await driver.switchTo().window(parentWindow);// back to main window

    await driver.wait(until.elementLocated(By.xpath(`//*[@id="nextStep"]`))).click();// next page
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="printOrder"]`))).click();// 取得貨物代碼

    const trackNumber = await driver.wait(until.elementLocated(By.id('pinno'))).getAttribute('innerHTML');
    //console.log(trackNumber);
    if (trackNumber != "取號中.") {
        //fs.appendFile()
        fs.readFile('trackNumberList.txt', function (err, data) {// 檢查是否有 trackNumberList.txt
            if (err) {
                fs.writeFile('trackNumberList.txt', trackNumber + '\r\n', function (err) {// 建立 trackNumberList
                    if (err) throw err
                    console.log("new file create and track number save success!!");
                });
            } else {
                fs.appendFile('trackNumberList.txt', trackNumber + '\r\n', function (err) {// 新增資料至 trackNumberList
                    if (err) throw err
                    console.log("track number save success!!");
                });
            }
        });
        QRCode.toFile('./' + 'QRCode-' + trackNumber + '.png', trackNumber, {//QRCode picture
            color: {
                dark: '#000'// QRCode color
            }
        }, function (err) {
            if (err) throw err
            console.log('QRCode create success!!')
        })
    }

    await driver.quit();// close windows
}

seven();
