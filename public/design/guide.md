# Lang Assist Design Guide for Flutter Developers

## 1. Temel Prensipler

### 1.1 Tasarım Felsefesi

Lang Assist tasarım sistemi, dil öğrenme deneyimini kolaylaştırmak ve eğlenceli hale getirmek için tasarlanmıştır.

#### Minimalist ve Modern Yaklaşım

- Gereksiz görsel elementlerden kaçının
- Her elementin bir amacı olmalı
- Boş alan (white space) tasarımın bir parçasıdır
- Sade ama etkili görsel hiyerarşi kullanın

#### Kullanıcı Odaklı Tasarım

- Öğrenme yolculuğunu basitleştirin
- Her ekranda net bir ana aksiyon olmalı
- İkincil aksiyonlar daha az görünür olmalı
- Kullanıcı geri bildirimleri anlık ve net olmalı

### 1.2 Marka Kimliği

#### Renk Sistemi

Primary (`#4A90E2`):

- Ana başlıklar
- Önemli butonlar
- Navigasyon öğeleri
- Seçili durumlar
- Progress göstergeleri

Secondary (`#27AE60`):

- Başarı durumları
- Pozitif aksiyonlar
- Doğru cevaplar
- Streak göstergeleri
- Seviye tamamlama

Accent (`#F39C12`):

- Önemli ipuçları
- Bonus içerikler
- Özel teklifler
- Yeni özellik bildirimleri

Error (`#E74C3C`):

- Hata durumları
- Yanlış cevaplar
- Kritik uyarılar
- Negatif durumlar

Warning (`#F1C40F`):

- Uyarı mesajları
- Dikkat çekilmesi gereken noktalar
- Önemli hatırlatmalar

Info (`#3498DB`):

- Bilgi mesajları
- İpuçları
- Yardım içerikleri

Success (`#2ECC71`):

- Başarı mesajları
- Tamamlanan görevler
- Kazanılan rozetler
- Pozitif geri bildirimler

Background (`#F5F6FA`):

- Sayfa arkaplanı
- Panel arkaplanları
- Liste arkaplanları
- Kart grupları arası

Surface (`#FFFFFF`):

- Kart yüzeyleri
- Modal arkaplanları
- Form alanları
- Dropdown menüler

Text:

- Primary (`#2C3E50`): Ana metinler, başlıklar
- Secondary (`#7F8C8D`): Alt başlıklar, açıklamalar
- Disabled (`#BDC3C7`): Devre dışı durumlar

Gradients:

1. Primary Gradient:

   - Start: `#4A90E2`
   - End: `#357ABD`
   - Kullanım: CTA butonları, önemli kartlar

2. Success Gradient:

   - Start: `#27AE60`
   - End: `#219A52`
   - Kullanım: Başarı durumları, seviye tamamlama

3. Accent Gradient:

   - Start: `#F39C12`
   - End: `#D68910`
   - Kullanım: Premium özellikler, özel içerikler

4. Progress Gradient:

   - Start: `#3498DB`
   - End: `#2980B9`
   - Kullanım: Progress barları, yükleme durumları

Opacity Levels:

- Hover: 8% primary color
- Selected: 12% primary color
- Pressed: 16% primary color
- Disabled: 40% base color

### 1.3 Tipografi

#### Font Ailesi

- Primary: Roboto
- Secondary: Roboto Slab (özel başlıklar için)

#### Hiyerarşi

Display (32px):

- Hero başlıkları
- Özel duyurular

Headline (24px):

- Sayfa başlıkları
- Modal başlıkları

Title (20px):

- Kart başlıkları
- Liste başlıkları

Body (16px):

- Paragraflar
- Liste öğeleri
- Form içerikleri

Label (14px):

- Form etiketleri
- Buton metinleri
- Yardımcı metinler

#### Font Ağırlıkları

- Bold (700): Ana başlıklar ve CTAs
- Medium (500): Alt başlıklar ve butonlar
- Regular (400): Gövde metni ve listeler

## 2. Component Tasarımı

### 2.1 Buttons

#### Primary Button

- Height: 48px
- Padding: 16px horizontal
- Border radius: 8px
- Background: Primary gradient
- Text: Surface color
- Font: Label Medium
- Icon: 24px (opsiyonel)
- Loading state: Circular progress

#### Secondary Button

- Height: 48px
- Padding: 16px horizontal
- Border radius: 8px
- Border: 1px solid Primary
- Background: Transparent
- Text: Primary color
- Font: Label Medium
- Icon: 24px (opsiyonel)

#### Text Button

- Height: 40px
- Padding: 8px horizontal
- No background
- Text: Primary color
- Font: Label Medium
- Icon: 24px (opsiyonel)

### 2.2 Form Elements

#### Text Input

- Height: 56px
- Padding: 16px
- Border radius: 8px
- Border: 1px solid rgba(0,0,0,0.1)
- Background: Surface
- Label: Floating
- Helper text: 12px
- Error state: Accent color

#### Selection Controls

- Checkbox size: 24px
- Radio size: 24px
- Touch target: 48px
- Animation: Scale + Ripple

### 2.3 Cards

#### Standard Card

- Padding: 16px
- Border radius: 12px
- Background: Surface
- Shadow: 0 2px 4px rgba(0,0,0,0.1)
- Border: 1px solid rgba(0,0,0,0.05)

#### Interactive Card

- Tüm Standard Card özellikleri
- Hover state: Scale 1.02
- Active state: Scale 0.98
- Transition: 200ms ease-out

### 2.4 Lists

#### Standard List

- Item height: 72px
- Padding: 16px
- Divider: 1px solid rgba(0,0,0,0.08)
- Leading: 40px (avatar/icon)
- Trailing: 40px (aksiyonlar)

#### Dense List

- Item height: 56px
- Diğer özellikler Standard List ile aynı

### 2.5 Dialogs

#### Alert Dialog

- Width: 80% of screen
- Max width: 400px
- Padding: 24px
- Border radius: 16px
- Title: Headline
- Content: Body
- Actions: Row of buttons

#### Bottom Sheet

- Border radius: 16px top
- Min height: 200px
- Max height: 90% of screen
- Drag indicator: 32px wide
- Background: Surface

## 3. Layout Patterns

### 3.1 Screen Layout

#### Basic Screen

- AppBar height: 56px
- Bottom navigation height: 56px
- Safe area padding: 16px
- Screen padding: 16px
- Maximum content width: 600px

#### List Screen

- AppBar height: 56px
- List padding: 16px
- List item spacing: 8px
- Pull to refresh: Standard

#### Detail Screen

- AppBar height: 56px
- Hero image height: 200px
- Content padding: 16px
- Bottom actions height: 72px

### 3.2 Navigation

#### Bottom Navigation

- Height: 56px
- Icon size: 24px
- Label: 12px
- Selected indicator: Primary color
- Background: Surface
- Elevation: 8px shadow

#### Tab Bar

- Height: 48px
- Tab padding: 16px
- Indicator: 2px Primary
- Label: 14px Medium
- Icon: 24px (opsiyonel)

## 4. Animasyonlar

### 4.1 Geçiş Animasyonları

#### Page Transitions

- Duration: 300ms
- Curve: ease-in-out
- Type: Slide up/fade

#### Modal Transitions

- Duration: 250ms
- Curve: ease-out
- Type: Fade + scale

### 4.2 Mikro Animasyonlar

#### Button States

- Hover: 200ms
- Press: 100ms
- Release: 200ms

#### Form Interactions

- Focus: 200ms
- Error shake: 300ms
- Success check: 400ms
