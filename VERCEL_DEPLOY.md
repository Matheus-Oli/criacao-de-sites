# Deploy no Vercel

Este projeto está agora configurado para deploy no Vercel. Siga os passos abaixo:

## Configurações Criadas

1. **vercel.json** - Configuração principal do Vercel
2. **api/** - Funções serverless para API endpoints
   - `api/ping.js` - Endpoint de ping
   - `api/demo.js` - Endpoint de demonstração

## Como fazer o deploy

### Opção 1: Deploy via Git (Recomendado)

1. Faça commit de todas as mudanças:

   ```bash
   git add .
   git commit -m "Configuração para Vercel"
   git push origin main
   ```

2. No painel do Vercel:
   - Conecte seu repositório GitHub/GitLab
   - Importe o projeto
   - O deploy será automático

### Opção 2: Deploy via CLI

1. Instale a CLI do Vercel:

   ```bash
   npm i -g vercel
   ```

2. Execute o deploy:
   ```bash
   vercel --prod
   ```

## Configurações Importantes

- **Build Command**: `npm run build:client`
- **Output Directory**: `dist/spa`
- **Node.js Version**: 18.x

## Endpoints da API

Após o deploy, suas APIs estarão disponíveis em:

- `https://seusite.vercel.app/api/ping`
- `https://seusite.vercel.app/api/demo`

## Roteamento SPA

O arquivo vercel.json está configurado para:

- Servir a API em `/api/*`
- Redirecionar todas as outras rotas para `index.html` (SPA)

## Troubleshooting

Se ainda encontrar erro 404:

1. Verifique se o build está funcionando localmente
2. Confirme que os arquivos estão sendo gerados em `dist/spa`
3. Verifique se as funções serverless estão na pasta `api/`
