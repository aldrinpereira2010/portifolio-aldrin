# Fotos do site

Coloque aqui as suas fotografias usando **exatamente** os nomes abaixo (em minúsculas, formato `.jpg`).
Enquanto um arquivo não existir, o site mostra um placeholder com o nome esperado — assim que você
adicionar a foto, ela aparece sozinha, sem precisar mexer no código.

| Arquivo | Onde aparece | Formato sugerido |
| --- | --- | --- |
| `perfil.jpg` | Início — foto principal em arco | Vertical 4:5 (ex.: 1000×1250) |
| `sobre-mim.jpg` | Sobre mim — polaroid | Vertical 5:6 (ex.: 1000×1200) |
| `academia.jpg` | Hobbies — Musculação & academia (card grande) | Horizontal ou quadrada |
| `corrida.jpg` | Hobbies — Corrida & movimento | Horizontal 16:11 |
| `tecnologia.jpg` | Hobbies — Tecnologia & programação | Horizontal 16:11 |
| `musica.jpg` | Hobbies — Música | Horizontal 16:11 |
| `jogos.jpg` | Hobbies — Jogos & entretenimento | Horizontal 16:11 |
| `outros-interesses.jpg` | Hobbies — Próxima obsessão | Horizontal 16:11 |
| `projeto-01.jpg` … `projeto-03.jpg` | Tecnologia — capturas de tela dos projetos | Horizontal 16:10 |
| `galeria-01.jpg` … `galeria-12.jpg` | Galeria de momentos | Qualquer proporção (a grade recorta) |

## Dicas

- Prefira imagens com até ~1600 px no maior lado e menos de 500 KB para o site continuar rápido.
- Quer usar `.png` ou `.webp`? Basta trocar a extensão no atributo `src` correspondente no `index.html`.
- Para adicionar mais fotos na galeria, copie um bloco `<button class="g-item">` no `index.html`,
  troque o número do arquivo (ex.: `galeria-13.jpg`), a categoria (`data-category`) e a legenda (`data-caption`).
