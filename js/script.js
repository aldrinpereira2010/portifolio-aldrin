/* =====================================================================
   SITE PESSOAL — js/script.js
   JavaScript puro, sem frameworks.
   ---------------------------------------------------------------------
   Índice
   00. PERFIL — seus links e contatos (EDITE AQUI)
   01. Utilitários
   02. Links e contatos (preenche o HTML a partir do PERFIL)
   03. Espaços para fotos (placeholders automáticos)
   04. Tema claro / escuro
   05. Navegação: rolagem suave, menu mobile, link ativo, cabeçalho
   06. Barra de progresso + botão voltar ao topo
   07. Animações ao rolar (scroll reveal)
   08. Frase rotativa do hero
   09. Efeito 3D nos cards de hobbies
   10. Janela de código (linguagens)
   11. Galeria: filtros + lightbox
   12. Cards de curiosidades (flip)
   13. Copiar e-mail + toast
   14. Inicialização
   ===================================================================== */

/* ---------------------------------------------------------------------
   00. PERFIL — EDITE AQUI
   Troque pelos seus usuários. Todos os botões de contato e o card
   "Ver mais projetos no GitHub" usam estes valores automaticamente.
   --------------------------------------------------------------------- */
const PERFIL = {
  instagram: 'seu.usuario',          // sem o @  → instagram.com/seu.usuario
  linkedin: 'seu-usuario',           // o final da URL → linkedin.com/in/seu-usuario
  github: 'seu-usuario',             // → github.com/seu-usuario
  email: 'seuemail@exemplo.com'      // seu e-mail
};

/* ---------------------------------------------------------------------
   01. UTILITÁRIOS
   --------------------------------------------------------------------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const prefereMenosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Escapa texto para uso seguro dentro de HTML */
function escapar(texto) {
  return texto.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/** Cria um ícone SVG a partir do sprite do index.html */
function criarIcone(nome) {
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('class', 'icon');
  svg.setAttribute('aria-hidden', 'true');
  const use = document.createElementNS(svgNS, 'use');
  use.setAttribute('href', `#i-${nome}`);
  svg.appendChild(use);
  return svg;
}

/* ---------------------------------------------------------------------
   02. LINKS E CONTATOS
   --------------------------------------------------------------------- */
function iniciarLinks() {
  const urls = {
    instagram: `https://instagram.com/${PERFIL.instagram}`,
    linkedin: `https://www.linkedin.com/in/${PERFIL.linkedin}`,
    github: `https://github.com/${PERFIL.github}`,
    email: `mailto:${PERFIL.email}`
  };
  const textos = {
    instagram: `@${PERFIL.instagram}`,
    linkedin: `/in/${PERFIL.linkedin}`,
    github: `@${PERFIL.github}`,
    email: PERFIL.email
  };

  $$('[data-link]').forEach((el) => {
    const url = urls[el.dataset.link];
    if (url) el.href = url;
  });
  $$('[data-handle]').forEach((el) => {
    const texto = textos[el.dataset.handle];
    if (texto) el.textContent = texto;
  });
}

/* ---------------------------------------------------------------------
   03. ESPAÇOS PARA FOTOS
   Se o arquivo (ex.: assets/img/perfil.jpg) existir, a foto aparece
   com um fade suave. Se não existir, entra um placeholder com o
   nome exato do arquivo que deve ser adicionado.
   --------------------------------------------------------------------- */
function criarPlaceholder(arquivo, rotulo) {
  const ph = document.createElement('div');
  ph.className = 'photo__ph';
  ph.setAttribute('role', 'img');
  ph.setAttribute('aria-label', `Espaço para foto: ${rotulo} (${arquivo})`);

  const icone = document.createElement('span');
  icone.className = 'photo__ph-icon';
  icone.appendChild(criarIcone('camera'));

  const label = document.createElement('span');
  label.className = 'photo__ph-label';
  label.textContent = rotulo;

  const file = document.createElement('span');
  file.className = 'photo__ph-file';
  file.textContent = arquivo;

  ph.append(icone, label, file);
  return ph;
}

function prepararFoto(figure) {
  const img = $('img', figure);
  if (!img) return;

  const carregou = () => figure.classList.add('is-loaded');
  const falhou = () => {
    if (figure.classList.contains('is-empty')) return;
    figure.classList.add('is-empty');
    figure.appendChild(criarPlaceholder(img.getAttribute('src'), figure.dataset.label || 'Sua foto aqui'));
  };

  // A imagem pode já ter terminado (com sucesso ou erro) antes do script rodar
  if (img.complete) {
    img.naturalWidth > 0 ? carregou() : falhou();
  } else {
    img.addEventListener('load', carregou, { once: true });
    img.addEventListener('error', falhou, { once: true });
  }
}

function iniciarFotos() {
  $$('.photo').forEach(prepararFoto);
}

/* ---------------------------------------------------------------------
   04. TEMA CLARO / ESCURO
   A escolha fica salva no navegador (localStorage).
   --------------------------------------------------------------------- */
function iniciarTema() {
  const raiz = document.documentElement;
  const botao = $('.theme-toggle');

  const aplicar = (tema) => {
    raiz.setAttribute('data-theme', tema);
    botao.setAttribute('aria-label', tema === 'escuro' ? 'Ativar tema claro' : 'Ativar tema escuro');
  };

  aplicar(raiz.getAttribute('data-theme') || 'claro');

  botao.addEventListener('click', () => {
    const novo = raiz.getAttribute('data-theme') === 'escuro' ? 'claro' : 'escuro';
    aplicar(novo);
    try { localStorage.setItem('tema', novo); } catch (e) { /* navegação privada */ }
  });

  // Acompanha o sistema operacional, se a pessoa nunca escolheu manualmente
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    let salvo = null;
    try { salvo = localStorage.getItem('tema'); } catch (err) { /* ignora */ }
    if (!salvo) aplicar(e.matches ? 'escuro' : 'claro');
  });
}

