import { test, expect } from '@playwright/test';

test.describe('Halaman Beranda MoodUp', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8087'); // Sesuaikan port jika pakai live server
  });

  test('Judul halaman sesuai', async ({ page }) => {
    await expect(page).toHaveTitle(/MoodUp/);
  });

  test('Hamburger menu terbuka saat diklik (mobile)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 }); // Ukuran mobile
    await page.locator('#toggleOpen').click();
    await expect(page.locator('#collapseMenu')).not.toHaveClass(/hidden/);
  });

  test('Navigasi ke halaman Quiz', async ({ page }) => {
    await page.click('text=Mulai Sekarang');
    await expect(page).toHaveURL(/pre-quiz\.html/);
  });

  test('Bagian hero memiliki teks yang benar', async ({ page }) => {
    const heading = page.locator('section#hero h2');
    await expect(heading).toContainText('Temukan Tingkat Stres Anda');
  });

  test('Semua logo institusi terpercaya tampil', async ({ page }) => {
    const logos = page.locator('section#hero img[alt$="-logo"]');
    await expect(logos).toHaveCount(4);
    await logos.all().then(async logoList => {
      for (const logo of logoList) {
        await expect(logo).toBeVisible();
      }
    });
  });
});

