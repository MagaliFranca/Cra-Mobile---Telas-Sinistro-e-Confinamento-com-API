const fs = require('fs');
const path = require('path');

console.log('Construindo a árvore de diretórios do projeto CRA...');

// Lista de todos os arquivos detalhados na sua documentação
const files = [
  // Raiz do monorepo
  '.github/workflows/ci-mobile.yml', '.github/workflows/ci-backend.yml', '.github/workflows/cd-mobile-staging.yml', '.github/workflows/cd-backend-staging.yml', '.github/workflows/release.yml',
  '.github/CODEOWNERS', '.github/PULL_REQUEST_TEMPLATE.md', '.github/dependabot.yml',
  '.github/ISSUE_TEMPLATE/bug_report.md', '.github/ISSUE_TEMPLATE/feature_request.md', '.github/ISSUE_TEMPLATE/technical_debt.md',
  'docs/SRS.md', 'docs/ARCHITECTURE.md', 'docs/CONTRIBUTING.md', 'docs/RUNBOOK.md',
  'docs/adr/0001-choose-react-native.md', 'docs/adr/0002-offline-first-watermelon.md', 'docs/adr/0003-monorepo-turborepo.md',
  'scripts/bootstrap.sh', 'scripts/seed-db.ts', 'scripts/release.sh',
  '.gitignore', '.nvmrc', '.editorconfig', 'turbo.json', 'package.json', 'pnpm-workspace.yaml', 'LICENSE', 'README.md',
  
  // Mobile (Clean Architecture)
  'apps/mobile/app/(auth)/_layout.tsx', 'apps/mobile/app/(auth)/login.tsx', 'apps/mobile/app/(auth)/forgot-password.tsx',
  'apps/mobile/app/(tabs)/_layout.tsx', 'apps/mobile/app/(tabs)/index.tsx', 'apps/mobile/app/(tabs)/cycle.tsx', 'apps/mobile/app/(tabs)/history.tsx',
  'apps/mobile/app/cycle/[id]/supplies.tsx', 'apps/mobile/app/cycle/[id]/camera.tsx', 'apps/mobile/app/cycle/[id]/summary.tsx',
  'apps/mobile/app/+not-found.tsx', 'apps/mobile/app/_layout.tsx',
  'apps/mobile/src/domain/entities/User.ts', 'apps/mobile/src/domain/entities/Cycle.ts', 'apps/mobile/src/domain/entities/Supply.ts', 'apps/mobile/src/domain/entities/Photo.ts',
  'apps/mobile/src/domain/use-cases/AuthenticateUser.ts', 'apps/mobile/src/domain/use-cases/StartCycle.ts', 'apps/mobile/src/domain/use-cases/RegisterSupply.ts', 'apps/mobile/src/domain/use-cases/CapturePhoto.ts', 'apps/mobile/src/domain/use-cases/SyncPendingData.ts', 'apps/mobile/src/domain/use-cases/FinalizeCycle.ts',
  'apps/mobile/src/domain/contracts/IAuthRepository.ts', 'apps/mobile/src/domain/contracts/ICycleRepository.ts', 'apps/mobile/src/domain/contracts/ISyncService.ts',
  'apps/mobile/src/data/repositories/AuthRepository.ts', 'apps/mobile/src/data/repositories/CycleRepository.ts', 'apps/mobile/src/data/repositories/SupplyRepository.ts', 'apps/mobile/src/data/repositories/PhotoRepository.ts',
  'apps/mobile/src/data/datasources/local/database.ts',
  'apps/mobile/src/data/datasources/remote/api.ts', 'apps/mobile/src/data/datasources/remote/interceptors.ts',
  'apps/mobile/src/presentation/components/atoms/Button.tsx', 'apps/mobile/src/presentation/components/atoms/Input.tsx', 'apps/mobile/src/presentation/components/atoms/Text.tsx',
  'apps/mobile/src/presentation/components/molecules/FormField.tsx', 'apps/mobile/src/presentation/components/molecules/PhotoCard.tsx',
  'apps/mobile/src/presentation/components/organisms/SupplyForm.tsx', 'apps/mobile/src/presentation/components/organisms/CycleHeader.tsx',
  'apps/mobile/src/presentation/hooks/useAuth.ts', 'apps/mobile/src/presentation/hooks/useCycle.ts', 'apps/mobile/src/presentation/hooks/useSync.ts', 'apps/mobile/src/presentation/hooks/useNetworkStatus.ts',
  'apps/mobile/src/presentation/stores/authStore.ts', 'apps/mobile/src/presentation/stores/cycleStore.ts', 'apps/mobile/src/presentation/stores/syncStore.ts',
  'apps/mobile/src/presentation/theme/colors.ts', 'apps/mobile/src/presentation/theme/typography.ts', 'apps/mobile/src/presentation/theme/spacing.ts',
  'apps/mobile/src/infrastructure/config/env.ts', 'apps/mobile/src/infrastructure/config/queryClient.ts',
  'apps/mobile/src/infrastructure/services/LocationService.ts', 'apps/mobile/src/infrastructure/services/CameraService.ts', 'apps/mobile/src/infrastructure/services/NetworkService.ts', 'apps/mobile/src/infrastructure/services/NotificationService.ts',
  'apps/mobile/src/infrastructure/logging/logger.ts',
  'apps/mobile/app.json', 'apps/mobile/eas.json', 'apps/mobile/babel.config.js', 'apps/mobile/metro.config.js', 'apps/mobile/tsconfig.json', 'apps/mobile/jest.config.js', 'apps/mobile/.eslintrc.js', 'apps/mobile/.prettierrc', 'apps/mobile/package.json',
  
  // Backend (NestJS Modular)
  'apps/api/src/main.ts', 'apps/api/src/app.module.ts',
  'apps/api/src/config/configuration.ts', 'apps/api/src/config/validation.schema.ts',
  'apps/api/src/common/decorators/current-user.decorator.ts', 'apps/api/src/common/decorators/roles.decorator.ts',
  'apps/api/src/common/filters/http-exception.filter.ts',
  'apps/api/src/common/guards/jwt-auth.guard.ts', 'apps/api/src/common/guards/roles.guard.ts',
  'apps/api/src/common/interceptors/logging.interceptor.ts', 'apps/api/src/common/interceptors/transform.interceptor.ts',
  'apps/api/src/common/pipes/zod-validation.pipe.ts',
  'apps/api/src/modules/auth/auth.module.ts', 'apps/api/src/modules/auth/auth.controller.ts', 'apps/api/src/modules/auth/auth.service.ts', 'apps/api/src/modules/auth/strategies/jwt.strategy.ts', 'apps/api/src/modules/auth/dto/login.dto.ts', 'apps/api/src/modules/auth/dto/refresh.dto.ts',
  'apps/api/src/modules/users/users.module.ts', 'apps/api/src/modules/users/users.controller.ts', 'apps/api/src/modules/users/users.service.ts',
  'apps/api/src/modules/cycles/cycles.module.ts', 'apps/api/src/modules/cycles/cycles.controller.ts', 'apps/api/src/modules/cycles/cycles.service.ts',
  'apps/api/src/modules/photos/services/s3.service.ts',
  'apps/api/src/infrastructure/database/prisma.service.ts',
  'apps/api/src/infrastructure/logging/pino.logger.ts',
  'apps/api/prisma/schema.prisma', 'apps/api/prisma/seed.ts',
  'apps/api/docker/Dockerfile', 'apps/api/docker/docker-compose.yml',
  'apps/api/.env.example', 'apps/api/nest-cli.json', 'apps/api/tsconfig.json', 'apps/api/jest.config.js', 'apps/api/package.json'
];