/* ---------------------------------------------------------------------
   05. NAVEGAÇÃO
   --------------------------------------------------------------------- */
function iniciarNavegacao() {
  const header = $('.header');
  const menu = $('#menu-principal');
  const toggle = $('.nav__toggle');
  const links = $$('.nav__link');

  /* Menu mobile: abre/fecha */
  const abrirMenu = (abrir) => {
    menu.classList.toggle('is-open', abrir);
    toggle.setAttribute('aria-expanded', String(abrir));
    toggle.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu');
    document.body.classList.toggle('menu-open', abrir);
    header.classList.remove('is-hidden');
  };
  toggle.addEventListener('click', () => abrirMenu(!menu.classList.contains('is-open')));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      abrirMenu(false);
      toggle.focus();
    }
  });
  // Se a tela for ampliada para desktop com o menu aberto, fecha
  window.matchMedia('(min-width: 921px)').addEventListener('change', (e) => { if (e.matches) abrirMenu(false); });

  /* Rolagem suave para qualquer link interno (#secao) */
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const alvo = document.querySelector(id);
      if (!alvo) return;
      e.preventDefault();
      abrirMenu(false);

      const topo = id === '#inicio' ? 0 : alvo.getBoundingClientRect().top + window.scrollY - header.offsetHeight + 1;
      window.scrollTo({ top: topo, behavior: prefereMenosMovimento ? 'auto' : 'smooth' });
      history.replaceState(null, '', id);

      // Move o foco para a seção (acessibilidade por teclado)
      if (alvo.tagName !== 'MAIN') {
        alvo.setAttribute('tabindex', '-1');
        alvo.focus({ preventScroll: true });
      }
    });
  });

  /* Destaca no menu a seção que está na tela */
  const secoes = $$('main section[id]');
  const observer = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      links.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === `#${entrada.target.id}`));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  secoes.forEach((s) => observer.observe(s));

  /* Cabeçalho: fundo ao rolar e esconde ao descer / mostra ao subir */
  let ultimoY = window.scrollY;
  const aoRolar = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 20);
    if (!menu.classList.contains('is-open')) {
      header.classList.toggle('is-hidden', y > 600 && y > ultimoY + 4);
      if (y < ultimoY - 4) header.classList.remove('is-hidden');
    }
    ultimoY = y;
  };
  return aoRolar;
}

