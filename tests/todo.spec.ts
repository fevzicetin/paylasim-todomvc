import { expect, test, type Page } from '@playwright/test';

const firstTodo = 'Rapor yaz';
const secondTodo = 'Sunumu hazırla';

function todoTitles(page: Page) {
  return page.getByTestId('todo-item').getByTestId('todo-title');
}

async function submitTodo(page: Page, title: string) {
  const input = page.getByPlaceholder('What needs to be done?');
  await input.fill(title);
  await input.press('Enter');
}

test.beforeEach(async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/');
});

test('Görevler eklenme sırasıyla görünür', async ({ page }) => {
  await submitTodo(page, firstTodo);
  await submitTodo(page, secondTodo);
  await expect(todoTitles(page)).toHaveText([firstTodo, secondTodo]);
});

test('Görev tamamlanınca aktif görev sayısı azalır', async ({ page }) => {
  await submitTodo(page, firstTodo);
  await submitTodo(page, secondTodo);
  const checkbox = page.getByTestId('todo-item')
    .filter({ hasText: firstTodo }).getByRole('checkbox');
  await checkbox.check();
  await expect(checkbox).toBeChecked();
  await expect(page.getByTestId('todo-count')).toHaveText('1 item left');
});

test('Active, Completed ve All doğru görevleri gösterir', async ({ page }) => {
  await submitTodo(page, firstTodo);
  await submitTodo(page, secondTodo);
  await page.getByTestId('todo-item')
    .filter({ hasText: firstTodo }).getByRole('checkbox').check();

  await page.getByRole('link', { name: 'Active', exact: true }).click();
  await expect(todoTitles(page)).toHaveText([secondTodo]);
  await page.getByRole('link', { name: 'Completed', exact: true }).click();
  await expect(todoTitles(page)).toHaveText([firstTodo]);
  await page.getByRole('link', { name: 'All', exact: true }).click();
  await expect(todoTitles(page)).toHaveText([firstTodo, secondTodo]);
});

test('Silinen görev listeden kalkar', async ({ page }) => {
  await submitTodo(page, firstTodo);
  await submitTodo(page, secondTodo);
  const row = page.getByTestId('todo-item').filter({ hasText: firstTodo });
  await row.hover();
  await row.getByRole('button', { name: 'Delete' }).click();
  await expect(todoTitles(page)).toHaveText([secondTodo]);
});

test('Boş veya yalnızca boşluk içeren görev eklenmez', async ({ page }) => {
  await submitTodo(page, '');
  await expect(todoTitles(page)).toHaveCount(0);
  await submitTodo(page, '   ');
  await expect(todoTitles(page)).toHaveCount(0);
});

test('Tek karakterli görev eklenir', async ({ page }) => {
  await submitTodo(page, 'A');
  await expect(todoTitles(page)).toHaveText(['A']);
});

test('Görev adının başındaki ve sonundaki boşluklar kaldırılır', async ({ page }) => {
  await submitTodo(page, `  ${firstTodo}  `);
  const titles = todoTitles(page);
  await expect(titles).toHaveCount(1);
  await expect(titles).toHaveText(/^Rapor yaz$/);
});

test('Sayfa yenilendiğinde eklenen görev korunur', async ({ page }) => {
  await submitTodo(page, firstTodo);
  await expect(todoTitles(page)).toHaveText([firstTodo]);

  await page.reload();

  await expect(todoTitles(page)).toHaveText([firstTodo]);
});

test('Yalnızca emoji içeren görev eklenir', async ({ page }) => {
  await submitTodo(page, '😀');
  await expect(todoTitles(page)).toHaveText(['😀']);
});

test('Görevdeki beş boşluk ekranda beş boşluk genişliğinde görünür', async ({ page }) => {
  const title = 'Papor yaz     rapor yaz';
  await submitTodo(page, title);
  await expect(todoTitles(page)).toHaveCount(1);
  const item = todoTitles(page).first();
  await expect.poll(() => item.textContent()).toBe(title);
  const widths = await item.evaluate(element => {
    const text = element.firstChild;
    if (!text || text.nodeType !== Node.TEXT_NODE) throw new Error('Görev metni bulunamadı');
    const start = text.textContent!.indexOf('     ');
    if (start < 0) throw new Error('Beş boşluk bulunamadı');
    const range = document.createRange();
    range.setStart(text, start);
    range.setEnd(text, start + 1);
    const one = range.getBoundingClientRect().width;
    range.setEnd(text, start + 5);
    return { one, five: range.getBoundingClientRect().width };
  });
  expect(widths.one, 'Bir boşluğun görsel genişliği sıfır olmamalı').toBeGreaterThan(0);
  expect(widths.five, 'Beş boşluk ekranda beş boşluk genişliğinde görünmeli').toBeGreaterThan(widths.one * 4.5);
});
