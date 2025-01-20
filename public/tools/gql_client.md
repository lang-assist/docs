# Berber GraphQL Client

## Genel Bakış

Berber GraphQL Client, backend servisleriyle iletişim için gerekli query ve mutation'ları içeren bir kütüphanedir. Bu kütüphane, hem TypeScript/JavaScript hem de Dart (Flutter) uygulamaları için tip güvenli bir API sağlar.

## Proje Yapısı

```
lib/gql_client/
├── admin/           # Admin paneli için özel sorgular
├── common/          # Ortak sorgular ve fragmentlar
├── org/            # Organizasyon uygulaması için özel sorgular
├── user/           # Kullanıcı uygulaması için özel sorgular
└── README.md       # Kütüphane dökümantasyonu
```

## Modüller

### 1. Common Modülü

Tüm uygulamalar tarafından kullanılan ortak sorgular ve fragmentlar:

```graphql
# fragments/user.graphql
fragment UserFields on User {
  id
  name
  avatar
  email
  phone
}

# queries/auth.graphql
query CurrentUser {
  currentUser {
    ...UserFields
  }
}
```

### 2. Admin Modülü

Admin paneli için özel sorgular:

```graphql
# queries/organizations.graphql
query AdminOrganizations($pagination: PaginationInput!) {
  organizations(pagination: $pagination) {
    edges {
      node {
        id
        name
        type
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}

# mutations/organization.graphql
mutation UpdateOrganizationStatus($id: ID!, $status: OrganizationStatus!) {
  updateOrganizationStatus(id: $id, status: $status) {
    id
    status
  }
}
```

### 3. Organization Modülü

Organizasyon uygulaması için özel sorgular:

```graphql
# queries/branch.graphql
query OrgBranches($pagination: PaginationInput!) {
  myBranches(pagination: $pagination) {
    edges {
      node {
        id
        name
        type
      }
    }
  }
}

# mutations/service.graphql
mutation CreateService($input: CreateServiceInput!) {
  createService(input: $input) {
    id
    name
    price
  }
}
```

### 4. User Modülü

Kullanıcı uygulaması için özel sorgular:

```graphql
# queries/services.graphql
query NearbyServices($location: LocationInput!, $pagination: PaginationInput!) {
  nearbyServices(location: $location, pagination: $pagination) {
    edges {
      node {
        id
        name
        price
        organization {
          name
          address
        }
      }
    }
  }
}
```

## Kullanım

### TypeScript/JavaScript

```typescript
import { UserQueries, UserMutations } from "@berber/gql-client";

// Query örneği
const user = await UserQueries.getUser({ id: "user-id" });

// Mutation örneği
const updatedUser = await UserMutations.updateUser({
  id: "user-id",
  data: { name: "Yeni İsim" },
});
```

### Dart/Flutter

```dart
import 'package:berber_gql_client/berber_gql_client.dart';

// Query örneği
final user = await UserQueries.getUser(GetUserArgs(id: 'user-id'));

// Mutation örneği
final updatedUser = await UserMutations.updateUser(
  UpdateUserArgs(
    id: 'user-id',
    data: UpdateUserData(name: 'Yeni İsim'),
  ),
);
```

## Fragment Kullanımı

Fragmentlar, ortak alanları tekrar kullanmak için kullanılır:

```graphql
# fragments/service.graphql
fragment ServiceFields on Service {
  id
  name
  price
  duration
  description
}

# queries/service.graphql
query GetService($id: ID!) {
  service(id: $id) {
    ...ServiceFields
    organization {
      id
      name
    }
  }
}
```

## Pagination

Tüm liste sorguları için pagination desteği:

```graphql
query PaginatedQuery($first: Int!, $after: String) {
  items(first: $first, after: $after) {
    edges {
      node {
        id
        # ... diğer alanlar
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

## Hata Yönetimi

GraphQL hataları için özel error handling:

```typescript
try {
  const result = await query();
} catch (error) {
  if (error instanceof GraphQLError) {
    // GraphQL hatası
    console.error(error.extensions.code);
  } else {
    // Ağ hatası vb.
    console.error(error);
  }
}
```

## Geliştirme

1. Yeni bir sorgu/mutation eklemek için:

   - İlgili modülde .graphql dosyası oluştur
   - Sorguyu/mutation'ı yaz
   - Gerekli fragmentları ekle/kullan
   - Codegen'i çalıştır

2. Mevcut bir sorguyu/mutation'ı güncellemek için:

   - .graphql dosyasını güncelle
   - Codegen'i çalıştır

3. Codegen çalıştırma:
   ```bash
   npm run codegen
   ```

## Geliştirme Rehberi

### $dbMan ve $beDev için Talimatlar

- Her query ve mutation için ayrı bir dosya oluşturun.
- Fragment kullanımı zorunludur. Bir obje sadece `{...TheFragment}` şeklinde istenmelidir.
- Query ve mutation'lar modüler yapıda organize edilmelidir.

### Query ve Mutation Detayları

- Her bir query ve mutation için açıklamalar ve kullanım örnekleri ekleyin.
- `org_data` örneğini inceleyin ve benzer bir yapı oluşturun.

### Fragment Kullanımı

- Fragmentlar, ortak alanları tanımlamak ve tekrar kullanmak için kullanılır.
- Her modül için gerekli fragmentları tanımlayın ve kullanın.

// Eğer içerik boşsa, `unimplemented` comment'i ile boş bırakın.