/* ---------------------------------------------------------------------
   06. BARRA DE PROGRESSO + VOLTAR AO TOPO
   --------------------------------------------------------------------- */
function iniciarProgresso() {
  const barra = $('.scroll-progress span');
  const botaoTopo = $('.back-to-top');

  botaoTopo.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefereMenosMovimento ? 'auto' : 'smooth' });
  });

  return () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progresso = max > 0 ? window.scrollY / max : 0;
    barra.style.transform = `scaleX(${progresso})`;
    botaoTopo.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.8);
  };
}

/* ---------------------------------------------------------------------
   07. ANIMAÇÕES AO ROLAR
   Elementos com a classe .reveal aparecem quando entram na tela.
   Depois da animação, a classe é removida para não interferir nos
   efeitos de hover de cada card.
   --------------------------------------------------------------------- */
function iniciarReveal() {
  const elementos = $$('.reveal');

  const finalizar = (el) => {
    const atraso = (parseFloat(getComputedStyle(el).getPropertyValue('--d')) || 0) * 90;
    setTimeout(() => el.classList.remove('reveal', 'is-visible'), atraso + 1000);
  };

  if (prefereMenosMovimento || !('IntersectionObserver' in window)) {
    elementos.forEach((el) => el.classList.remove('reveal'));
    return;
  }

  const observer = new IntersectionObserver((entradas, obs) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      entrada.target.classList.add('is-visible');
      finalizar(entrada.target);
      obs.unobserve(entrada.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elementos.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------------------
   08. FRASE ROTATIVA DO HERO
   As opções ficam no atributo data-words do index.html.
   --------------------------------------------------------------------- */
function iniciarRotator() {
  const el = $('.rotator');
  if (!el || prefereMenosMovimento) return;
  const palavras = el.dataset.words.split('|');
  let i = 0;

  setInterval(() => {
    el.classList.add('is-out');
    setTimeout(() => {
      i = (i + 1) % palavras.length;
      el.textContent = palavras[i];
      el.classList.remove('is-out');
    }, 350);
  }, 2800);
}

/* ---------------------------------------------------------------------
   09. EFEITO 3D NOS CARDS DE HOBBIES (apenas com mouse)
   --------------------------------------------------------------------- */
function iniciarTilt() {
  if (prefereMenosMovimento || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const INTENSIDADE = 7; // graus máximos de inclinação

  $$('.tilt').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      card.style.setProperty('--ry', `${(x - 0.5) * INTENSIDADE}deg`);
      card.style.setProperty('--rx', `${(0.5 - y) * INTENSIDADE}deg`);
      card.style.setProperty('--mx', `${x * 100}%`);
      card.style.setProperty('--my', `${y * 100}%`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });
}

/* ---------------------------------------------------------------------
   10. JANELA DE CÓDIGO
   Para editar os trechos ou as descrições, altere o objeto TRECHOS.
   --------------------------------------------------------------------- */
const TRECHOS = {
  c: {
    arquivo: 'corrida.c',
    nota: 'C foi onde aprendi lógica de verdade: memória, ponteiros e o porquê de tudo.',
    palavras: ['include', 'int', 'void', 'while', 'return', 'printf', 'main'],
    codigo: `#include <stdio.h>

int main(void) {
    int km = 0;
    while (km < 5) {
        printf("km %d concluído\\n", ++km);
    }
    return 0;
}`
  },
  python: {
    arquivo: 'treino.py',
    nota: 'Python é minha ferramenta para automatizar coisas e testar ideias rápido.',
    palavras: ['for', 'in', 'def', 'print', 'return', 'enumerate', 'if', 'else'],
    codigo: `treinos = ["peito", "costas", "pernas"]

def rotina(lista):
    for dia, treino in enumerate(lista, 1):
        print(f"Dia {dia}: {treino}")

rotina(treinos)  # sem desculpas`
  },
  java: {
    arquivo: 'Rotina.java',
    nota: 'Java me ensinou orientação a objetos e a organizar projetos maiores.',
    palavras: ['public', 'class', 'static', 'void', 'String', 'for', 'System', 'new'],
    codigo: `public class Rotina {
    public static void main(String[] args) {
        String[] dia = {"treino", "aula", "código", "jogo"};
        for (String item : dia) {
            System.out.println("> " + item);
        }
    }
}`
  },
  html: {
    arquivo: 'index.html',
    nota: 'HTML semântico é a base de tudo que eu faço na web (inclusive deste site).',
    palavras: [],
    tags: true,
    codigo: `<section id="sobre">
  <h1>Olá, mundo!</h1>
  <p>Bem-vindo ao meu cantinho.</p>
  <a href="#contato">Bora conversar</a>
</section>`
  },
  css: {
    arquivo: 'style.css',
    nota: 'CSS é onde a personalidade aparece: cores, ritmo, animações.',
    palavras: ['display', 'gap', 'color', 'animation', 'transform', 'var', 'infinite', 'alternate'],
    codigo: `.motivacao {
  display: flex;
  gap: 1rem;
  color: var(--laranja);
  animation: foco 2s infinite alternate;
}`
  },
  javascript: {
    arquivo: 'humor.js',
    nota: 'JavaScript dá vida às páginas — o tema escuro e a galeria daqui são puro JS.',
    palavras: ['const', 'let', 'function', 'return', 'console', 'true', 'false'],
    codigo: `const cafes = 2;

function humor(xicaras) {
  return xicaras > 0 ? "produtivo" : "modo zumbi";
}

console.log(humor(cafes));`
  },
  php: {
    arquivo: 'hobbies.php',
    nota: 'PHP foi minha porta de entrada para o back-end e para sites dinâmicos.',
    palavras: ['php', 'echo', 'implode', 'foreach', 'as', 'function'],
    codigo: `<?php
$hobbies = ['academia', 'corrida', 'música'];

echo "Curto " . implode(', ', $hobbies);
?>`
  },
  sql: {
    arquivo: 'playlist.sql',
    nota: 'SQL para guardar e consultar dados — dos projetos da faculdade às minhas playlists.',
    palavras: ['SELECT', 'FROM', 'WHERE', 'ORDER', 'BY', 'LIMIT', 'RANDOM', 'AND'],
    codigo: `SELECT musica, artista
FROM playlist
WHERE humor = 'foco'
  AND bpm > 120
ORDER BY RANDOM()
LIMIT 1;`
  }
};

/** Aplica cores simples (strings, números, palavras-chave, tags) a uma linha */
function destacarLinha(linha, palavras, comTags) {
  const regex = comTags
    ? /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(<\/?[a-zA-Z][\w-]*|\/?>)|\b(\d+)\b|([A-Za-z_]\w*)/g
    : /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\u0000)|\b(\d+)\b|([A-Za-z_]\w*)/g;
  const span = (cls, txt) => `<span class="${cls}">${escapar(txt)}</span>`;
  let html = '';
  let ultimo = 0;
  let m;

  while ((m = regex.exec(linha))) {
    html += escapar(linha.slice(ultimo, m.index));
    if (m[1]) html += span('tk-str', m[1]);
    else if (m[2]) html += span('tk-tag', m[2]);
    else if (m[3]) html += span('tk-num', m[3]);
    else html += palavras.has(m[4]) ? span('tk-kw', m[4]) : escapar(m[4]);
    ultimo = regex.lastIndex;
  }
  return html + escapar(linha.slice(ultimo));
}

function iniciarCodigo() {
  const botoes = $$('.lang');
  const codigo = $('.code-window__body code');
  const arquivo = $('.code-window__file');
  const nota = $('.lang-note');
  if (!codigo) return;

  const mostrar = (lang) => {
    const t = TRECHOS[lang];
    if (!t) return;
    const palavras = new Set(t.palavras);
    codigo.innerHTML = t.codigo
      .split('\n')
      .map((linha, i) => `<span class="ln" style="--i:${i}">${destacarLinha(linha, palavras, t.tags) || ' '}</span>`)
      .join('');
    arquivo.textContent = t.arquivo;
    nota.textContent = t.nota;
    botoes.forEach((b) => {
      const ativo = b.dataset.lang === lang;
      b.classList.toggle('is-active', ativo);
      b.setAttribute('aria-selected', String(ativo));
      b.tabIndex = ativo ? 0 : -1;
    });
  };

  botoes.forEach((b, i) => {
    b.addEventListener('click', () => mostrar(b.dataset.lang));
    // Navegação por setas do teclado entre as abas
    b.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const prox = botoes[(i + (e.key === 'ArrowRight' ? 1 : -1) + botoes.length) % botoes.length];
      prox.focus();
      mostrar(prox.dataset.lang);
    });
  });

  mostrar(botoes[0].dataset.lang);
}

