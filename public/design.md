# Lang-Assist Design System

Bu doküman, Lang-Assist uygulamalarının tasarım sistemini özetler. Detaylı bilgi için [Flutter Styling Guide](./flutter_styling_guide.md) ve [Flutter Design Guide](./flutter_design_guide.md) dokümanlarına bakabilirsiniz.

## Genel Bakış

Lang-Assist tasarım sistemi, tutarlı ve kullanıcı dostu bir deneyim sağlamak için tasarlanmış kapsamlı bir bileşen ve stil kütüphanesidir. Bu sistem, hem açık hem de koyu tema desteği sunar ve tüm platformlarda tutarlı bir görünüm sağlar.

## Tasarım Prensipleri

1. **Tutarlılık**: Tüm platformlarda ve uygulamalarda tutarlı bir kullanıcı deneyimi
2. **Erişilebilirlik**: Tüm kullanıcılar için erişilebilir arayüzler
3. **Sadelik**: Kullanıcıların kolayca anlayabileceği basit ve sezgisel arayüzler
4. **Hiyerarşi**: Görsel hiyerarşi ile kullanıcıları yönlendirme
5. **Geri Bildirim**: Kullanıcı etkileşimlerine anlamlı geri bildirimler

## Renk Sistemi

Lang-Assist, doğadan ilham alan bir renk paletine sahiptir:

```mermaid
graph TD
    A[Renk Sistemi] --> B[Ana Renkler]
    A --> C[Durum Renkleri]
    A --> D[Nötr Renkler]

    B --> B1[Primary: #638738]
    B --> B2[Secondary: #94683D]
    B --> B3[Accent: #D4A373]

    C --> C1[Success: #638738]
    C --> C2[Warning: #E9B949]
    C --> C3[Error: #D62828]
    C --> C4[Info: #457B9D]

    D --> D1[Surface]
    D --> D2[Text]
    D --> D3[Grey]

    style B1 fill:#638738,color:white
    style B2 fill:#94683D,color:white
    style B3 fill:#D4A373,color:black
    style C1 fill:#638738,color:white
    style C2 fill:#E9B949,color:black
    style C3 fill:#D62828,color:white
    style C4 fill:#457B9D,color:white
```

## Tipografi

Nunito font ailesini kullanan, okunabilir ve tutarlı bir tipografi sistemi:

| Stil     | Boyut   | Kullanım Alanları                  |
| -------- | ------- | ---------------------------------- |
| Display  | 32-48px | Büyük başlıklar, hero alanları     |
| Headline | 20-28px | Sayfa başlıkları, bölüm başlıkları |
| Title    | 16-20px | Kart başlıkları, alt başlıklar     |
| Body     | 12-16px | Ana içerik metni                   |
| Label    | 12-16px | Butonlar, etiketler                |

## Boşluk ve Ölçüler

Tutarlı bir arayüz için standartlaştırılmış değerler:

| Değer | Boyut | Kullanım Alanları   |
| ----- | ----- | ------------------- |
| xxs   | 2.0   | Minimum ayrım       |
| xs    | 4.0   | İkon içi boşluklar  |
| sm    | 8.0   | Küçük boşluklar     |
| md    | 16.0  | Standart boşluklar  |
| lg    | 24.0  | Bölüm araları       |
| xl    | 32.0  | Büyük bölüm araları |
| xxl   | 40.0  | Maksimum boşluklar  |

## Temel Bileşenler

### Scaffold Yapıları

- **AppScaffold**: Ana uygulama sayfaları için
- **UserScaffold**: Mobil uygulamada kullanıcı arayüzü için (kullanıcı avatarı, navigasyon menüsü ve profil yönetimi içerir)
- **AuthScaffold**: Kimlik doğrulama sayfaları için
- **AppTabView**: Sekmeli içerik için
- **BrocaBackground**: Özel arka plan deseni

### Butonlar

