## Migrations

### 1. entity 수정

### 2. 새로운 마이그레이션 생성

마이그레이션 파일의 내용은 현재 엔티티를 보고 자동으로 생성해준다.

```bash
npm run migration:generate --name=Migration_Name
```

### 3. 마이그레이션 적용

```bash
npm run migration:run
```

## Create Module, Service, Controller

```bash
nest g module users
nest g service users
nest g controller users
```
