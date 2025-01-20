# Berber Utils Kullanım Kılavuzu

## Hızlı Başlangıç

Berber Utils, projelerinizde kullanabileceğiniz hazır UI bileşenleri ve yardımcı fonksiyonlar sunar.

```dart
import 'package:assist_utils/assist_utils.dart';
```

## Tasarım Sistemi

### 1. Renkler (AppColors)

```dart
// Ana Renkler
AppColors.primary     // Color(0xFF2C3E50) - Koyu mavi
AppColors.secondary   // Color(0xFF1ABC9C) - Turkuaz
AppColors.accent      // Color(0xFFE74C3C) - Kırmızı

// Nötr Renkler
AppColors.background  // Color(0xFFF5F6F9) - Arka plan
AppColors.surface     // Color(0xFFFFFFFF) - Yüzey
AppColors.textPrimary // Color(0xFF2C3E50) - Ana metin
AppColors.textSecondary // Color(0xFF7F8C8D) - İkincil metin
AppColors.grey        // Color(0xFF7F8C8D) - Gri

// Durum Renkleri
AppColors.success     // Color(0xFF2ECC71) - Başarılı
AppColors.warning     // Color(0xFFF1C40F) - Uyarı
AppColors.error       // Color(0xFFE74C3C) - Hata
AppColors.info        // Color(0xFF3498DB) - Bilgi

// Gölgelendirme
AppColors.shadow      // Color(0x1A000000) - %10 siyah
AppColors.highlightShadow // Color(0xFF2980B9) - Highlight gölge

// Gradients
AppColors.primaryGradient   // [Color(0xFF2C3E50), Color(0xFF3498DB)]
AppColors.highlightGradient // [Color(0xFF1ABC9C), Color(0xFF2980B9), Color(0xFF8E44AD)]

// Yüzey Varyantları
AppColors.surfaceVariant    // Color(0xFFF4F4F5)
AppColors.outlineVariant    // Color(0xFFE4E4E7)
AppColors.onSurface         // Color(0xFF18181B)
```

### 2. Tipografi (AppTypography)

```dart
// Display Styles
AppTypography.displayLarge  // 32px, bold, height: 1.2
AppTypography.displayMedium // 28px, semi-bold, height: 1.2
AppTypography.displaySmall  // 24px, semi-bold, height: 1.2

// Headline Styles
AppTypography.headlineLarge  // 28px, bold, height: 1.2
AppTypography.headlineMedium // 24px, bold, height: 1.2
AppTypography.headlineSmall  // 20px, bold, height: 1.2

// Title Styles
AppTypography.titleLarge    // 20px, semi-bold, height: 1.2
AppTypography.titleMedium   // 18px, semi-bold, height: 1.2
AppTypography.titleSmall    // 16px, semi-bold, height: 1.2

// Body Styles
AppTypography.bodyLarge     // 16px, regular, height: 1.5
AppTypography.bodyMedium    // 14px, regular, height: 1.5
AppTypography.bodySmall     // 12px, regular, height: 1.5

// Label Styles
AppTypography.labelLarge    // 14px, medium, letterSpacing: 0.5
AppTypography.labelMedium   // 12px, medium, letterSpacing: 0.5
AppTypography.labelSmall    // 10px, medium, letterSpacing: 0.5

// Font Ailesi
static const String fontFamily = 'Poppins'
```

### 3. Boyutlar ve Boşluklar

#### Boşluklar (AppSpacing)

```dart
// Temel Boşluklar
AppSpacing.xxs  // 2.0
AppSpacing.xs   // 4.0
AppSpacing.sm   // 8.0
AppSpacing.md   // 16.0
AppSpacing.lg   // 24.0
AppSpacing.xl   // 32.0
AppSpacing.xxl  // 40.0

// Özel Boşluklar
AppSpacing.buttonHeight   // 48.0
AppSpacing.inputHeight    // 48.0
AppSpacing.cardPadding   // 16.0 (md)
AppSpacing.sectionSpacing // 32.0 (xl)
AppSpacing.pageMargin    // 24.0 (lg)

// Border Radius
AppSpacing.radiusXs    // 4.0
AppSpacing.radiusSm    // 8.0
AppSpacing.radiusMd    // 12.0
AppSpacing.radiusLg    // 16.0
AppSpacing.radiusXl    // 24.0

// Elevation
AppSpacing.elevationXs // 2.0
AppSpacing.elevationSm // 4.0
AppSpacing.elevationMd // 8.0
AppSpacing.elevationLg // 16.0
AppSpacing.elevationXl // 24.0
```

### 4. İkonlar (ImgGenIcons)

