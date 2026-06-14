const BASE_URL = 'http://127.0.0.1:3000';

export const api = {
  sinistro: {
    criar: async (data: { foto?: string; tipo: string; trecho: string; descricao?: string }) => {
      const res = await fetch(`${BASE_URL}/sinistro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return res.json();
    },
    listar: async () => {
      const res = await fetch(`${BASE_URL}/sinistro`);
      return res.json();
    },
  },
  confinamento: {
    criar: async (data: { foto?: string; latitude?: string; longitude?: string; observacoes?: string }) => {
      const res = await fetch(`${BASE_URL}/confinamento`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return res.json();
    },
  },
};