# Lang Assist İkon Kılavuzu

## 1. Temel Prensipler

### 1.1 Tasarım Dili

- Minimalist ve modern çizgiler
- Tutarlı stil ve oranlar
- Net ve anlaşılır semboller
- Eğitim odaklı tasarım

### 1.2 Grid Sistemi

#### Boyut Standardı

- Grid: 24x24 pixel
- Safe area: 20x20 pixel
- Stroke width: 1.75px
- Corner radius: 2px
- Minimum detay boyutu: 2px

### 1.3 Stroke Özellikleri

#### Kalınlık

- Ana çizgiler: 1.75px
- İç detaylar: 1.25px
- Dekoratif elementler: 1px

#### Köşeler

- Dış köşeler: 2px radius
- İç köşeler: 1px radius
- Keskin köşeler: Özel durumlarda

#### Uç Noktaları

- Round cap tercih edilmeli
- Butt cap özel durumlarda
- Square cap kullanılmamalı

### 1.4 Boşluk ve Hizalama

#### Padding

- Dış kenar: 4px minimum
- İç elementler arası: 2px minimum
- Merkez alan: 2px güvenli boşluk

#### Hizalama

- Dikey/yatay merkez
- Pixel-perfect hizalama
- Optik düzeltmeler gerektiğinde

## 2. İkon Kategorileri

### 2.1 Navigasyon İkonları

#### Özellikler

- Basit ve net formlar
- Tek stroke kalınlığı
- Minimum detay
- Universal semboller

#### Örnekler

- Home: Basit ev silueti
- Back: Sol ok
- Menu: 3 yatay çizgi
- Close: X işareti

### 2.2 Aksiyon İkonları

#### Özellikler

- Dinamik formlar
- Aksiyon belirten şekiller
- İşlevi yansıtan tasarım
- Aktif/pasif durumlar

#### Örnekler

- Add: + işareti (circle içinde)
- Delete: Çöp kutusu
- Edit: Kalem
- Save: Disk/check işareti

### 2.3 Durum İkonları

#### Özellikler

- Net renk kullanımı
- Evrensel semboller
- Boyut tutarlılığı
- Anlık algı

#### Örnekler

- Success: Check işareti
- Error: Ünlem işareti
- Warning: Üçgen ünlem
- Info: i harfi

### 2.4 Öğrenme İkonları

#### Özellikler

- Eğitim temalı semboller
- Basit ve anlaşılır
- Motive edici tasarım
- Tutarlı stil

#### Örnekler

- Lesson: Kitap/not defteri
- Practice: Kalem ve kağıt
- Quiz: Soru işareti
- Achievement: Yıldız/rozet

## 3. Teknik Özellikler

### 3.1 SVG Formatı

#### Yapı

- viewBox="0 0 24 24"
- Stroke-based tasarım
- Fill minimum kullanım
- Path optimizasyonu

#### Export Ayarları

- SVG versiyonu: 1.1
- Decimal: 1
- Minify: true
- Pretty: false

### 3.2 Renk Kullanımı

#### Ana Renkler

- Stroke: currentColor
- Fill: none (default)
- Opacity: 1 (default)

#### Özel Durumlar

- Solid areas: currentColor
- Gradients: Kullanılmaz
- Multiple colors: Özel durumlarda

### 3.3 Optimizasyon

#### SVGO Ayarları

```yaml
plugins:
  - removeXMLNS: true
  - removeViewBox: false
  - removeDimensions: true
  - cleanupIDs: true
  - removeUselessStrokeAndFill: true
  - removeEmptyAttrs: true
  - removeEmptyText: true
  - removeEmptyContainers: true
  - removeHiddenElems: true
  - removeTitle: true
  - removeDesc: true
  - removeEditorsNSData: true
  - removeEmptyText: true
  - removeUnusedNS: true
  - minifyStyles: true
  - convertStyleToAttrs: true
  - cleanupNumericValues:
      floatPrecision: 1
  - convertColors:
      currentColor: true
```

### 3.4 Dosya Organizasyonu

#### İsimlendirme Standardı

1. Format:

   ```
   {name}.svg
   ```

2. İsimlendirme Örnekleri:
   ```
   home.svg
   edit.svg
   success.svg
   lesson.svg
   ```

#### Dizin Yapısı

```
assets/
└── icons/
    ├── navigation/
    ├── action/
    ├── state/
    └── learning/
    --- other categories
```

## 4. Flutter Entegrasyonu

### 4.1 Asset Yapısı

```yaml
flutter:
  assets:
    - assets/icons/navigation/
    - assets/icons/action/
    - assets/icons/state/
    - assets/icons/learning/
```

### 4.2 Kullanım

```dart
// Icon widget
SvgPicture.asset(
  'assets/icons/navigation/home.svg',
  width: 24,
  height: 24,
  color: AppColors.primary,
)

// Custom icon widget
class AppIcon extends StatelessWidget {
  final String name;
  final String category;
  final Color? color;
  final double size;

  const AppIcon({
    required this.name,
    required this.category,
    this.color,
    this.size = 24,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SvgPicture.asset(
      'assets/icons/$category/$name.svg',
      width: size,
      height: size,
      color: color ?? Theme.of(context).iconTheme.color,
    );
  }
}

// Kullanım örneği
AppIcon(
  category: 'navigation',
  name: 'home',
  color: AppColors.primary,
  size: 24,
)
```
