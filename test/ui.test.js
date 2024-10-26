import { Builder, By, Key, until } from 'selenium-webdriver';
// Change this line:
import { expect } from 'chai'; // instead of require('chai')


describe('UI Testing using Selenium', function () {
    this.timeout(30000); // Set timeout for Mocha tests

    let driver;
    
    // Inisialisasi WebDriver sebelum menjalankan test case
    before(async function () {
        driver = await new Builder().forBrowser('chrome').build(); // Bisa diganti 'firefox' untuk Firefox
    });
    
    // Tutup WebDriver setelah semua test selesai
    after(async function () {
        await driver.quit();
    });
    
    it('should load the login page', async function () {
        await driver.get('file:///home/verra/Services/selenium-ui-test/login.html'); // Ubah path sesuai lokasi file login.html
        const title = await driver.getTitle();
        expect(title).to.equal('Login Page');
    });

    it('should display login button & input field', async () => {
        const loginForm = await driver.findElement(By.id('loginForm')).isDisplayed()
        const loginButton = await driver.findElement(By.id('loginButton')).isDisplayed()
        expect(loginForm).to.be.true;
        expect(loginButton).to.be.true;
    })

    it('should input username and password', async function () {
        await driver.findElement(By.id('username')).sendKeys('testuser');
        await driver.findElement(By.id('password')).sendKeys('password123');
        const usernameValue = await driver.findElement(By.id('username')).getAttribute('value');
        const passwordValue = await driver.findElement(By.id('password')).getAttribute('value');
        expect(usernameValue).to.equal('testuser');
        expect(passwordValue).to.equal('password123');
    });

    it('should click the login button', async function () {
        await driver.findElement(By.id('loginButton')).click();

        // Validasi tindakan setelah login, seperti validasi login (ini disimulasikan di sini)
        // Misal: validasi pesan error jika login gagal atau redirect halaman jika berhasil
    });

    it('should error login attempt', async () => {
        await driver.findElement(By.id('username')).sendKeys('user');
        await driver.findElement(By.id('password')).sendKeys('password');
        await driver.findElement(By.id('loginButton')).click();
        const errorMessage = await driver.wait(
            until.elementLocated(By.id("errorMessage")),
            5000
        ).getCssValue("display");
        
        expect(errorMessage).to.equal('block')
    })

    it('should input username and password with CSS Selector XPath', async function () {
        await driver.findElement(By.css('#username')).clear();
        await driver.findElement(By.xpath('//*[@id="password"]')).clear();
        await driver.findElement(By.css('#username')).sendKeys('testuser');
        await driver.findElement(By.xpath('//*[@id="password"]')).sendKeys('password123');
        const usernameValue = await driver.findElement(By.id('username')).getAttribute('value');
        const passwordValue = await driver.findElement(By.id('password')).getAttribute('value');
        expect(usernameValue).to.equal('testuser');
        expect(passwordValue).to.equal('password123');
    });

});
