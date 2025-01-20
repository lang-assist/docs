# LangAssist Model Sistemi

Bu dokümantasyon, LangAssist'in model sistemini ve veritabanı yönetimini açıklar.

## Genel Bakış

LangAssist'in model sistemi, MongoDB ve Redis'i birlikte kullanan, type-safe ve önbellekli bir yapıya sahiptir. Sistem, model tanımlarını otomatik olarak yönetir ve geliştiricilere kolay bir API sunar.

## Model Tanımlama

Modeller `bin/server/src/models/` dizininde tanımlanır. Her model dosyası kendi interface'ini ve model konfigürasyonunu içerir.

### Dosya isimlendirme

Dosya ismine göre model yaratılır. Örneğin `user.ts` dosyasında tanımlanan model `User` olarak yaratılır.

`model-name.ts` -> `ModelName`
`some-model.ts` -> `SomeModel`

### Model Dosya Yapısı

```typescript
// user.ts örneği
import {
  TimeFields,
  ObjectId,
  CreatedAtField,
  UpdatedAtField,
  DbHelper,
} from "../helpers/db";

// CreatedAtField bir createdAt alanı içerir.
// UpdatedAtField bir updatedAt alanı içerir.
// TimeFields bir createdAt ve updatedAt alanı içerir.

export interface IModel extends TimeFields {
  name: string;
  email: string;
  status: "active" | "blocked";
}

export const Model = DbHelper.model<IModel>({
  collectionName: "users",
  cacheById: true,
  createdAtField: true,
  updatedAtField: true,
  indexes: [
    {
      key: { email: 1 },
      unique: true,
    },
  ],
});
```

## Model Özellikleri

### 1. Temel Alanlar

Her model otomatik olarak şu alanları içerebilir:

- `_id`: MongoDB ObjectId (otomatik)
- `createdAt`: Oluşturma zamanı (milliseconds) CreatedAtField veya TimeFields ile
- `updatedAt`: Güncelleme zamanı (milliseconds) UpdatedAtField veya TimeFields ile

### 2. Model Konfigürasyonu

```typescript
DbHelper.model<T>({
  collectionName: string;     // MongoDB koleksiyon adı
  cacheById?: boolean;        // ID bazlı Redis önbellekleme
  createdAtField?: boolean;   // createdAt alanını otomatik yönet
  updatedAtField?: boolean;   // updatedAt alanını otomatik yönet
  indexes?: IndexDescription[]; // MongoDB indeksleri
  idFields?: string[];       // ObjectId tipinde olacak ilişki alanları
  queryCacheFields?: string[]; // Önbelleklenecek sorgu alanları
});
```

## Önbellekleme Sistemi

Model sistemi, Redis üzerinde otomatik önbellekleme yapar:

### 1. ID Bazlı Önbellekleme

```typescript
// Model tanımı
const User = DbHelper.model<IUser>({
  collectionName: "users",
  cacheById: true, // ID bazlı önbellekleme aktif
});

// Kullanım
const user = await User.findById(id); // Otomatik önbellekten okur/yazar
```

### 2. Sorgu Bazlı Önbellekleme

```typescript
// Model tanımı
const User = DbHelper.model<IUser>({
  collectionName: "users",
  queryCacheFields: ["email"], // email alanı için sorgu önbellekleme
});

// Kullanım
const user = await User.findOne({ email: "test@example.com" }); // Önbellekten okur/yazar
```

## Model Metodları

### 1. Temel CRUD

```typescript
// Oluşturma
const doc = await Model.insertOne(data);
const docs = await Model.insertMany([data1, data2]);

// Okuma
const doc = await Model.findById(id);
const doc = await Model.findOne(query);
const docs = await Model.find(query);

// Güncelleme
const doc = await Model.findByIdAndUpdate(id, update);
const doc = await Model.updateOne(query, update);
const docs = await Model.updateMany(query, update);

// Silme
const doc = await Model.findByIdAndDelete(id);
const doc = await Model.deleteOne(query);
const docs = await Model.deleteMany(query);
```

### 2. Aggregation ve Sayma

```typescript
// Aggregation pipeline çalıştırma
const results = await Model.aggregate(pipeline);

// Döküman sayısı
const count = await Model.count(query);
```

## İlişkiler ve Referanslar

Model sistemi, MongoDB'nin referans modelini kullanır. İlişkiler `ObjectId` referansları ile sağlanır:

```typescript
// İlişki alanlarını tanımlama
const User = DbHelper.model<IUser>({
  collectionName: "users",
  idFields: ["organization_ID", "role_ID"], // Bu alanlar ObjectId olarak işlenir
});
```

## İndeksleme

MongoDB indekslerini model seviyesinde tanımlayabilirsiniz:

```typescript
const User = DbHelper.model<IUser>({
  collectionName: "users",
  indexes: [
    {
      key: { email: 1 },
      unique: true,
      sparse: false,
    },
    {
      key: { createdAt: -1 },
    },
  ],
});
```

## Örnek Model Tanımları

### User Model

```typescript
interface IModel extends TimeFields {
  name: string;
  email: string;
  status: "active" | "blocked";
  settings: {
    notifications: {
      email: boolean;
      push: boolean;
    };
  };
}

const Model = DbHelper.model<IModel>({
  collectionName: "users",
  cacheById: true,
  createdAtField: true,
  updatedAtField: true,
  indexes: [{ key: { email: 1 }, unique: true }, { key: { status: 1 } }],
  queryCacheFields: ["email"],
});

export { Model, IModel };
```

### Auth Model

```typescript
interface IModel extends TimeFields {
  user_ID: ObjectId;
  type: string;
  identifier: string;
  credential: string;
  verified: boolean;
}

const Model = DbHelper.model<IModel>({
  collectionName: "auth",
  idFields: ["user_ID"],
  indexes: [{ key: { identifier: 1, type: 1 }, unique: true }],
});

export { Model, IModel };
```

## Best Practices

1. **İsimlendirme**

   - Model interface'leri `I` prefix'i ile başlar: `IUser`
   - Model değişkenleri PascalCase: `User`
   - Koleksiyon isimleri lowercase ve çoğul: `users`

2. **Önbellekleme**

   - Sık okunan ve nadir güncellenen veriler için `cacheById: true`
   - Unique alanlar için `queryCacheFields` kullanımı
   - Çok sık güncellenen veriler için önbellekleme kullanmama

3. **İndeksleme**

   - Sorgu pattern'lerine göre index tanımlama
   - Compound index'leri en sık kullanılan alan sıralamasına göre oluşturma
   - Unique constraint'leri index ile sağlama

4. **Validation**

   - Kritik alanlarda MongoDB validation kullanma
   - Kompleks validasyonları uygulama seviyesinde yapma

5. **İlişkiler**
   - İlişki alanlarını `idFields` ile tanımlama
   - Çok sık birlikte kullanılan verileri denormalize etme
   - Büyük ve karmaşık ilişkilerde aggregation kullanma
