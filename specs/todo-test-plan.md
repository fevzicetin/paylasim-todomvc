# TodoMVC test planı

Uygulama: https://demo.playwright.dev/todomvc/

Her senaryo temiz bir tarayıcı bağlamında başlar. Senaryo kendi görevlerini oluşturur.

| Tür | Senaryo | Beklenen sonuç | MCP ile gözlenen |
| --- | --- | --- | --- |
| Pozitif | `Rapor yaz` ve `Sunumu hazırla` görevlerini Enter ile ekle. | İki görev eklenme sırasıyla görünür. | İki görev aynı sırayla göründü. |
| Pozitif | İki görev ekle ve ilkini tamamla. | İlk onay kutusu işaretlenir ve aktif görev sayısı bire iner. | İlk kutu işaretlendi ve sayaç `1 item left` gösterdi. |
| Pozitif | Biri tamamlanmış iki görev oluştur. Active, Completed ve All filtrelerini sırayla seç. | Active yalnızca aktif görevi, Completed yalnızca tamamlanan görevi, All ikisini gösterir. | Active: `Sunumu hazırla`. Completed: `Rapor yaz`. All: ikisi birden. |
| Pozitif | İki görev oluştur. İlkinin üzerine gel ve Delete düğmesine tıkla. | Silinen görev listeden kalkar ve ikinci görev görünmeye devam eder. | Yalnızca `Sunumu hazırla` kaldı. |
| Negatif | Boş bir değerle ve yalnızca boşluklarla Enter'a bas. | İki denemede de görev eklenmez. | Görev sayısı sıfır kaldı. |
| Sınır | Tek karakterli `A` görevini ekle. | Görev adı `A` olarak görünür. | Görev adı `A` olarak göründü. |
| Girdi biçimi | Başında ve sonunda boşluk olan `  Rapor yaz  ` görevini ekle. | Dış boşluklar kaldırılır ve başlık `Rapor yaz` görünür. | Başlık `Rapor yaz` olarak göründü. |
| Kalıcılık | Bir görev ekleyip sayfayı yenile. | Görev yenilemeden sonra listede kalır. | Otomatik testle kontrol edilir. |
| Özel karakter | Yalnızca `😀` içeren görev ekle. | Emoji görev başlığı olarak korunur. | Otomatik testle kontrol edilir. |
| Görsel boşluk | `Papor yaz` ile `rapor yaz` arasına beş boşluk koyarak görevi ekle. | Beş boşluk metinde korunur ve ekranda beş boşluk genişliğinde görünür. | Otomatik testle ham metin ve ekrandaki genişlik ayrı kontrol edilir. |

Girdi için azami uzunluk gereksinimi verilmedi. Azami uzunluk hakkında assertion eklemeden önce ürün beklentisi netleştirilmeli.
Emoji ve iç boşluk beklentileri eğitim için seçilmiştir; ürünün resmî gereksinimleri doğrulanmadığından bunlar onaylanmış ürün kuralları değildir. Beş boşluk senaryosunda ham metnin yanında ekrandaki genişlik de kontrol edilir; boşluklar görsel olarak birleşirse test başarısız olur.

## Otomasyonda kullanılacak öğeler

- Yeni görev alanı: `What needs to be done?` yer tutucusu.
- Görev satırı, başlık ve sayaç: sırasıyla `todo-item`, `todo-title`, `todo-count` test kimlikleri.
- Tamamlama kutusu ve Delete düğmesi: ilgili görev satırı içinde.
- Filtreler: tam adlarıyla All, Active ve Completed bağlantıları.