/* ---------------------------------------------------------------------
   11. GALERIA: FILTROS + LIGHTBOX
   --------------------------------------------------------------------- */
function iniciarGaleria() {
  const itens = $$('.g-item');
  const filtros = $$('.filter');
  const lightbox = $('.lightbox');
  if (!lightbox || !itens.length) return;

  const midia = $('.lightbox__media', lightbox);
  const legenda = $('.lightbox__text', lightbox);
  const contador = $('.lightbox__count', lightbox);
  let visiveis = itens;
  let atual = 0;
  let origemFoco = null;

  /* Filtros por categoria */
  filtros.forEach((f) => {
    f.addEventListener('click', () => {
      const cat = f.dataset.filter;
      filtros.forEach((b) => {
        const ativo = b === f;
        b.classList.toggle('is-active', ativo);
        b.setAttribute('aria-pressed', String(ativo));
      });
      itens.forEach((item) => {
        const mostra = cat === 'todos' || item.dataset.category === cat;
        item.classList.toggle('is-hidden', !mostra);
        if (mostra) { // reinicia a animação de entrada
          item.style.animation = 'none';
          void item.offsetWidth;
          item.style.animation = '';
        }
      });
      visiveis = itens.filter((i) => !i.classList.contains('is-hidden'));
    });
  });

  /* Monta a foto ampliada (ou o placeholder, se a foto ainda não existir) */
  const renderizar = () => {
    const item = visiveis[atual];
    const figura = $('.photo', item);
    const imgOriginal = $('img', figura);
    const src = imgOriginal.getAttribute('src');
    const rotulo = figura.dataset.label || 'Sua foto aqui';

    midia.innerHTML = '';
    // Reinicia a animação de zoom
    midia.style.animation = 'none';
    void midia.offsetWidth;
    midia.style.animation = '';

    const mostrarPlaceholder = () => {
      midia.innerHTML = '';
      const ph = document.createElement('div');
      ph.className = 'photo is-empty';
      ph.appendChild(criarPlaceholder(src, rotulo));
      midia.appendChild(ph);
    };

    if (figura.classList.contains('is-empty')) {
      mostrarPlaceholder();
    } else {
      const img = new Image();
      img.alt = imgOriginal.alt;
      img.addEventListener('error', mostrarPlaceholder, { once: true });
      img.src = src;
      midia.appendChild(img);
    }

    legenda.textContent = item.dataset.caption || '';
    contador.textContent = `${String(atual + 1).padStart(2, '0')} / ${String(visiveis.length).padStart(2, '0')}`;
  };

  const abrir = (indice) => {
    atual = indice;
    origemFoco = document.activeElement;
    renderizar();
    lightbox.showModal();
    document.body.classList.add('menu-open'); // trava a rolagem do fundo
  };
  const navegar = (passo) => {
    atual = (atual + passo + visiveis.length) % visiveis.length;
    renderizar();
  };

  itens.forEach((item) => {
    item.addEventListener('click', () => abrir(visiveis.indexOf(item)));
  });

  $('.lightbox__close', lightbox).addEventListener('click', () => lightbox.close());
  $('.lightbox__nav--prev', lightbox).addEventListener('click', () => navegar(-1));
  $('.lightbox__nav--next', lightbox).addEventListener('click', () => navegar(1));

  // Fecha ao clicar no fundo escuro
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.close(); });

  // Setas do teclado (o Esc já é tratado nativamente pelo <dialog>)
  lightbox.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') navegar(1);
    if (e.key === 'ArrowLeft') navegar(-1);
  });

  // Gestos de deslizar no celular
  let toqueX = null;
  lightbox.addEventListener('touchstart', (e) => { toqueX = e.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend', (e) => {
    if (toqueX === null) return;
    const dx = e.changedTouches[0].clientX - toqueX;
    if (Math.abs(dx) > 50) navegar(dx < 0 ? 1 : -1);
    toqueX = null;
  });

  lightbox.addEventListener('close', () => {
    document.body.classList.remove('menu-open');
    if (origemFoco) origemFoco.focus({ preventScroll: true });
  });
}

