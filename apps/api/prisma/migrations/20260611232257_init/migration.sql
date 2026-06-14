-- CreateTable
CREATE TABLE "Sinistro" (
    "id" TEXT NOT NULL,
    "foto" TEXT,
    "tipo" TEXT NOT NULL,
    "trecho" TEXT NOT NULL,
    "descricao" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sinistro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Confinamento" (
    "id" TEXT NOT NULL,
    "foto" TEXT,
    "latitude" TEXT,
    "longitude" TEXT,
    "observacoes" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Confinamento_pkey" PRIMARY KEY ("id")
);
