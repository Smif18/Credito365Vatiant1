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

        // Проверка наличия кнопки "Iniciar sesión"
        await expect(header.loginButton).toBeVisible();

        // Проверка наличия телефона WhatsApp
        expect(header.getWhatsappPhoneNumber).toContain('3044404600');
        expect(header.getWhatsappPhoneHref).toContain('https://wa.me/+573044404600');

        // Проверка наличия обычного телефона
        expect(header.getRegularPhoneNumber).toContain('3330333060');
        expect(header.getRegularPhoneHref).toContain('tel:3330333060');
    });

    test('Navigate to "Como aplicar" page', async ({ page }) => {
        expect(page.url()).toContain('como-aplicar');
    });

    test('Home page elements are present', async ({ page }) => {
        // Проверка наличия заголовка баннера
        expect(home.getHeroBannerTitle).toContain('Crédito Online en solo unos minutos');

        // Проверка наличия кнопки "Continuar" в калькуляторе
        await expect(home.calculatorButton).toBeVisible();

        // Проверка значения по умолчанию на калькуляторе
        expect(home.getCalculatorCurrentValue).toContain('200 000'); 

        // Проверка наличия заголовка "Nuestras ventajas"
        expect(home.getAdvantagesTitle).toContain('Nuestras ventajas');
    });
});