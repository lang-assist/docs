# Berber GraphQL Şema ve Tipler

## Genel Bakış

Bu döküman, Berber platformunun GraphQL şemasını ve tiplerini detaylı olarak açıklar. Bu şema, tüm platform bileşenleri arasındaki veri alışverişini tanımlar.

## Temel Kavramlar

### Node Arayüzü

Tüm varlıklar için temel arayüz:

```graphql
interface Node {
  id: ID!
}
```

Node aynı zamanda objenin veritabanında tutulduğunu gösterir. id alanı objenin veritabanındaki \_id alanına karşılık gelir.

### Direktifler

#### @resolver

```graphql
directive @resolver(permissions: [String!]!) on FIELD_DEFINITION
```

- Alan için izin kontrolü yapar
- Boş izin listesi = herkese açık alan
- İzinler VEYA mantığıyla kontrol edilir

#### @reference

```graphql
directive @reference(collection: String!) on FIELD_DEFINITION
```

- Field'in hangi koleksiyona referans verildiğini belirtir.

Örnek

```graphql
type SomeObject implements Node {
  id: ID!
  someField: SomeOtherObject! @reference(collection: "someOtherObjects")
  someField_ID: ID!
}
```

Bu durumda SomeObject'in someField alanı SomeOtherObject'in id alanına referans verilir. someField_ID alanı ise SomeOtherObject'in \_id alanına karşılık gelir.

Otomatik olarak resolver yaratılır.

#### @domain

```graphql
directive @domain(domain: Domains!) on FIELD_DEFINITION
```

- Alanın hangi etki alanına ait olduğunu belirtir. Sadece root Query ve Mutation'da kullanılabilir.

#### @from_collection

Doğrudan bir koleksiyondan veri çekmek için kullanılır. Query'de kullanılabilir ve alanın dönüş tipi koleksiyonun tipiyle aynı olmalıdır. Ayrıca alan parametre olarak sadece id istemelidir.

```graphql
field(id: ID!): SomeObject! @from_collection(collection: "someObjects")
```

#### @paginate

Koleksiyondaki verileri sayfalama için kullanılır. Query'de kullanılabilir ve alanın dönüş tipi koleksiyonun tipiyle aynı olmalıdır. Ayrıca alan parametre olarak sadece pagination istemelidir.

```graphql
field(pagination: PaginationInput): SomeObjectConnection! @paginate(collection: "someObjects")
```

#### @group_by

Koleksiyondaki verileri gruplama için kullanılır. Paginate'e çok benzer sadece dönüş değerinde gruplar yer alır. Query'de kullanılabilir ve alanın dönüş tipi koleksiyonun tipiyle aynı olmalıdır. Ayrıca alan parametre olarak sadece groupFields istemelidir.

```graphql
field(pagination: PaginationInput): SomeObjectConnection! @group_by(collection: "someObjects", groupFields: ["someField"])
```

#### @connection

Yerelin \_id'si foreignField'in değerine eşit olan veriler üzerinde paginate yapar.

```graphql
field(pagination: PaginationInput): SomeObjectConnection! @connection(collection: "someObjects", foreignField: "someField")
```

#### @grouped_connection

Yerelin \_id'si foreignField'in değerine eşit olan veriler üzerinde group_by yapar.

```graphql
field(pagination: PaginationInput): SomeObjectConnection! @grouped_connection(collection: "someObjects", foreignField: "someField", groupFields: ["someField"])
```

## Skalerler

| Tip         | Açıklama                 |
| ----------- | ------------------------ |
| DateTime    | Tarih ve zaman değerleri |
| JSON        | JSON formatında veriler  |
| Any         | Herhangi bir tip         |
| Email       | E-posta adresleri        |
| PhoneNumber | Telefon numaraları       |
| Contact     | İletişim bilgileri       |
| VerifyCode  | Doğrulama kodları        |
| Base64Data  | Base64 kodlanmış veriler |
| Avatar      | HSL veya ID değerleri    |
| Hsl         | HSL renk değerleri       |

## Enum Tipleri

### Domains

```graphql
enum Domains {
  user # Kullanıcı etki alanı
  admin # Admin etki alanı
  public # Herkese açık etki alanı
  auth # Kimlik doğrulama etki alanı
}
```

## Typelar