// Pastas vazias que precisam existir mas não têm arquivos no array acima
const emptyDirs = [
  'packages/shared-types', 'packages/shared-schemas', 'packages/shared-constants', 'packages/eslint-config',
  'apps/mobile/src/data/datasources/local/models', 'apps/mobile/src/data/mappers', 'apps/mobile/src/shared/utils', 'apps/mobile/src/shared/errors', 'apps/mobile/src/shared/constants',
  'apps/mobile/__tests__/unit/use-cases', 'apps/mobile/__tests__/integration', 'apps/mobile/__tests__/e2e',
  'apps/mobile/assets/images', 'apps/mobile/assets/fonts', 'apps/mobile/assets/icons',
  'apps/api/src/modules/users/dto', 'apps/api/src/modules/cycles/dto', 'apps/api/src/modules/supplies', 'apps/api/src/modules/sync', 'apps/api/src/modules/health',
  'apps/api/src/infrastructure/aws', 'apps/api/src/types', 'apps/api/prisma/migrations',
  'apps/api/test/unit', 'apps/api/test/integration', 'apps/api/test/e2e'
];

// Função para criar o arquivo (e as pastas do caminho se não existirem)
files.forEach(file => {
  const filePath = path.join(__dirname, file);
  const dirPath = path.dirname(filePath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '');
  }
});

// Função para criar as pastas vazias explicitamente
emptyDirs.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

console.log('✅ Estrutura completa gerada! O monorepo está idêntico à documentação.');