# Site pessoal — Alderlan

Um site pessoal com cara de "zine" editorial: apresenta quem eu sou, minha personalidade, hobbies,
estudos em tecnologia, uma galeria de momentos, curiosidades e formas de contato. Feito com
**HTML5 semântico, CSS e JavaScript puro**, sem frameworks e sem etapa de build.

## Seções

- **Início** — nome em destaque, frase de personalidade, introdução, frase rotativa ("agora, provavelmente estou…") e foto em arco.
- **Sobre mim** — história, características, fatos rápidos, foto estilo polaroid e linha do tempo.
- **Hobbies** — grade com academia, corrida, tecnologia, música, jogos e um espaço para novos interesses (efeito 3D e brilho ao passar o mouse).
- **Tecnologia & estudos** — linguagens (C, Python, Java, HTML, CSS, JavaScript, PHP, SQL) com uma janela de código interativa e cards de projetos com espaço para capturas de tela.
- **Galeria de momentos** — grade com proporções variadas, filtros por categoria e lightbox (teclado, setas e gesto de deslizar).
- **Curiosidades** — cards que viram ao clicar.
- **Contato** — Instagram, LinkedIn, GitHub e e-mail (com botão de copiar).

Extras: tema claro/escuro salvo no navegador, menu mobile em tela cheia, barra de progresso de leitura,
botão de voltar ao topo, animações ao rolar e respeito à preferência de "movimento reduzido".

## Estrutura

```
index.html          Página única com todas as seções
css/style.css       Estilos (variáveis de tema no topo)
js/script.js        Interações (objeto PERFIL com os links no topo)
assets/img/         Suas fotografias (veja assets/img/LEIA-ME.md)
netlify.toml        Publicação estática no Netlify
```

## Como personalizar

1. **Fotos:** coloque os arquivos em `assets/img/` com os nomes listados em `assets/img/LEIA-ME.md`
   (`perfil.jpg`, `sobre-mim.jpg`, `academia.jpg`, `galeria-01.jpg`…). Sem a foto, o site mostra um
   placeholder com o nome exato do arquivo esperado.
2. **Links e e-mail:** edite o objeto `PERFIL` no início de `js/script.js`.
3. **Textos:** procure os comentários `EDITE` no `index.html`.
4. **Cores e fontes:** altere as variáveis em `:root` (tema claro) e `[data-theme="escuro"]` no `css/style.css`.
5. **Trechos de código da seção Tech:** edite o objeto `TRECHOS` em `js/script.js`.

## Rodando localmente

Não há dependências. Abra o `index.html` no navegador ou sirva a pasta com qualquer servidor estático, por exemplo:

```bash
npx serve .
# ou
python3 -m http.server 8000
```

Para emular o ambiente do Netlify: `netlify dev`.
