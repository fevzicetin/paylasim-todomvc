# TodoMVC Playwright testleri

Bu projede TodoMVC uygulaması için Playwright ve TypeScript ile hazırlanmış 10 otomatik test bulunur. Test planı `specs/todo-test-plan.md`, test kodu `tests/todo.spec.ts` dosyasındadır.

## Kurulum

Node.js kurulu bir bilgisayarda proje klasöründe aşağıdaki komutları çalıştırın:

```powershell
npm ci
npx.cmd playwright install chromium
```

Windows dışındaki sistemlerde `npx.cmd` yerine `npx` kullanın.

## Testleri çalıştırma

```powershell
npx.cmd playwright test tests/todo.spec.ts --workers=1
```

Son doğrulamada 9 test geçti ve beş boşluğun ekranda görünmesini kontrol eden test başarısız oldu: uygulama boşlukları metinde saklıyor ancak ekranda tek boşluk genişliğinde gösteriyor. Bu senaryonun beklentisi eğitim amacıyla belirlenmiştir.

## Video ile çalıştırma

```powershell
npx.cmd playwright test tests/todo.spec.ts --config=playwright.evidence.config.ts --workers=1
```

Bu ayar görünür tarayıcı, video ve işlem izi üretir. Test verileri demo uygulamasına gönderilir. Kayıtlar kişisel bilgiler içerebileceğinden paylaşmadan önce incelenmelidir.
