import { test, expect } from '@playwright/test';
import { HomePageElements } from './pages/HomePageElements';
import { HeaderElements} from './pages/HeaderElements';


test.describe('Credito365 Tests', () => {
    let header: HeaderElements;
    let home: HomePageElements;

    test.beforeEach(async ({ page }) => {
        await page.goto('https://credito365.co/');
        header = new HeaderElements(page);
        home = new HomePageElements(page);
    });

    test('Header elements are present', async ({ page }) => {
        // Проверка наличия логотипа
        await expect(header.logo).toBeVisible();


        // Проверка наличия пунктов меню
        expect(header.navigateToMenuItem.length).toBeGreaterThan(0);


        // Проверка наличия телефона WhatsApp
        const whatsappPhoneNumber = await header.getWhatsappPhoneNumber();
        expect(whatsappPhoneNumber).toContain('3044404600');
        const whatsappPhoneHref = await header.getWhatsappPhoneHref();
        expect(whatsappPhoneHref).toContain('https://wa.me/+573044404600');

        // Проверка наличия обычного телефона
        const regularPhoneNumber = await header.getRegularPhoneNumber();
        expect(regularPhoneNumber).toContain('3330333060');
        const regularPhoneHref = await header.getRegularPhoneHref();
        expect(regularPhoneHref).toContain('tel:3330333060');
    });

    test('Navigate to "Como aplicar" page', async ({ page }) => {
        await header.navigateToMenuItem('Como aplicar');
        await page.waitForURL('https://credito365.co/como-aplicar/');
        expect(page.url()).toContain('como-aplicar');
    });

    test('Home page elements are present', async ({ page }) => {
        // Проверка наличия заголовка баннера
        const heroBannerTitle = await home.getHeroBannerTitle();
        expect(heroBannerTitle).toContain('Crédito Online en solo unos minutos');

        // Проверка наличия кнопки "Continuar" в калькуляторе
        await expect(home.calculatorButton).toBeVisible();
        const calculatorCurrentValue = await home.getCalculatorCurrentValue();
        expect(calculatorCurrentValue).toContain('200 000'); 

        // Проверка наличия заголовка "Nuestras ventajas"
        const advantagesTitle = await home.getAdvantagesTitle();
        expect(advantagesTitle).toContain('Nuestras ventajas');
    });
});