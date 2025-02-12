# Lang Assist Documentation Server

Bu repository Lang Assist'in iç dökümanlarını host eden sunucuyu içerir.

## Gereksinimler

- Node.js 18 veya üzeri
- npm 9 veya üzeri
- Google Cloud SDK
- Docker (opsiyonel, local development için)

## Local Development

1. Bağımlılıkları yükleyin:

```bash
npm install
```

2. Geliştirme sunucusunu başlatın:

```bash
npm run dev
```

Sunucu http://localhost:8080 adresinde çalışacaktır.

## GCP'ye Deploy Etme

1. Google Cloud SDK'yı yapılandırın:

```bash
gcloud auth login
gcloud config set project <PROJECT_ID>
```

4. Docker kimlik doğrulaması yapın:

```bash
gcloud auth configure-docker us-central1-docker.pkg.dev
```

5. Uygulamayı deploy edin:

```bash
gcloud builds submit --config cloudbuild.yaml
```

## Dökümanları Yükleme

Dökümanları GCS bucket'a yüklemek için:

```bash
npm run upload
```

## Erişim

Dökümanlar şu adreste yayınlanacaktır:
https://docs-<PROJECT_ID>.us-central1.run.app

## Dizin Yapısı

```
.
├── public/           # Public dökümanlar
├── tools/           # Yardımcı scriptler
├── server.js        # Express sunucusu
├── cloudbuild.yaml  # Cloud Build konfigürasyonu
└── Dockerfile       # Docker image konfigürasyonu
```

## Güvenlik

- Tüm dökümanlar GCS bucket'ta saklanır
- Service Account sadece gerekli izinlere sahiptir
- Cloud Run servisi public erişime açıktır ama rate limiting uygulanır

## Monitoring

- Cloud Run metrics dashboard'u kullanılabilir
- Cloud Logging ile loglar görüntülenebilir
- Error reporting Cloud Error Reporting üzerinden yapılır

## Dökümanlar

https://docs-<PROJECT_ID>.us-central1.run.app/\_internal/test.md