```dart
// Sosyal Medya İkonları
ImgGenIcons.google()
ImgGenIcons.apple()

// Sistem İkonları
ImgGenIcons.email()
ImgGenIcons.back()
ImgGenIcons.close()
ImgGenIcons.next()
ImgGenIcons.pwdVisibility(true)  // visible/notVisible

// İkon Özelleştirme
ImgGenIcons.google(size: 24, color: AppColors.primary)
ImgGenIcons.email(size: 20, color: AppColors.secondary)
```

## UI Bileşenleri

### 1. Butonlar (AppButton)

```dart
// Varyantlar
AppButtonVariant.primary
AppButtonVariant.secondary
AppButtonVariant.outlined
AppButtonVariant.text
AppButtonVariant.danger
AppButtonVariant.highlighted

// Boyutlar
AppButtonSize.small   // height: 32.0
AppButtonSize.medium  // height: 40.0
AppButtonSize.large   // height: 48.0

AppButton(
  title: Text('Kaydet'),
  onPressed: () {},
  variant: AppButtonVariant.primary,
  size: AppButtonSize.medium,
  prefixIcon: Icon(Icons.save),
  isLoading: false,
  isFullWidth: false,
)
```

### 2. Form Elemanları

#### Checkbox

```dart
final isChecked = Signal(false);

AppCheckbox(
  signal: isChecked,
  label: "Onaylıyorum",
  gradient: AppGradients.primary,
);
```

#### Radio

```dart
final selectedValue = Signal<String?>(null);

AppRadio<String>(
  signal: selectedValue,
  value: "option1",
  label: "Seçenek 1",
  gradient: AppGradients.primary,
);
```

#### Select Card

```dart
final selectedCard = Signal<String?>(null);

AppSelectCard<String>(
  signal: selectedCard,
  value: "card1",
  title: "Kart 1",
  subtitle: "Açıklama",
  gradient: AppGradients.primary,
);
```

## Tema Kullanımı

```dart
MaterialApp(
  theme: AppTheme.lightTheme,
  darkTheme: AppTheme.darkTheme,
  themeMode: ThemeMode.system,
)
```

## Önemli Notlar

- Tüm widgetlar Material 3 tasarım prensiplerine uyumludur
- Form validasyonları Türkçe hata mesajları içerir
- Tüm ikonlar SVG formatındadır ve boyutlandırılabilir
- Tema renkleri ve ölçüleri Berber tasarım sistemine göre ayarlanmıştır
- Tipografi için varsayılan font ailesi Poppins'tir
- Tüm ölçü ve boşluk değerleri 4'ün katları olacak şekilde tasarlanmıştır
- Gradient ve gölge değerleri özel tasarlanmış efektler içerir

## Form Bileşenleri

### Signal Entegrasyonu (Yeni)

Tüm form bileşenleri artık Signal entegrasyonu ile gelir:

#### AppCheckbox

```dart
// Eski kullanım
AppCheckbox(
  value: true,
  onChanged: (value) {},
  label: 'Kabul Ediyorum',
  isActive: true,
  size: 20.0,
)

// Yeni kullanım (Signal)
final isChecked = Signal(false);

AppCheckbox(
  signal: isChecked,
  label: "Onaylıyorum",
  gradient: AppGradients.primary,
);
```

#### AppRadio

```dart
// Eski kullanım
AppRadio<String>(
  value: 'option1',
  groupValue: selectedValue,
  onChanged: (value) {},
  label: 'Seçenek 1',
  isActive: true,
  size: 20.0,
)

// Yeni kullanım (Signal)
final selectedValue = Signal<String?>(null);

AppRadio<String>(
  signal: selectedValue,
  value: "option1",
  label: "Seçenek 1",
  gradient: AppGradients.primary,
);
```

#### AppFormField

```dart
// Eski kullanım
AppFormField(
  value: name,
  onChanged: (value) {},
  label: "Ad Soyad",
  validator: (value) => value.isEmpty ? "Bu alan zorunludur" : null,
)

// Yeni kullanım (Signal)
final name = Signal("");

AppFormField(
  signal: name,
  label: "Ad Soyad",
  validator: (value) => value.isEmpty ? "Bu alan zorunludur" : null,
  prefixIcon: Icons.person,
);
```

#### AppSelectCard

```dart
// Performans optimizasyonu yapıldı
final selectedCard = Signal<String?>(null);

AppSelectCard<String>(
  signal: selectedCard,
  value: "card1",
  title: "Kart 1",
  subtitle: "Açıklama",
  gradient: AppGradients.primary,
);
```