/* ---------------------------------------------------------------------
   12. CARDS DE CURIOSIDADES (vira ao clicar / Enter / Espaço)
   --------------------------------------------------------------------- */
function iniciarFlip() {
  $$('.flip').forEach((card) => {
    card.addEventListener('click', () => {
      const virado = card.classList.toggle('is-flipped');
      card.setAttribute('aria-pressed', String(virado));
    });
  });
}

/* ---------------------------------------------------------------------
   13. COPIAR E-MAIL + TOAST
   --------------------------------------------------------------------- */
let timerToast;
function mostrarToast(mensagem) {
  const toast = $('.toast');
  toast.innerHTML = '';
  toast.append(criarIcone('check'), document.createTextNode(mensagem));
  toast.classList.add('is-visible');
  clearTimeout(timerToast);
  timerToast = setTimeout(() => toast.classList.remove('is-visible'), 2400);
}

function iniciarCopiarEmail() {
  const botao = $('.copy-email');
  if (!botao) return;

  botao.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(PERFIL.email);
    } catch (e) {
      // Plano B para navegadores sem a API de clipboard
      const campo = document.createElement('textarea');
      campo.value = PERFIL.email;
      campo.style.position = 'fixed';
      campo.style.opacity = '0';
      document.body.appendChild(campo);
      campo.select();
      document.execCommand('copy');
      campo.remove();
    }
    mostrarToast('E-mail copiado!');
  });
}

/* ---------------------------------------------------------------------
   14. INICIALIZAÇÃO
   --------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  iniciarLinks();
  iniciarFotos();
  iniciarTema();
  iniciarReveal();
  iniciarRotator();
  iniciarTilt();
  iniciarCodigo();
  iniciarGaleria();
  iniciarFlip();
  iniciarCopiarEmail();

  // Um único listener de scroll, otimizado com requestAnimationFrame
  const atualizarHeader = iniciarNavegacao();
  const atualizarProgresso = iniciarProgresso();
  let agendado = false;
  const aoRolar = () => {
    if (agendado) return;
    agendado = true;
    requestAnimationFrame(() => {
      atualizarHeader();
      atualizarProgresso();
      agendado = false;
    });
  };
  window.addEventListener('scroll', aoRolar, { passive: true });
  window.addEventListener('resize', aoRolar);
  aoRolar();

  // Ano atual no rodapé
  $$('.ano-atual').forEach((el) => { el.textContent = new Date().getFullYear(); });
});
