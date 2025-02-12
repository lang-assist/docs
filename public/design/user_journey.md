# User Journey & Path Architecture

## Overview

Lang Assist platformunda kullanıcı yolculuğu ve yol haritası, dil öğrenme deneyimini optimize etmek için tasarlanmıştır. Bu yapı, kullanıcıların öğrenme sürecini kişiselleştirilmiş ve etkili bir şekilde yönetmelerini sağlar.

## User Journey Map

```mermaid
journey
    title Lang Assist Kullanıcı Yolculuğu
    section Keşif
      Platformu keşfet: 3: User
      Kayıt ol: 5: User
      Dil seviyesini belirle: 4: User
    section Başlangıç
      Öğrenme planı oluştur: 5: User, System
      İlk dersi başlat: 4: User
      Alıştırma yap: 3: User
    section İlerleme
      Günlük pratik: 4: User
      Quiz çöz: 3: User
      Başarıları görüntüle: 5: User
    section Topluluk
      Diğer öğrencilerle etkileşim: 3: User
      Öğretmenlerle iletişim: 4: User
      Grup aktiviteleri: 3: User
```

## User Path Structure

```mermaid
graph TD
    A[Giriş] --> B{Yeni Kullanıcı?}
    B -->|Evet| C[Seviye Belirleme]
    B -->|Hayır| D[Ana Sayfa]

    C --> E[Kişisel Plan]
    E --> D

    D --> F[Dersler]
    D --> G[Alıştırmalar]
    D --> H[Quizler]
    D --> I[Topluluk]

    F --> J[Ders İçeriği]
    J --> K[Pratik]
    K --> L[Quiz]
    L --> M{Başarılı?}

    M -->|Evet| N[Sonraki Seviye]
    M -->|Hayır| O[Tekrar]

    N --> D
    O --> J
```

## Path Components

### 1. Onboarding Path

- Kayıt/Giriş
- Dil seviyesi belirleme
- Hedef belirleme
- Öğrenme planı oluşturma

### 2. Learning Path

- Günlük dersler
- Pratik alıştırmalar
- İlerleme quizleri
- Başarı değerlendirmesi

### 3. Community Path

- Grup çalışmaları
- Öğretmen desteği
- Akran değerlendirmesi
- Sosyal etkileşim

## Progress Tracking

```mermaid
graph LR
    A[Başlangıç] --> B[Bronze]
    B --> C[Silver]
    C --> D[Gold]
    D --> E[Platinum]

    subgraph Seviyeler
    B
    C
    D
    E
    end

    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#cd7f32,stroke:#333,stroke-width:2px
    style C fill:#c0c0c0,stroke:#333,stroke-width:2px
    style D fill:#ffd700,stroke:#333,stroke-width:2px
    style E fill:#e5e4e2,stroke:#333,stroke-width:2px
```

## Implementation Guidelines

### 1. Path Navigation

- Her seviye için net göstergeler
- İlerleme çubuğu
- Başarı rozetleri
- Seviye atlama kriterleri

### 2. Progress States

```typescript
enum ProgressState {
  NOT_STARTED = "not_started",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  LOCKED = "locked",
}
```

### 3. Achievement System

```typescript
interface Achievement {
  id: string;
  title: string;
  description: string;
  points: number;
  requirements: Requirement[];
  rewards: Reward[];
}
```

### 4. Learning Path Structure

```typescript
interface LearningPath {
  id: string;
  level: LanguageLevel;
  modules: Module[];
  prerequisites: string[];
  estimatedDuration: Duration;
  skillsFocus: Skill[];
}
```

## UI Components

### 1. Progress Indicators

- Circular progress
- Linear progress bars
- Achievement badges
- Level indicators

### 2. Navigation Elements

- Path map
- Progress timeline
- Quick jump points
- Breadcrumb trail

### 3. Achievement Display

- Trophy case
- Progress statistics
- Leaderboard position
- Skill radar chart

## Gamification Elements

### 1. Point System

- Experience points (XP)
- Skill points
- Achievement points
- Community points

### 2. Rewards

- Level-up bonuses
- Achievement badges
- Special content unlock
- Community status

### 3. Challenges

- Daily challenges
- Weekly missions
- Monthly goals
- Special events

## Analytics Integration

### 1. Progress Metrics

- Completion rates
- Time spent
- Success rates
- Engagement levels

### 2. User Behavior

- Learning patterns
- Difficulty spots
- Preferred content
- Peak usage times

### 3. Performance Data

- Accuracy rates
- Speed metrics
- Retention scores
- Improvement trends

## Accessibility Considerations

### 1. Navigation

- Keyboard shortcuts
- Screen reader support
- Clear path indicators
- Alternative routes

### 2. Progress Visualization

- Color-blind friendly
- Multiple progress indicators
- Clear text descriptions
- Adaptive layouts

### 3. Achievement Recognition

- Multiple feedback types
- Customizable celebrations
- Inclusive messaging
- Varied reward types
