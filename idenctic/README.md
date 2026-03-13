# Face Recognition Identic

A Next.js 14+ application with Clean Architecture, featuring face detection and recognition capabilities.

## Tech Stack

- **Next.js 14+** (App Router)
- **TypeScript**
- **Redux Toolkit**
- **Tailwind CSS**
- **react-webcam**
- **face-api.js**

## Project Structure

This project follows Clean Architecture principles with the following layers:

```
src/
├── domain/          # Business logic, entities, use cases, repository interfaces
├── data/            # Repository implementations, data sources, DTOs
├── infrastructure/  # External services (Redux store, face-api.js setup)
└── presentation/    # React components, hooks, Redux slices, pages
```

## Setup Instructions

1. Install dependencies:

```bash
npm install
```

2. Download face-api.js model weights:
   - Download the models from: https://github.com/justadudewhohacks/face-api.js-models
   - Place the `weights` folder in the `public` directory
   - The structure should be: `public/weights/face_detector_model-weights_manifest.json`, etc.

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- Landing page with modern UI
- Mock authentication with Redux
- Face detection with position validation (pitch, roll, yaw)
- Visual guide overlay for face positioning
- Image capture and storage
- Result page with captured image and user profile

## Scheme DB log

CREATE TABLE [dbo].[verification_logs] (
-- Primary Key menggunakan ID otomatis
[id] BIGINT IDENTITY(1,1) NOT NULL,

        -- User ID (siapa petugas/user yang melakukan pengecekan)
        [user_id]              varchar(100) NOT NULL, -- Sesuaikan tipe datanya (INT/UUID) dengan tabel Users Anda

        -- Data Target
        [nik]           VARCHAR(16) NOT NULL,
        [name]          NVARCHAR(255) NULL,

        -- Hasil Verifikasi
        [status]               VARCHAR(20) NOT NULL, -- MATCH, MISMATCH, NOT_FOUND, ERROR
        [similarity_score]     DECIMAL(5, 4) NULL,   -- Skor 0.0000 sampai 1.0000 (0-100%)

        -- Bukti Capture (Path ke Storage/S3)
        [captured_image_path]  NVARCHAR(512) NULL,

        -- Data Teknis Dukcapil (Mentah dalam format JSON)
        [dukcapil_raw_response] NVARCHAR(MAX) NULL,

        -- Info Kesalahan (Jika API fail)
        [error_message]        NVARCHAR(MAX) NULL,

        -- Audit Trail Perangkat
        [ip_address]           VARCHAR(45) NULL,
        [device_info]          NVARCHAR(MAX) NULL,

        -- Waktu Kejadian
        [created_at]           DATETIME2 NOT NULL DEFAULT GETDATE(),
        -- Constraints
        CONSTRAINT [PK_verification_logs] PRIMARY KEY CLUSTERED ([id] ASC)
    );
