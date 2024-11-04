import { Page, Locator, expect } from '@playwright/test';

export class HeaderElements {
    readonly page: Page;
    readonly logo: Locator;
    readonly menuItems: Locator;
    readonly loginButton: Locator;
    readonly hamburgerButton: Locator;
    readonly whatsappPhone: Locator;
    readonly regularPhone: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logo = page.locator('.header__logo img');
        this.menuItems = page.locator('.header__menu-list li');
        this.loginButton = page.locator('.header__button a');
        this.hamburgerButton = page.locator('.header__hamburger');
        this.whatsappPhone = page.locator('.phone-whatsapp'); // Уточненный селектор для WhatsApp телефона
        this.regularPhone = page.locator('.phone:not(.phone-whatsapp)'); // Уточненный селектор для обычного телефона
    }

    async navigateToMenuItem(itemText: string) {
        const menuItems = await this.menuItems.all();
        for (const item of menuItems) {
            const text = await item.textContent();
            if (text?.trim() === itemText) {
                await item.click();
                break;
            }
        }
    }

    async clickComoAplicarPage() {
        await this.navigateToMenuItem('Como aplicar');
        await this.page.waitForURL('https://credito365.co/como-aplicar/');
    }


    async clickLoginButton() {
        await this.loginButton.click();
    }

    async loginButtonVisibility() {
        await expect(this.loginButton).toBeVisible();
    }

    async clickHamburgerButton() {
        await this.hamburgerButton.click();
    }
    async getWhatsappPhoneNumber() {
        return await this.whatsappPhone.textContent();
    }

    async wappPhoneVisibility() {
        await expect(this.whatsappPhone).toBeVisible();
    }

    async getRegularPhoneNumber() {
        return await this.regularPhone.textContent();
    }

    async regularPhoneVisibility() {
        await expect(this.regularPhone).toBeVisible();
    }

    async getWhatsappPhoneHref() {
        return await this.whatsappPhone.getAttribute('href');
    }

    async getRegularPhoneHref() {
        return await this.regularPhone.getAttribute('href');
    }
}