# Project File Tree Structure

```
idenctic/
├── public/
│   └── weights/                          # face-api.js model weights (see FACE_API_SETUP.md)
│       ├── face_detector_model-weights_manifest.json
│       ├── face_detector_model-shard1
│       ├── face_landmark_68_model-weights_manifest.json
│       ├── face_landmark_68_model-shard1
│       ├── face_recognition_model-weights_manifest.json
│       └── face_recognition_model-shard1
│
├── src/
│   ├── app/                              # Next.js App Router pages
│   │   ├── layout.tsx                    # Root layout with Redux provider
│   │   ├── page.tsx                      # Landing page route
│   │   ├── globals.css                   # Global styles and Tailwind imports
│   │   ├── login/
│   │   │   └── page.tsx                  # Login page route
│   │   ├── camera/
│   │   │   └── page.tsx                  # Camera/Face detection page route
│   │   └── result/
│   │       └── page.tsx                  # Result page route
│   │
│   ├── domain/                            # Domain Layer (Business Logic)
│   │   ├── entities/
│   │   │   └── index.ts                  # Domain entities (User, AuthState, CapturedImage, FacePosition)
│   │   ├── repositories/
│   │   │   └── index.ts                  # Repository interfaces (IAuthRepository, IImageRepository, IFaceDetectionRepository)
│   │   └── use-cases/
│   │       └── index.ts                  # Use case interfaces and implementations
│   │
│   ├── data/                              # Data Layer (Data Access)
│   │   ├── dto/
│   │   │   └── index.ts                  # Data Transfer Objects
│   │   ├── data-sources/
│   │   │   └── index.ts                  # Data sources (AuthDataSource, ImageDataSource)
│   │   └── repositories/
│   │       └── index.ts                  # Repository implementations (AuthRepository, ImageRepository, FaceDetectionRepository)
│   │
│   ├── infrastructure/                    # Infrastructure Layer (External Services)
│   │   ├── di/
│   │   │   └── container.ts              # Dependency Injection container
│   │   ├── face-api/
│   │   │   └── faceApiService.ts         # face-api.js service and model loading
│   │   └── redux/
│   │       ├── store.ts                  # Redux store configuration
│   │       ├── hooks.ts                  # Type-safe Redux hooks
│   │       └── ReduxProvider.tsx        # Redux Provider component
│   │
│   └── presentation/                      # Presentation Layer (UI)
│       ├── components/
│       │   ├── LandingPage.tsx           # Landing page component
│       │   ├── LoginPage.tsx              # Login page component
│       │   ├── CameraView.tsx            # Camera/Face detection component
│       │   └── ResultPage.tsx            # Result page component
│       ├── hooks/
│       │   ├── useAuth.ts                # Authentication hook
│       │   ├── useFaceDetection.ts       # Face detection hook
│       │   └── useImageCapture.ts        # Image capture hook
│       └── redux/
│           └── slices/
│               ├── authSlice.ts          # Auth Redux slice
│               └── imageSlice.ts         # Image Redux slice
│
├── .eslintrc.json                        # ESLint configuration
├── .gitignore                            # Git ignore rules
├── FACE_API_SETUP.md                     # Instructions for setting up face-api.js weights
├── next.config.js                        # Next.js configuration
├── next-env.d.ts                         # Next.js TypeScript declarations
├── package.json                          # Project dependencies and scripts
├── postcss.config.js                     # PostCSS configuration
├── README.md                             # Project documentation
├── tailwind.config.ts                    # Tailwind CSS configuration
└── tsconfig.json                         # TypeScript configuration
```

## Clean Architecture Layers

### Domain Layer (`src/domain/`)
- **Entities**: Core business objects (User, AuthState, CapturedImage, FacePosition)
- **Repositories**: Interfaces defining data access contracts
- **Use Cases**: Business logic implementations

### Data Layer (`src/data/`)
- **DTOs**: Data Transfer Objects for API communication
- **Data Sources**: Concrete implementations of data fetching (mock APIs)
- **Repositories**: Implementations of domain repository interfaces

### Infrastructure Layer (`src/infrastructure/`)
- **DI Container**: Dependency injection and use case instantiation
- **Face API Service**: face-api.js initialization and model loading
- **Redux Store**: Global state management configuration

### Presentation Layer (`src/presentation/`)
- **Components**: React UI components
- **Hooks**: Custom React hooks for business logic
- **Redux Slices**: State management slices

## Application Flow

1. **Landing Page** (`/`) → User clicks "Get Started"
2. **Login Page** (`/login`) → User enters credentials → Updates Redux auth state
3. **Camera Page** (`/camera`) → Face detection → Validates position → Captures image → Stores in Redux
4. **Result Page** (`/result`) → Displays captured image and user profile
