# Berber Sistem Mimarisi ve İş Akışı

## Genel Bakış

Berber platformu, modüler bir yapıda tasarlanmış olup, GraphQL tabanlı bir backend ve çeşitli frontend uygulamalarından oluşmaktadır.

## Temel Bileşenler

### 1. GraphQL Şema (`@gql`)

- Platform'un veri modelini ve API sözleşmesini tanımlar
- `lib/gql/schema` dizininde bulunur
- Tüm tip tanımlamaları ve şema burada yer alır

### 2. GraphQL Client (`@gql_client`)

- Backend ile iletişim için gerekli query ve mutationları içerir
- `lib/gql/client` dizininde bulunur
- Modüler yapıda (common, user, admin) organize edilmiştir

### 3. Flutter API (`@api`)

- Flutter uygulamaları için temel API araçlarını sağlar
- `lib/flutter-api` dizininde bulunur
- GraphQL client'ı Flutter'da kullanmak için gerekli altyapıyı sunar

### 4. Data Layer'lar

Her bir uygulama tipi için özel data layer'lar:

- `lib/user-data`: Kullanıcı uygulaması için
- `lib/admin-data`: Admin paneli için

### 5. Server Bileşeni

- Akışta gerekirse serverda resolver yazılır
- Kod üretimi sadece `update_data.js` ile halledilebilir
- Şema güncellemeleri `update_data.js` tarafından yönetilir

## Kod Üretim Süreci

### 1. GraphQL Şema Güncelleme

```bash
rover graph introspect http://localhost:3000/graphql
```

### 2. Data Layer Güncelleme

```bash
node tools/update_data.js [org|user|admin]
```

Bu komut sırasıyla:

1. GraphQL şemasını çeker
2. İlgili GraphQL dosyalarını kopyalar
3. Dart kodlarını generate eder
4. Export dosyalarını günceller

### 2. Şema Güncellemeleri

- `update_data.js` kullanılarak otomatik olarak gerçekleştirilir
- Şema değişiklikleri ve güncellemeleri bu dosya üzerinden yapılır

## Araçlar

### 1. update_data.js

- GraphQL şemasını çeker
- GraphQL dosyalarını kopyalar
- build_runner'ı çalıştırır
- Export'ları günceller

### 2. add_exports.dart

- Generated Dart dosyalarını tarar
- Export edilecek tipleri belirler
- Ana export dosyasını oluşturur

## Geliştirme Akışı

1. GraphQL şemasında değişiklik yapılır (`@gql`)
2. Query/Mutation'lar güncellenir (`@gql_client`)
3. Data layer'lar güncellenir:
   ```bash
   node tools/update_data.js org
   node tools/update_data.js user
   node tools/update_data.js admin
   ```
4. Flutter uygulamaları güncellenen API'yi kullanır

## Önemli Noktalar

1. Modüler Yapı

   - Her bileşen bağımsız bir modül
   - Açık ve net bağımlılık yönetimi
   - Kolay bakım ve güncelleme

2. Kod Üretimi

   - Otomatik kod üretimi ile hata riskini azaltma
   - Tutarlı API kullanımı
   - Tip güvenliği

3. Versiyon Kontrolü
   - Her modül ayrı bir git repository'si
   - Bağımlılıklar git submodule ile yönetilir
   - Senkronize versiyon yönetimi
