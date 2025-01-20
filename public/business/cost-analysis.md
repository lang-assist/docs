# Lang Assist - Maliyet Analizi

## Claude API Kullanım Senaryoları

### 1. Konuşma Pratiği

```json
{
  "scenario": "Kullanıcı ile diyalog",
  "input": {
    "system_prompt": "~500 token",
    "user_context": "~100 token",
    "user_message": "~50 token"
  },
  "output": {
    "ai_response": "~200 token",
    "corrections": "~50 token",
    "feedback": "~100 token"
  },
  "total_per_interaction": "~1000 token"
}
```

### 2. Gramer Açıklaması

```json
{
  "scenario": "Gramer kuralı açıklama ve örneklendirme",
  "input": {
    "system_prompt": "~500 token",
    "grammar_context": "~200 token",
    "user_question": "~50 token"
  },
  "output": {
    "explanation": "~300 token",
    "examples": "~200 token",
    "exercises": "~200 token"
  },
  "total_per_interaction": "~1450 token"
}
```

### 3. Alıştırma/Quiz Değerlendirme

```json
{
  "scenario": "Kullanıcı cevaplarını değerlendirme",
  "input": {
    "system_prompt": "~500 token",
    "exercise_context": "~100 token",
    "user_answers": "~200 token"
  },
  "output": {
    "corrections": "~200 token",
    "explanations": "~300 token",
    "suggestions": "~100 token"
  },
  "total_per_interaction": "~1400 token"
}
```

### 4. İçerik Önerisi

```json
{
  "scenario": "Kişiselleştirilmiş içerik önerisi",
  "input": {
    "system_prompt": "~500 token",
    "user_profile": "~200 token",
    "learning_history": "~300 token"
  },
  "output": {
    "recommendations": "~200 token",
    "explanations": "~100 token"
  },
  "total_per_interaction": "~1300 token"
}
```

## Ortalama Kullanıcı Davranışı

### Free Tier Kullanıcısı (1 Hafta)

- Günlük 3 konuşma pratiği: 3 × 1000 token × 7 gün = 21,000 token
- 3 gramer açıklaması: 3 × 1450 token = 4,350 token
- 5 alıştırma: 5 × 1400 token = 7,000 token
- 1 içerik önerisi: 1 × 1300 token = 1,300 token
  **Toplam: ~33,650 token/hafta**

### Premium Kullanıcısı (Aylık)

- Günlük 10 konuşma pratiği: 10 × 1000 token × 30 gün = 300,000 token
- Günlük 2 gramer açıklaması: 2 × 1450 token × 30 gün = 87,000 token
- Günlük 3 alıştırma: 3 × 1400 token × 30 gün = 126,000 token
- Haftalık 2 içerik önerisi: 2 × 1300 token × 4 = 10,400 token
  **Toplam: ~523,400 token/ay**

## Claude API Maliyet Hesabı

### Input Token Maliyeti

- $3 / 1M token

### Output Token Maliyeti

- $15 / 1M token

### Prompt Caching Write

- $3.75 / 1M token

### Prompt Caching Read

- $0.3 / 1M token

### Kullanıcı Başına Maliyet

#### Free Tier Kullanıcısı (1 Hafta)

- Input Tokens (60%): 20,190 × ($3 / 1M) = $0.06
- Output Tokens (40%): 13,460 × ($15 / 1M) = $0.20
  **Toplam: $0.26/hafta**

#### Premium Kullanıcısı (Aylık)

- Input Tokens (60%): 314,040 × ($3 / 1M) = $0.94
- Output Tokens (40%): 209,360 × ($15 / 1M) = $3.14
  **Toplam: $4.08/ay**

## Operasyonel Maliyetler

### Sabit Maliyetler (Aylık)

- Server (Cloud Run + Storage + DB): $100
- Domain ve SSL: $2
- Developer Araçları: $50
- Monitoring Servisleri: $30
  **Toplam: $182/ay**

## Kârlılık Analizi

### Varsayımlar

- Aylık yeni Free Trial kullanıcı sayısı: 5,000
- Premium dönüşüm oranı: %5
- Toplam aktif premium kullanıcı sayısı: 2,000

### Aylık Gelir

- Premium Kullanıcılar: 2,000 × $9.99 = $19,980

### Aylık Gider

- Free Trial Kullanıcı AI Maliyeti: 5,000 × $0.26 = $1,300
- Premium Kullanıcı AI Maliyeti: 2,000 × $4.08 = $8,160
- Sabit Maliyetler: $182
  **Toplam: $9,642**

### Aylık Net

- Gelir: $19,980
- Gider: $9,642
  **Net: +$10,338**

## Optimizasyon Önerileri

1. **Premium Özelliklerin Genişletilmesi**

   - Özel ders modülü
   - Grup pratik odaları
   - İleri seviye içerik
   - Offline çalışma materyalleri

2. **Free Trial İyileştirmeleri**

   - İlk 3 gün sınırsız kullanım
   - Sonraki 4 gün kısıtlı kullanım
   - Premium özelliklerin demo versiyonları

3. **Fiyatlandırma Stratejisi**
   - Yıllık plan: $89.99 ($7.50/ay)
   - 6 aylık plan: $49.99 ($8.33/ay)
   - Aylık plan: $9.99/ay
   - Kurumsal paketler: Kullanıcı başına $5/ay

## Sonuç

1. Yeni model ile aylık ~$10,000 kâr potansiyeli
2. Free trial kısıtlaması ile maliyetler kontrol altında
3. Premium kullanıcılara daha fazla değer sunulabilir
4. Büyüme için öneriler:
   - Agresif pazarlama
   - Referral programı
   - Eğitim kurumları ile partnerlikler
   - Yeni dil destekleri
