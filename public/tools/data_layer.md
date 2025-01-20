# Berber Organization Data Layer

## API Kullanımı

`org_data` paketi, GraphQL API'sini Flutter uygulamalarında kullanmak için gerekli sınıfları ve fonksiyonları sağlar. Aşağıda bir kullanım örneği verilmiştir:

### Kullanım Örneği

```dart
import 'package:org_data/org_data.dart';

Future<void> exampleUsage() async {
  // Üye bilgilerini getir
  final member = await Api.query.getMember('member-id');
  print('Üye ID: ${member.id}');
  print('Üye Durumu: ${member.status}');

  // Organizasyon bilgilerini getir
  final organization = await api.query.us();
  print('Organizasyon Adı: ${organization.name}');
}
```

### Notlar

- `org_data` paketinde, GraphQL şemasında ve client query ve mutationlarında tanımlanan fragmentler, enumlar ve inputlar için otomatik olarak Dart sınıfları üretilir.
- Örneğin, `fragment Test` için `Fragment$Test` sınıfı oluşturulur. Enum ve inputlar için de benzer şekilde sınıflar üretilir: `enum TestEnum -> Enum$TestEnum` ve `input TestInput -> Input$TestInput`.
- Bu sınıflar, API ile etkileşimde tip güvenliğini sağlar ve kullanım kolaylığı sunar.

Bu dökümantasyon, `org_data` paketinin API kullanımını basit ve anlaşılır bir şekilde açıklamaktadır. Daha fazla detay için `gql_client` dökümantasyonuna başvurabilirsiniz.
