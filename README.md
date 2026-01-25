# juliamellotattoo

## Estrutura do projeto

O projeto é um site/portfolio em Angular. A organização foi pensada para facilitar a manutenção e a divisão por responsabilidades:

- **Componente orquestrador**: o arquivo `app.component.html` funciona como o componente geral que agrupa todos os demais componentes (cada parte do site é um componente). Ele define a sequência de exibição no site.
- **Componentes por pasta**: cada pasta dentro de `src/app/` representa uma parte do site (por exemplo: `banner-site`, `painting-site`, `portfolio-site`, `form-site`, `menu-site`, `footer-site`, `bio-site`, `tips-site`). Isso permite trabalhar e manter cada parte de forma isolada.
- **Observação sobre ordem**: a IDE costuma listar pastas em ordem alfabética. Por isso a ordem visual no explorador de arquivos pode não refletir a sequência do site — para ver a ordem real, confira o `app.component.html` que contém a composição final das seções.

Essa separação facilita alterar, testar ou substituir uma seção (componente) sem afetar o restante da aplicação.

## Fluxo de desenvolvimento e deploy

O fluxo adotado neste projeto contempla três ambientes/estados principais: desenvolvimento local (validação rápida), homologação/stage (validação real com o cliente) e produção (main). Abaixo estão os scripts disponíveis e como são usados no fluxo.

### 1) Ambiente local (desenvolvimento rápido e validação em dispositivos)

- **Script recomendado:** `npm run public`
	- Executa: `ng serve --host=0.0.0.0 --port=4201`.
	- Por que usar: roda o servidor de desenvolvimento escutando em todas as interfaces (`0.0.0.0`), o que permite acessar o site a partir de outros dispositivos na mesma rede (por exemplo, celular). Isso facilita validar visualmente como o site está exibido em telas reais.

### 2) Ambiente de homologação / stage (validação com o cliente)

- **Processo:**
	1. Gerar build de produção: `npm run pbuild` (executa `ng build --configuration production --base-href='./'`). Isso cria os arquivos otimizados em `dist/`.
	2. Publicar o conteúdo gerado no repositório/GitHub Pages: `npm run deploy` (utiliza `angular-cli-ghpages --dir=dist/juliamellotattoo/browser`). O site de homologação deste repositório está disponível em: `https://mikaelmedeiros.github.io/juliamellotattoo/`.
	3. Validar com o cliente/dono do site se tudo aparece corretamente no ambiente público (homologação).

### 3) Produção (main)

- **Fluxo final:** somente depois de validar localmente (passo 1) e na homologação/preview (passo 2) é seguro commitar e mesclar para a branch `main`.
- **Atenção:** não faça commit direto para `main` sem antes validar com o DONO do SITE. Alterações não testadas em `main` podem afetar diretamente a exibição do site e consequentemente as vendas e o funcionamento do negócio.

### Scripts úteis (resumo)

- `npm start` — `ng serve` (desenvolvimento padrão, `localhost:4200`).
- `npm run public` — `ng serve --host=0.0.0.0 --port=4201` (útil para testar em dispositivos na mesma rede).
- `npm run pbuild` — `ng build --configuration production --base-href='./'` (gera build de produção em `dist/`).
- `npm run deploy` — `angular-cli-ghpages --dir=dist/juliamellotattoo/browser` (publica o conteúdo do build no GitHub Pages; requer o build gerado previamente).