- **AppButton**: Çeşitli varyantlar (primary, secondary, outlined, text, danger, highlighted, icon)
- **Boyutlar**: small, medium, large

### Form Elemanları

- **AppFormField**: Metin girişi, şifre, sayı vb.
- **AppCheckbox**: Onay kutuları
- **AppRadio**: Radyo butonları
- **AppSelectCard**: Seçim kartları

### Kartlar

- **AppCard**: İçerik gruplamak için
- **ChoiceCard**: Seçim yapılabilir kartlar

### Diğer Bileşenler

- **AIIndicator**: AI işlemlerinin durumunu göstermek için
- **Avatar**: Kullanıcı avatarları

## Sayfa Şablonları

- **Giriş/Kayıt Sayfaları**: Kimlik doğrulama için
- **Liste Sayfaları**: Veri listelerini göstermek için
- **Detay Sayfaları**: Tek bir öğenin detaylarını göstermek için
- **Form Sayfaları**: Veri girişi için

## Bileşen Hiyerarşisi

```mermaid
graph TD
    A[Lang-Assist Tasarım Sistemi] --> B[Temel Bileşenler]
    A --> C[Kompozit Bileşenler]
    A --> D[Sayfa Şablonları]

    B --> B1[Renkler]
    B --> B2[Tipografi]
    B --> B3[Boşluklar]
    B --> B4[İkonlar]

    C --> C1[Butonlar]
    C --> C2[Form Elemanları]
    C --> C3[Kartlar]
    C --> C4[Göstergeler]

    D --> D1[Giriş Sayfaları]
    D --> D2[Liste Sayfaları]
    D --> D3[Detay Sayfaları]
    D --> D4[Form Sayfaları]

    style B1 fill:#638738,color:white
    style B2 fill:#94683D,color:white
    style B3 fill:#D4A373,color:black
    style C1 fill:#457B9D,color:white
    style D1 fill:#E9B949,color:black
```

## Kullanım Örnekleri

### Mobil Uygulama Scaffold Örneği

```dart
UserScaffold(
  title: 'Ana Sayfa',
  body: ListView(
    padding: EdgeInsets.all(AppSpacing.md),
    children: [
      Text('Hoş Geldiniz', style: typo.headlineMedium),
      SizedBox(height: AppSpacing.md),
      AppCard(
        title: Text('Yaklaşan Randevular', style: typo.titleMedium),
        subtitle: Text('Bugün 2 randevunuz var', style: typo.bodySmall),
        isInteractive: true,
        onTap: () {
          // Randevular sayfasına git
        },
      ),
    ],
  ),
)
```

### Buton Örneği

```dart
AppButton(
  title: 'Kaydet',
  variant: AppButtonVariant.primary,
  size: AppSizeVariant.medium,
  onPressed: () {},
)
```

### Kart Örneği

```dart
AppCard(
  title: Text('Kart Başlığı', style: typo.titleMedium),
  subtitle: Text('Alt başlık metni', style: typo.bodySmall),
  isInteractive: true,
  onTap: () {},
)
```

### Form Alanı Örneği

```dart
AppFormField(
  label: 'E-posta',
  placeholder: 'ornek@email.com',
  name: 'email',
)
```

## Tema Desteği

Lang-Assist, açık ve koyu tema desteği sunar. Tema, `ThemeProvider` sınıfı üzerinden yönetilir:

```dart
// Tema değiştirme
ThemeProvider.instance.setBrightness(Brightness.dark)
```

## Daha Fazla Bilgi

- [Flutter Styling Guide](./flutter_styling_guide.md): Renk, tipografi, boşluk ve diğer stil öğeleri hakkında detaylı bilgi
- [Flutter Design Guide](./flutter_design_guide.md): Bileşenler, sayfa şablonları ve tasarım prensipleri hakkında detaylı bilgi

---

Bu doküman, Lang-Assist tasarım sisteminin genel bir özetini sunar. Daha detaylı bilgi için ilgili dokümanlara başvurunuz.
