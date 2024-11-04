import { Page, Locator } from '@playwright/test';

export class HomePageElements {
    readonly page: Page;
    readonly heroBannerTitle: Locator;
    readonly calculatorButton: Locator;
    readonly calculatorCurrentValue: Locator;
    readonly advantagesTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.heroBannerTitle = page.locator('.hero-banner__title');
        this.calculatorButton = page.locator('.calculator-elem__btn a');
        this.calculatorCurrentValue = page.locator('.calculator-elem__current .input_wrapper');
        this.advantagesTitle = page.locator('.advantages .section-title'); 
    }

    async getHeroBannerTitle() {
        return await this.heroBannerTitle.textContent();
    }

    async clickCalculatorButton() {
        await this.calculatorButton.click();
    }

    async getCalculatorCurrentValue() {
        return await this.calculatorCurrentValue.textContent();
    }

    async getAdvantagesTitle() {
        return await this.advantagesTitle.textContent();
    }
}