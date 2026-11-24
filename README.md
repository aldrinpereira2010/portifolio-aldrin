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

## Rodando localmente

Não há dependências. Abra o `index.html` no navegador ou sirva a pasta com qualquer servidor estático, por exemplo:

