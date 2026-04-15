import { test, expect } from '@playwright/test';

const ORDER_PATH = '/components/order/order.html';
const LOGIN_PATH = '/components/login/login.html';
const API_ORDERS = 'https://api.fullstackfamily.com/api/gentlelion/v1/orders';

test.describe('결제 페이지', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_PATH);
    await page.locator('#emailInput').fill('123@123.com');
    await page.locator('#pwInput').fill('123');

    await Promise.all([
      page.waitForURL('/'),
      page.locator('button[type="submit"]').click(),
    ]);
  });

  test('구매 버튼 클릭 시 주문 API가 호출되고 홈으로 이동한다', async ({ page }) => {
    let requestBody = null;
    await page.route(API_ORDERS, async route => {
      requestBody = JSON.parse(route.request().postData());
      const response = await route.fetch();
      await route.fulfill({ response });
    });

    await page.goto(ORDER_PATH);

    await page.waitForSelector('.order-checkout-btn', { state: 'attached' });

    // 세 조건 모두 선택
    await page.locator('#addressBtn').click();
    await page.locator('#shippingBtn').click();
    await page.locator('#paymentBtn').click();

    // 화면에 실제로 보이는 버튼만 선택
    const checkoutBtn = page.locator('.order-checkout-btn:visible').first();
    await expect(checkoutBtn).toBeEnabled({ timeout: 10000 });
    await checkoutBtn.click();

    // API 요청 body 검증
    expect(requestBody).not.toBeNull();
    expect(requestBody.items).toBeDefined();
    expect(requestBody.shippingAddress).toBeDefined();
    expect(requestBody.paymentMethod).toBe('points');

    // 주문 성공 후 홈으로 이동
    await expect(page).toHaveURL('/', { timeout: 10000 });
  });

});