import dotenv from 'dotenv';
import webdriver, { Builder, By, Key, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import fs from 'fs';
import QRCode from 'qrcode';
import Jimp from 'jimp';
import { createWorker } from 'tesseract.js';

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './routes/route.js'

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/', router);

mongoose
    .connect(process.env.CONNECTION_DB, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => app.listen(process.env.PORT, () => console.log(`Sever running on port: http://localhost:${process.env.PORT}`)))
    .catch((err) => console.log(err.massage));

mongoose.set('useFindAndModify', false);

/*var driver = await new Builder().forBrowser('chrome')
    //.setChromeOptions(new chrome.Options().addArguments('--headless'))
    .setChromeOptions(new chrome.Options().addArguments())
    .build();*/
/*
async function sevenC2C() {
    //let driver = await new webdriver.Builder().forBrowser('chrome').build();
    //await driver.manage().window().setRect({ width: 1200, height: 800, x: 0, y: 0 });// set browser windows size

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

    //page 05
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

    //await driver.quit();// close windows
}*/
/*
async function sevenLC2C() {
    //page 2
    const sevenPage = 'https://myship2.7-11.com.tw/LC2C/Page02';// 取貨-120cm大型包裹
    await driver.get(sevenPage);
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="nextStep"]`)));// 等待讀取到按鍵 下一步
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="orderAmount"]`))).sendKeys("1000");// 輸入金額
    await driver.findElement(By.xpath('//*[@id="nextStep"]')).click();

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

    //page 04
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

    //page 05
    //page 05
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="printOrder"]`))).click();// 取得貨物代碼

    const trackNumber = await driver.wait(until.elementLocated(By.id('pinno'))).getAttribute('innerHTML');
    console.log(trackNumber);
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
}*/
/*
async function sevenEC2C() {
    const sevenPage = 'https://myship2.7-11.com.tw/EC2C/Page02';// 取貨-經濟型包裹
    await driver.get(sevenPage);
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="nextStep"]`)));

    //page 02
    await driver.findElement(By.xpath('//*[@id="shippingValue"]')).click();// 打開包裹價值選單
    await driver.findElement(By.xpath('//*[@id="shippingValue"]/option[2]')).click();// 選金額範圍 1~1000
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="orderAmount"]`))).sendKeys("1000");// 輸入包裹價值
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="nextStep"]`))).click();
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

    //page 05
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="printOrder"]`))).click();// 取得貨物代碼

    const trackNumber = await driver.wait(until.elementLocated(By.id('pinno'))).getAttribute('innerHTML');
    console.log(trackNumber);
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
}*/
/*
async function sevenC2C_Payment() {
    const sevenPage = 'https://myship2.7-11.com.tw/C2C_Payment/Page02';// 取貨-經濟型包裹
    await driver.get(sevenPage);
    // page 02
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="nextStep"]`)));
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="orderAmount"]`))).sendKeys("1000");// 代收金額
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="bankAccountName"]`))).sendKeys(process.env.BANK_ACCOUNT_NAME);// 收款人的帳戶名稱
    await driver.findElement(By.xpath('//*[@id="bankCode"]')).click();// 開啟 收款人的金融機構 選單
    await driver.findElement(By.xpath(process.env.BANK_CODE)).click();// 選擇 中國信託
    await driver.findElement(By.xpath('//*[@id="bankBranch"]')).click();// 開啟 收款人的金融機構分行 選單
    await driver.findElement(By.xpath(process.env.BANK_BRANCH)).click();// 選擇 分行
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="bankAccount"]`))).sendKeys(process.env.BANK_ACCOUNT);// 輸入 收款人的銀行帳號

    //收款人的銀行開戶之身分ID
    //默認為個人戶其餘為商業戶與外籍人士
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="sendIdno"]`))).sendKeys(process.env.ID);// 代收金額
    await driver.findElement(By.xpath(`//*[@id="nextStep"]`)).click();
    await driver.sleep(500);
    await driver.findElement(By.xpath(`//*[@id="buttonOK"]`)).click();// 確認資料是否正確

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

    //page 05
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
}*/

/*
async function family() {
    const alertStatus = 0;// 0 = alert , 1 = no alert
    //page 01
    const familyPage = 'https://ap.family.com.tw/V3/Member/Login?mem_infoREYI=Ti2s5PMxPhkafJpPPXHbjwRpRu5ZXig48E%2BEWuyaYRwp32UfICUvjdz1cVcTE2IguUwxvpyUVKlS6k2QlbcMfVtzRyVOdgGzjJG05%2Bi41vaVGIBCf2bRyFEUBdCEh%2Bf2jyX9bS3E3lq%2BtCTxvcniLI1Ltuct%2BZtgeScgzoG6nro%3D';// family package value page
    await driver.get(familyPage);
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="account"]`))).sendKeys(process.env.PHONE_NUMBER);
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="password"]`))).sendKeys(process.env.PASSWORD);
    await driver.sleep(1000);
    await fs.writeFileSync('./CaptchaImage.png',// 截圖完後儲存成 CaptchaImage.png
        await driver.findElement(By.className('captcha-img')).takeScreenshot(true)
        , 'base64');

    // 圖片解析
    const targetFilename = 'CaptchaImage.png';
    const image = await Jimp.read(targetFilename);
    await image.resize(560, 200).crop(30, 0, 80, 200).write('1.png');
    const image2 = await Jimp.read(targetFilename);
    await image2.resize(560, 200).crop(120, 0, 80, 200).write('2.png');
    const image3 = await Jimp.read(targetFilename);
    await image3.resize(560, 200).crop(200, 0, 80, 200).write('3.png');
    const image4 = await Jimp.read(targetFilename);
    await image4.resize(560, 200).crop(280, 0, 80, 200).write('4.png');
    const image5 = await Jimp.read(targetFilename);
    await image5.resize(560, 200).crop(360, 0, 80, 200).write('5.png');
    const image6 = await Jimp.read(targetFilename);
    await image6.resize(560, 200).crop(440, 0, 80, 200).write('6.png');

    const results = [];
    const worker = createWorker({
        //logger: m => console.log(m),
    });
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    await worker.setParameters({
        tessedit_char_whitelist: '0123456789ABCDEFGHIJKLMNPQRSTUVWXYZf', // 拿掉大寫O和 a-z
    });
    results.push(await worker.recognize('1.png'));
    results.push(await worker.recognize('2.png'));
    results.push(await worker.recognize('3.png'));
    results.push(await worker.recognize('4.png'));
    results.push(await worker.recognize('5.png'));
    results.push(await worker.recognize('6.png'));

    const result = results.map((res) => res.data.text.toUpperCase().replace('\n', '')).join('').replace(' ', '');
    //console.log(result);

    await driver.wait(until.elementLocated(By.xpath(`//*[@id="captcha"]`))).sendKeys(result);
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="btn_login"]`))).click();

    //try {
    //console.log(await driver.switchTo().alert().getText());
    //    await driver.switchTo().alert().getText();
    //    await driver.switchTo().alert().accept();
    //    await driver.sleep(500);
    // add func to page 01
    //} catch (error) {
    //console.log("SUCCESS!!");
    //    alertStatus = 1;
    //}
    //console.log(alertStatus)
    //console.log("END!!");
    //driver.switchTo().alert().getText();

    // page 02
    await driver.switchTo().frame(0);
    await driver.wait(until.elementLocated(By.xpath(`/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/form/table/tbody/tr[2]/td/table/tbody/tr[2]/td/table/tbody/tr[4]/td/a`))).click();

    // page 03
    await driver.wait(until.elementLocated(By.xpath(`/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/form/table/tbody/tr[2]/td/table/tbody/tr[3]/td/table/tbody/tr[2]/td/input`))).sendKeys("寄件人姓名");
    await driver.wait(until.elementLocated(By.xpath(`/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/form/table/tbody/tr[2]/td/table/tbody/tr[3]/td/table/tbody/tr[4]/td/a[2]/img`))).click();

    // page 04
    await driver.wait(until.elementLocated(By.xpath(`/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/form/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[4]/td/a[2]/img`))).click();

    // page 05
    await driver.wait(until.elementLocated(By.xpath(`/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/form/table/tbody/tr[2]/td/table/tbody/tr[3]/td/table/tbody/tr[2]/td/input`))).sendKeys("收件人姓名");
    await driver.wait(until.elementLocated(By.xpath(`/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/form/table/tbody/tr[2]/td/table/tbody/tr[3]/td/table/tbody/tr[4]/td/a[2]/img`))).click();

    // page 06
    await driver.wait(until.elementLocated(By.xpath(`/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/form/table/tbody/tr[2]/td/table/tbody/tr[3]/td/table/tbody/tr[2]/td/input`))).sendKeys("0912345678");
    await driver.wait(until.elementLocated(By.xpath(`/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/form/table/tbody/tr[2]/td/table/tbody/tr[3]/td/table/tbody/tr[4]/td/a[2]/img`))).click();

    // page 07 選擇收件超商
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="buttonContentDiv"]/div[2]/a`))).click();// 台北市
    await driver.sleep(500);
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="buttonContentDiv"]/div[6]/a`))).click();// 內湖區
    await driver.sleep(500);
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="buttonContentDiv"]/div[1]/a`))).click();// 內湖路一段
    await driver.sleep(500);
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="content"]/table/tbody/tr[2]/td/table[2]/tbody/tr[1]/td[2]`))).click();// 全家碧湖店
    await driver.sleep(500);
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="ctl00_ContentPlaceHolder1_checkStore"]`))).click();// 確認商店
    // page 08
    await driver.switchTo().parentFrame();// back to parent frame
    await driver.sleep(500);
    await driver.switchTo().frame(0);
    console.log("success switch to iframe");
    let encodedString = await driver.findElement(By.xpath(`//*[@id="blockDiv"]/div/div[1]`)).takeScreenshot(true);
    await fs.writeFileSync('./num.png', encodedString, 'base64');
    //console.log(await worker.recognize('num.png'));
    //await driver.wait(until.elementLocated(By.xpath(`//*[@id="Text1"]`))).sendKeys("123");
}*/


//sevenC2C();// 取貨不付款-一般材積
//sevenLC2C();// 取貨不付款-120cm材積
//sevenEC2C();// 取貨不付款-經濟交貨便
//sevenC2C_Payment();// 取貨付款-一般材積
//family();