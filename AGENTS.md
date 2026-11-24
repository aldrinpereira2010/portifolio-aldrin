# AGENTS.md

## Visão geral
Site pessoal de página única em **HTML, CSS e JavaScript puro** (requisito explícito do dono:
nada de React/Vue/Angular/Bootstrap, nem etapa de build). Publicado como site estático no Netlify
(`netlify.toml` → `publish = "."`). Todo o conteúdo está em português (pt-BR).

## Arquivos
- `index.html` — todas as seções (`#inicio`, `#sobre`, `#hobbies`, `#tecnologia`, `#galeria`, `#curiosidades`, `#contato`), sprite de ícones SVG (`<symbol id="i-*">`) e o `<dialog class="lightbox">`.
- `css/style.css` — organizado em blocos numerados (índice no topo). Tokens em `:root`; o tema escuro sobrescreve os mesmos tokens em `[data-theme="escuro"]`.
- `js/script.js` — módulos `iniciarX()` chamados no `DOMContentLoaded`. Objeto `PERFIL` (links/e-mail) e `TRECHOS` (snippets da janela de código) ficam no próprio arquivo para edição fácil.
- `assets/img/` — fotos do dono. `LEIA-ME.md` lista os nomes esperados.

## Decisões não óbvias
- **Placeholders de foto:** cada `<figure class="photo" data-label="…">` aponta para o arquivo real em `assets/img/`. Se a imagem falhar ao carregar, o JS adiciona `.is-empty` e injeta `.photo__ph` com o nome do arquivo. Nunca usar imagens aleatórias/estoque como se fossem fotos do dono.
- **Reveal ao rolar:** `.reveal` + `.is-visible` via IntersectionObserver; após a animação o JS **remove** a classe `.reveal`, porque `transform: none` dela sobrescreveria os transforms de hover dos cards.
- **Header:** o desfoque está em `.header::before`, não no `.header` — `backdrop-filter` no ancestral prenderia o menu mobile (`position: fixed`).
- **Tema:** um pequeno script inline no `<head>` aplica `data-theme` antes da renderização (evita flash) e adiciona a classe `.js` usada pelos estilos de animação (sem JS o conteúdo continua visível).
- **Links de contato** são preenchidos a partir de `PERFIL` via atributos `data-link` / `data-handle`.
- Texto em primeira pessoa evitando flexões de gênero sempre que possível; o dono pode ajustar.

## Convenções
- Comentários e nomes de funções/variáveis em português, como no restante do código.
- Classes no estilo BEM leve (`bloco__elemento`, `bloco--variação`, estados `is-*`).
- Animar apenas `transform`/`opacity`; respeitar `prefers-reduced-motion`.
- Sem dependências npm. Não adicionar build step.
