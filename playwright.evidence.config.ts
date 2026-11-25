import { defineConfig } from '@playwright/test';

// Eğitim çalıştırması: Her test için tarayıcı videosu ve işlem izi kaydet.
export default defineConfig({
  testDir: './tests',
  workers: 1,
  use: {
    headless: false,
    video: 'on',
    trace: 'on',
    launchOptions: { slowMo: 500 },
  },
});
