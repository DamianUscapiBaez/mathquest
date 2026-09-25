/* =====================================================
   MATHQUEST — EL REINO PERDIDO
   game.js  ·  FIXED & FLUID EDITION
===================================================== */

"use strict";


/* =====================================================
   1. ELEMENTOS DEL DOM
===================================================== */

const pantallas = document.querySelectorAll(".pantalla");

const btnComenzar = document.getElementById("btn-comenzar");
const btnLeyenda = document.getElementById("btn-leyenda");
const btnAudio = document.getElementById("btn-audio");

const modalLeyenda = document.getElementById("modal-leyenda");
const cerrarLeyenda = document.getElementById("cerrar-leyenda");

const novaSprite = document.getElementById("nova-sprite");
const textoDialogo = document.getElementById("texto-dialogo");
const btnSiguienteDialogo = document.getElementById("btn-siguiente-dialogo");
const indicadorDialogo = document.getElementById("indicador-dialogo");
const dialogoBox = document.querySelector("#intro .dialogo");

const musicaFondo = document.getElementById("musica-fondo");
const sonidoClick = document.getElementById("sonido-click");
const sonidoCristal = document.getElementById("sonido-cristal");
const sonidoAcierto = document.getElementById("sonido-acierto");
const sonidoError = document.getElementById("sonido-error");

// Mapa
const mundo1 = document.getElementById("mundo-1");
const mundo2 = document.getElementById("mundo-2");
const mundo3 = document.getElementById("mundo-3");
const castillo = document.getElementById("castillo");

const cristalesNumero = document.getElementById("cristales-numero");
const puntosNumero = document.getElementById("puntos-numero");

// Portada de mundo
const mundoPortada = document.getElementById("mundo-portada");
const mpVolver = document.getElementById("mp-volver");
const mpKicker = document.getElementById("mp-kicker");
const mpTitulo = document.getElementById("mp-titulo");
const mpDescripcion = document.getElementById("mp-descripcion");
const mpTema1Icono = document.getElementById("mp-tema-1-icono");
const mpTema1Titulo = document.getElementById("mp-tema-1-titulo");
const mpTema1Desc = document.getElementById("mp-tema-1-desc");
const mpTema2Icono = document.getElementById("mp-tema-2-icono");
const mpTema2Titulo = document.getElementById("mp-tema-2-titulo");
const mpTema2Desc = document.getElementById("mp-tema-2-desc");
const mpCristal = document.getElementById("mp-cristal");
const mpRecompensa = document.getElementById("mp-recompensa-nombre");
const mpEntrar = document.getElementById("mp-entrar");
const mpNovaSprite = document.getElementById("mp-nova-sprite");
const mpNovaFrase = document.getElementById("mp-nova-frase");

// Minijuego
const minijuegoScreen = document.getElementById("minijuego");
const mjSalir = document.getElementById("mj-salir");
const mjMundoIcono = document.getElementById("mj-mundo-icono");
const mjMundoCategoria = document.getElementById("mj-mundo-categoria");
const mjMundoNombre = document.getElementById("mj-mundo-nombre");
const mjVidas = document.getElementById("mj-vidas");
const mjPuntos = document.getElementById("mj-puntos");
const mjProgressFill = document.getElementById("mj-progress-fill");
const mjProgressLabel = document.getElementById("mj-progress-label");
const mjNovaSprite = document.getElementById("mj-nova-sprite");
const mjNovaBurbuja = document.getElementById("mj-nova-burbuja");
const mjPreguntaTag = document.getElementById("mj-pregunta-tag");
const mjPregunta = document.getElementById("mj-pregunta");
const mjRespuestas = document.getElementById("mj-respuestas");
const mjFeedback = document.getElementById("mj-feedback");

// Lección
const mjLeccion = document.getElementById("mj-leccion");
const mjLeccionPregunta = document.getElementById("mj-leccion-pregunta-texto");
const mjLeccionPasos = document.getElementById("mj-leccion-pasos");
const mjLeccionRespuesta = document.getElementById("mj-leccion-respuesta-texto");
const mjLeccionCerrar = document.getElementById("mj-leccion-cerrar");

// Modal Cristal Obtenido
const modalCristal = document.getElementById("modal-cristal");
const mcGema = document.getElementById("mc-gema");
const mcTitulo = document.getElementById("mc-titulo");
const mcNombreCristal = document.getElementById("mc-nombre-cristal");
const mcMensaje = document.getElementById("mc-mensaje");
const mcPuntos = document.getElementById("mc-puntos");
const mcCristales = document.getElementById("mc-cristales");
const mcContinuar = document.getElementById("mc-continuar");

// Victoria
const vPuntos = document.getElementById("v-puntos");
const vAciertos = document.getElementById("v-aciertos");
const btnReiniciar = document.getElementById("btn-reiniciar");

// Cinemática final
const victoriaCinematica = document.getElementById("victoria-cinematica");
const vcTexto = document.getElementById("vc-texto");
const vcContinuar = document.getElementById("vc-continuar");
const vcNovaImg = document.getElementById("vc-nova-img");


/* =====================================================
   2. ESTADO
===================================================== */

const juego = {
    cristales: 0,
    puntos: 0,
    aciertos: 0,
    mundo1: false,
    mundo2: false,
    mundo3: false,
    musicaIniciada: false
};


/* =====================================================
   3. SPRITES DE NOVA + PRECARGA
===================================================== */

const SPRITES_NOVA = {
    normal: "assets/images/nova/nova-normal.png",
    feliz: "assets/images/nova/nova-feliz.png",
    preocupada: "assets/images/nova/nova-preocupada.png",
    molesta: "assets/images/nova/nova-molesta.png",
    pensativa: "assets/images/nova/nova-pensativa.png",
    sorprendida: "assets/images/nova/nova-sorprendida.png",
    portada: "assets/images/nova/nova-portada.png"
};

// Precarga de imágenes (evita parpadeos)
Object.values(SPRITES_NOVA).forEach((src) => {
    const img = new Image();
    img.src = src;
});

// Precarga suave de audio (solo los pequeños efectos)
[sonidoClick, sonidoAcierto, sonidoError, sonidoCristal].forEach((audio) => {
    if (!audio) return;
    try {
        audio.preload = "auto";
        audio.load();
    } catch (e) { }
});


/* =====================================================
   4. DIÁLOGOS DE NOVA (intro)
===================================================== */

const dialogosNova = [
    { texto: "¡Por fin llegaste! Pensé que los cristales jamás encontrarían un nuevo guardián...", expresion: "feliz" },
    { texto: "Soy Nova, guardiana del conocimiento. Algo extraño está consumiendo la energía del Reino de Arithmia.", expresion: "normal" },
    { texto: "Los tres Cristales del Conocimiento han perdido su poder y, sin ellos, el Gran Castillo permanecerá sellado.", expresion: "preocupada" },
    { texto: "Cada región del reino guarda un desafío distinto. No podrás avanzar sin entender las matemáticas que las protegen.", expresion: "normal" },
    { texto: "Tranquilo: si te equivocas, te enseñaré a resolverlo paso a paso. Aprender también es parte de la aventura. ✨", expresion: "feliz" },
    { texto: "El primer destino te espera: el Templo del Equilibrio, donde las ecuaciones lineales e inecuaciones gobiernan.", expresion: "pensativa" },
    { texto: "¿Estás preparado? Nuestro viaje comienza ahora.", expresion: "feliz" }
];

let dialogoActual = 0;
let escribiendo = false;
let textoCompleto = false;
let temporizadorTexto = null;
let ultimoClickDialogo = 0;   // Anti doble-click
let bloqueadoDialogo = false; // Bloqueo durante transición


/* =====================================================
   4.5 FRASES DE LA CINEMÁTICA FINAL
===================================================== */

const FRASES_CINEMATICA = [
    { texto: "¡Lo lograste, guardián! Los tres Cristales del Conocimiento han vuelto a brillar...", sprite: "sorprendida" },
    { texto: "El Templo del Equilibrio, la Ciudad Algebraica y la Torre de las Sombras... ¡todos restaurados!", sprite: "feliz" },
    { texto: "El Gran Castillo ha abierto sus puertas. El Reino de Arithmia te espera.", sprite: "feliz" },
    { texto: "Adelante, guardián. La última puerta está a punto de abrirse... ✨", sprite: "portada" }
];

let vcFraseActual = 0;
let vcEscribiendo = false;
let vcTimerTexto = null;
let vcUltimoClick = 0;


/* =====================================================
   5. BANCO DE MUNDOS — 3 UNIDADES ACADÉMICAS
===================================================== */

const MUNDOS = {
    /* ============================================================
       MUNDO 1 · UNIDAD 2 · EXPRESIONES ALGEBRAICAS
    ============================================================ */
    1: {
        icono: "🏙️",
        categoria: "MUNDO I",
        nombre: "Ciudad Algebraica",
        tema: "Expresiones algebraicas",
        descripcion: "Una metrópolis construida con símbolos y patrones. Sus edificios son polinomios y sus calles, fórmulas que debes dominar para avanzar.",
        temas: [
            { icono: "🧩", titulo: "Productos notables y factorización", desc: "Reconoce patrones al instante" },
            { icono: "📐", titulo: "Exponentes y radicales", desc: "Domina las leyes de la potencia" }
        ],
        cristal: "Cristal del Álgebra",
        fraseNova: "La Ciudad no perdona errores de signo. Respira, revisa cada paso y factoriza con calma.",
        colorVar: {
            accent: "#ff2db5",
            accentSoft: "rgba(255, 45, 181, 0.25)",
            glow: "rgba(255, 45, 181, 0.5)",
            fondo: "url('assets/images/fondos/ciudad.png')"
        },
        preguntas: [
            {
                pregunta: "Simplifica la expresión: 4x² + 3x − 2 + 2x² − 5x + 7",
                opciones: ["6x² − 2x + 5", "6x² + 8x + 5", "6x⁴ − 2x + 5", "2x² − 2x + 9"],
                correcta: 0,
                exito: "¡Correcto! Agrupaste correctamente los términos semejantes.",
                fallo: "Recuerda que solo puedes sumar o restar términos que tengan la misma variable y el mismo exponente.",
                pasos: [
                    "Agrupamos los términos semejantes:",
                    "<strong>4x² + 2x²</strong> = 6x²",
                    "<strong>3x − 5x</strong> = −2x",
                    "<strong>−2 + 7</strong> = 5",
                    "Resultado: <strong>6x² − 2x + 5</strong>"
                ],
                respuestaCorrecta: "6x² − 2x + 5"
            },
            {
                pregunta: "Desarrolla el producto notable: (2x − 3)²",
                opciones: ["4x² − 9", "4x² − 12x + 9", "2x² − 12x + 9", "4x² − 6x + 9"],
                correcta: 1,
                exito: "¡Excelente! Aplicaste correctamente el cuadrado de una diferencia.",
                fallo: "No olvides el término del medio: −2ab.",
                pasos: [
                    "Usamos la fórmula: <strong>(a − b)² = a² − 2ab + b²</strong>",
                    "a = 2x y b = 3",
                    "(2x)² = 4x²",
                    "−2(2x)(3) = −12x",
                    "3² = 9",
                    "Resultado: <strong>4x² − 12x + 9</strong>"
                ],
                respuestaCorrecta: "4x² − 12x + 9"
            },
            {
                pregunta: "Una plaza rectangular de la Ciudad Algebraica tiene un área de x² + 11x + 24 m². ¿Qué expresiones representan sus dimensiones?",
                opciones: ["(x + 4)(x + 6)", "(x + 3)(x + 8)", "(x + 2)(x + 12)", "(x + 5)(x + 5)"],
                correcta: 1,
                exito: "¡Perfecto! 3 × 8 = 24 y 3 + 8 = 11.",
                fallo: "Busca dos números cuyo producto sea 24 y cuya suma sea 11.",
                pasos: [
                    "Factorizamos: <strong>x² + 11x + 24</strong>",
                    "Buscamos dos números que multiplicados den 24.",
                    "También deben sumar 11.",
                    "3 × 8 = 24 ✓",
                    "3 + 8 = 11 ✓",
                    "Resultado: <strong>(x + 3)(x + 8)</strong>"
                ],
                respuestaCorrecta: "(x + 3)(x + 8)"
            },
            {
                pregunta: "Simplifica: (3x²)³",
                opciones: ["9x⁵", "27x⁵", "27x⁶", "9x⁶"],
                correcta: 2,
                exito: "¡Muy bien! Aplicaste correctamente la potencia de un producto.",
                fallo: "Recuerda elevar el coeficiente y multiplicar los exponentes.",
                pasos: [
                    "(3x²)³ = 3³ · (x²)³",
                    "3³ = <strong>27</strong>",
                    "Aplicamos: <strong>(xᵐ)ⁿ = xᵐ·ⁿ</strong>",
                    "(x²)³ = x⁶",
                    "Resultado: <strong>27x⁶</strong>"
                ],
                respuestaCorrecta: "27x⁶"
            },
            {
                pregunta: "Para activar el Cristal del Álgebra debes simplificar √(144x⁸), considerando x ≥ 0. ¿Cuál es el resultado?",
                opciones: ["12x⁴", "12x⁸", "72x⁴", "144x⁴"],
                correcta: 0,
                exito: "¡Excelente! El Cristal del Álgebra ha recuperado su energía. 💎",
                fallo: "Separa la raíz del número y la raíz de la potencia.",
                pasos: [
                    "Separamos: <strong>√(144x⁸) = √144 · √x⁸</strong>",
                    "√144 = 12",
                    "√x⁸ = x⁸/²",
                    "x⁸/² = x⁴",
                    "Resultado: <strong>12x⁴</strong>"
                ],
                respuestaCorrecta: "12x⁴"
            }
        ]
    },

    /* ============================================================
       MUNDO 2 · UNIDAD 3 · ECUACIONES E INECUACIONES
    ============================================================ */
    2: {
        icono: "⚖️",
        categoria: "MUNDO II",
        nombre: "Templo del Equilibrio",
        tema: "Ecuaciones e inecuaciones",
        descripcion: "Un santuario ancestral donde las balanzas nunca mienten. Cada ecuación es un equilibrio que debes restaurar y cada inecuación, un límite que no puedes cruzar.",
        temas: [
            { icono: "⚖️", titulo: "Ecuaciones lineales y cuadráticas", desc: "Encuentra el valor de la incógnita" },
            { icono: "📏", titulo: "Inecuaciones y valor absoluto", desc: "Domina rangos y distancias" }
        ],
        cristal: "Cristal del Equilibrio",
        fraseNova: "En el Templo, todo lo que hagas a un lado de la balanza, hazlo también al otro. Esa es la ley del equilibrio.",
        colorVar: {
            accent: "#00f0ff",
            accentSoft: "rgba(0, 240, 255, 0.25)",
            glow: "rgba(0, 240, 255, 0.5)",
            fondo: "url('assets/images/fondos/templo.png')"
        },
        preguntas: [
            {
                pregunta: "En el Templo, una balanza tiene 2 cofres iguales y 5 monedas de 1 kg en un platillo, y del otro lado hay 13 kg. Si está equilibrada, ¿cuánto pesa cada cofre?",
                opciones: ["3 kg", "4 kg", "5 kg", "6 kg"],
                correcta: 1,
                exito: "¡Correcto! Cada cofre pesa 4 kg.",
                fallo: "Vamos a despejar paso a paso.",
                pasos: [
                    "Planteamos la ecuación: <strong>2x + 5 = 13</strong> (x = peso del cofre)",
                    "Queremos dejar sola la x. Restamos <strong>5</strong> en ambos platillos:",
                    "2x + 5 − 5 = 13 − 5",
                    "2x = 8",
                    "Dividimos entre <strong>2</strong> en ambos lados:",
                    "x = 8 ÷ 2",
                    "Resultado: <strong>cada cofre pesa 4 kg</strong>",
                    "Verificación: 2(4) + 5 = 8 + 5 = 13 ✓"
                ],
                respuestaCorrecta: "4 kg"
            },
            {
                pregunta: "Un altar cuadrado del Templo tiene un área de 16 m². Los sacerdotes necesitan saber cuánto mide cada lado para colocar ofrendas. ¿Cuál es la medida?",
                opciones: ["2 m", "4 m", "8 m", "16 m"],
                correcta: 1,
                exito: "¡Muy bien! Cada lado mide 4 m.",
                fallo: "Recuerda: el área del cuadrado es lado².",
                pasos: [
                    "Planteamos: <strong>x² = 16</strong>",
                    "Para despejar x, aplicamos <strong>raíz cuadrada</strong> en ambos lados:",
                    "x = ±√16",
                    "Matemáticamente: x = 4 o x = −4",
                    "⚠ Pero aquí hablamos de una <strong>longitud</strong>, y no existen lados negativos.",
                    "Descartamos x = −4.",
                    "Resultado: <strong>cada lado mide 4 m</strong>",
                    "💡 Regla clave: cuando el resultado representa una medida real (longitud, área, tiempo), la solución negativa se descarta."
                ],
                respuestaCorrecta: "4 m"
            },
            {
                pregunta: "Una columna mágica del Templo se ubica a una distancia de |x − 3| = 5 metros del centro. ¿En qué posiciones puede estar la columna?",
                opciones: ["x = 8 m", "x = −2 m", "x = 8 m o x = −2 m", "x = 5 m"],
                correcta: 2,
                exito: "¡Excelente! Hay dos posiciones posibles.",
                fallo: "El valor absoluto siempre da dos casos.",
                pasos: [
                    "Una ecuación con <strong>valor absoluto</strong> |A| = b (con b > 0) tiene <strong>dos soluciones</strong>:",
                    "Caso 1: A = b",
                    "Caso 2: A = −b",
                    "Caso 1: x − 3 = 5 → x = 5 + 3 = <strong>8</strong>",
                    "Caso 2: x − 3 = −5 → x = −5 + 3 = <strong>−2</strong>",
                    "Resultado: <strong>x = 8 m o x = −2 m</strong>",
                    "💡 Interpretación física: la columna puede estar 5 m a la derecha del centro (x = 8) o 5 m a la izquierda (x = −2)."
                ],
                respuestaCorrecta: "x = 8 m o x = −2 m"
            },
            {
                pregunta: "Para abrir la puerta sagrada, el peso total debe superar los 11 kg. Se usan 2 lingotes iguales más 3 kg de ofrenda. ¿Qué peso mínimo debe tener cada lingote?",
                opciones: ["x > 4 kg", "x < 4 kg", "x > 7 kg", "x < 7 kg"],
                correcta: 0,
                exito: "¡Perfecto! Cada lingote debe pesar más de 4 kg.",
                fallo: "Recuerda cómo se resuelven las inecuaciones.",
                pasos: [
                    "Planteamos la <strong>inecuación</strong>: 2x + 3 > 11",
                    "Restamos <strong>3</strong> en ambos lados:",
                    "2x > 11 − 3",
                    "2x > 8",
                    "Dividimos entre <strong>2</strong> (positivo, el signo NO cambia):",
                    "x > 8 ÷ 2",
                    "Resultado: <strong>x > 4 kg</strong>",
                    "⚠ Regla: solo se invierte el signo de la inecuación cuando <strong>multiplicas o divides por un negativo</strong>.",
                    "Interpretación: cada lingote debe pesar <strong>más de 4 kg</strong>."
                ],
                respuestaCorrecta: "x > 4 kg"
            },
            {
                pregunta: "Los sacerdotes necesitan mantener la temperatura del Templo dentro de 5 °C del ideal de 20 °C. La condición es |T − 20| ≤ 5. ¿Qué rango de temperaturas es aceptable?",
                opciones: ["15 °C ≤ T ≤ 25 °C", "20 °C ≤ T ≤ 25 °C", "T ≤ 25 °C", "T ≥ 15 °C"],
                correcta: 0,
                exito: "¡Excelente! El rango es de 15 °C a 25 °C.",
                fallo: "Una inecuación con valor absoluto da un intervalo, no un valor único.",
                pasos: [
                    "Una <strong>inecuación con valor absoluto</strong> |A| ≤ b se convierte en un intervalo:",
                    "−b ≤ A ≤ b",
                    "Aplicado a nuestro caso: −5 ≤ T − 20 ≤ 5",
                    "Sumamos <strong>20</strong> a las tres partes para despejar T:",
                    "−5 + 20 ≤ T ≤ 5 + 20",
                    "Resultado: <strong>15 ≤ T ≤ 25</strong>",
                    "💡 Interpretación: la temperatura debe estar entre 15 °C y 25 °C (ambos incluidos).",
                    "⚠ Regla: |A| ≤ b → intervalo cerrado;  |A| ≥ b → dos intervalos hacia afuera."
                ],
                respuestaCorrecta: "15 °C ≤ T ≤ 25 °C"
            }
        ]
    },

    /* ============================================================
       MUNDO 3 · UNIDAD 4 · GEOMETRÍA Y TRIGONOMETRÍA
    ============================================================ */
    3: {
        icono: "📐",
        categoria: "MUNDO III",
        nombre: "Torre de las Sombras",
        tema: "Geometría y trigonometría",
        descripcion: "Una torre milenaria cuyo poder se mide con ángulos y sombras. Aquí aprenderás a calcular áreas, volúmenes y a leer la luz del sol.",
        temas: [
            { icono: "🔺", titulo: "Áreas y volúmenes", desc: "Mide el espacio que ocupan las cosas" },
            { icono: "📐", titulo: "Razones trigonométricas", desc: "Domina los ángulos y las sombras" }
        ],
        cristal: "Cristal de la Luz",
        fraseNova: "En la Torre, cada sombra guarda un ángulo. Aprende a leerlos y la luz te revelará sus secretos.",
        colorVar: {
            accent: "#ff9b2e",
            accentSoft: "rgba(255, 155, 46, 0.25)",
            glow: "rgba(255, 155, 46, 0.5)",
            fondo: "url('assets/images/fondos/bosque.png')"
        },
        preguntas: [
            {
                pregunta: "La base de la Torre tiene forma triangular con 8 m de base y 6 m de altura. Los constructores necesitan saber su área. ¿Cuánto mide?",
                opciones: ["24 m²", "48 m²", "14 m²", "28 m²"],
                correcta: 0,
                exito: "¡Correcto! El área es 24 m².",
                fallo: "Revisa la fórmula del área del triángulo.",
                pasos: [
                    "La fórmula del área de un triángulo es:",
                    "<strong>Área = (base × altura) ÷ 2</strong>",
                    "Sustituimos los valores: base = 8 m, altura = 6 m",
                    "Área = (8 × 6) ÷ 2",
                    "Área = 48 ÷ 2",
                    "Resultado: <strong>24 m²</strong>",
                    "💡 Error común: olvidar dividir entre 2."
                ],
                respuestaCorrecta: "24 m²"
            },
            {
                pregunta: "Un cristal sagrado de la Torre tiene forma de cubo con arista de 4 cm. ¿Cuál es su volumen?",
                opciones: ["12 cm³", "16 cm³", "64 cm³", "48 cm³"],
                correcta: 2,
                exito: "¡Excelente! El volumen es 64 cm³.",
                fallo: "Recuerda: el volumen del cubo es arista al cubo.",
                pasos: [
                    "La fórmula del volumen de un cubo es:",
                    "<strong>V = arista³</strong>",
                    "Sustituimos: arista = 4 cm",
                    "V = 4³",
                    "V = 4 × 4 × 4 = 64",
                    "Resultado: <strong>64 cm³</strong>",
                    "⚠ No confundir con el área: el área del cubo es 6·a², el volumen es a³."
                ],
                respuestaCorrecta: "64 cm³"
            },
            {
                pregunta: "Desde 10 m de la base del árbol sagrado, Nova ve la copa con un ángulo de elevación de 30°. Si tan(30°) ≈ 0.577, ¿cuál es la altura del árbol?",
                opciones: ["5.77 m", "10 m", "17.32 m", "30 m"],
                correcta: 0,
                exito: "¡Perfecto! El árbol mide aproximadamente 5.77 m.",
                fallo: "Recuerda la relación: tan(θ) = cateto opuesto / cateto adyacente.",
                pasos: [
                    "Dibujamos un <strong>triángulo rectángulo</strong>: la base (10 m) es el cateto adyacente, la altura del árbol (h) es el cateto opuesto.",
                    "La <strong>tangente</strong> relaciona ambos catetos:",
                    "tan(θ) = cateto opuesto ÷ cateto adyacente",
                    "tan(30°) = h ÷ 10",
                    "0.577 = h ÷ 10",
                    "Despejamos h: h = 0.577 × 10",
                    "Resultado: <strong>h ≈ 5.77 m</strong>",
                    "💡 Tip: usa <strong>tan</strong> cuando conoces los dos catetos; <strong>sen</strong> cuando tienes hipotenusa y opuesto; <strong>cos</strong> cuando tienes hipotenusa y adyacente."
                ],
                respuestaCorrecta: "5.77 m"
            },
            {
                pregunta: "Un hechizo de la Torre requiere simplificar la expresión sen²θ + cos²θ. Los magos olvidaron el resultado. ¿Cuál es?",
                opciones: ["0", "1", "2", "tan θ"],
                correcta: 1,
                exito: "¡Excelente! Es la identidad pitagórica fundamental.",
                fallo: "Es una de las identidades trigonométricas más famosas.",
                pasos: [
                    "Esta es la <strong>identidad pitagórica fundamental</strong>:",
                    "<strong>sen²θ + cos²θ = 1</strong>",
                    "Esta identidad se cumple para <strong>cualquier ángulo θ</strong>.",
                    "Viene del teorema de Pitágoras aplicado al círculo unitario:",
                    "En un triángulo rectángulo con hipotenusa 1: cateto opuesto = sen θ, cateto adyacente = cos θ",
                    "Pitágoras: sen²θ + cos²θ = 1² = 1",
                    "Resultado: <strong>1</strong>",
                    "💡 De aquí salen otras identidades: 1 + tan²θ = sec²θ,  1 + cot²θ = csc²θ."
                ],
                respuestaCorrecta: "1"
            },
            {
                pregunta: "El Gran Castillo mide 40 m de altura y proyecta una sombra de 40 m. ¿Cuál es el ángulo de elevación del sol?",
                opciones: ["30°", "45°", "60°", "90°"],
                correcta: 1,
                exito: "¡Perfecto! El ángulo es 45°.",
                fallo: "Fíjate: la altura y la sombra miden lo mismo.",
                pasos: [
                    "Planteamos el triángulo rectángulo: altura = 40 m (cateto opuesto), sombra = 40 m (cateto adyacente).",
                    "Usamos la <strong>tangente</strong>:",
                    "tan(θ) = cateto opuesto ÷ cateto adyacente = 40 ÷ 40",
                    "tan(θ) = 1",
                    "¿Qué ángulo tiene tangente = 1?",
                    "tan(45°) = 1",
                    "Resultado: <strong>θ = 45°</strong>",
                    "💡 Tip para recordar: cuando la altura y la sombra son iguales, el ángulo siempre es 45°. Es un triángulo rectángulo isósceles."
                ],
                respuestaCorrecta: "45°"
            }
        ]
    }
};


/* =====================================================
   6. ESTADO DEL MINIJUEGO
===================================================== */

const minijuego = {
    mundoActual: null,
    indice: 0,
    vidas: 3,
    puntosPartida: 0,
    aciertosPartida: 0,
    respondiendo: false,
    callbackLeccion: null,
    activo: false
};


/* =====================================================
   7. UTILIDADES
===================================================== */

function cambiarPantalla(id) {
    // Limpiar timers pendientes antes de cambiar
    clearInterval(temporizadorTexto);
    clearInterval(vcTimerTexto);
    escribiendo = false;
    vcEscribiendo = false;

    pantallas.forEach((p) => p.classList.remove("activa"));
    const nueva = document.getElementById(id);
    if (nueva) nueva.classList.add("activa");
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function reproducirClick() {
    if (!sonidoClick) return;
    try {
        sonidoClick.currentTime = 0;
        sonidoClick.play().catch(() => { });
    } catch (e) { }
}

function reproducirAudio(audio, volumen = 1) {
    if (!audio) return;
    try {
        audio.volume = volumen;
        audio.currentTime = 0;
        audio.play().catch(() => { });
    } catch (e) { }
}

async function iniciarMusica() {
    if (!musicaFondo || juego.musicaIniciada) return;
    musicaFondo.volume = 0.22;
    try {
        await musicaFondo.play();
        juego.musicaIniciada = true;
        actualizarBotonAudio();
    } catch (e) { }
}

function actualizarBotonAudio() {
    if (!btnAudio || !musicaFondo) return;
    btnAudio.innerHTML = musicaFondo.paused ? "🔇 <span>Música</span>" : "🔊 <span>Música</span>";
}

/* Cambiar expresión de Nova con token anti-parpadeo */
const _tokenExpresion = new WeakMap();

function cambiarExpresion(sprite, nombre, ms = 130) {
    if (!sprite) return;
    if (sprite.dataset.expresion === nombre) return;
    const ruta = SPRITES_NOVA[nombre];
    if (!ruta) return;

    // Token único por llamada para evitar carreras
    const token = Symbol("exp");
    _tokenExpresion.set(sprite, token);

    sprite.dataset.expresion = nombre;
    sprite.style.opacity = "0";

    setTimeout(() => {
        // Si ya se pidió otro cambio, abortar
        if (_tokenExpresion.get(sprite) !== token) return;
        sprite.src = ruta;
        sprite.style.opacity = "1";
    }, ms);
}

/* Escribir texto con callback de fin */
function escribirTexto(texto, alTerminar) {
    if (!textoDialogo) return;
    clearInterval(temporizadorTexto);
    textoDialogo.textContent = "";
    escribiendo = true;
    textoCompleto = false;
    let i = 0;
    temporizadorTexto = setInterval(() => {
        textoDialogo.textContent += texto[i];
        i++;
        if (i >= texto.length) {
            clearInterval(temporizadorTexto);
            escribiendo = false;
            textoCompleto = true;
            if (typeof alTerminar === "function") alTerminar();
        }
    }, 20);
}

/* Completar texto actual al instante */
function completarTextoDialogo() {
    if (!escribiendo) return false;
    clearInterval(temporizadorTexto);
    textoDialogo.textContent = dialogosNova[dialogoActual].texto;
    escribiendo = false;
    textoCompleto = true;
    return true;
}

function construirIndicador() {
    if (!indicadorDialogo) return;
    indicadorDialogo.innerHTML = "";
    dialogosNova.forEach((_, i) => {
        const p = document.createElement("span");
        p.className = "punto";
        if (i === dialogoActual) p.classList.add("activo");
        indicadorDialogo.appendChild(p);
    });
}

function actualizarIndicador() {
    if (!indicadorDialogo) return;
    [...indicadorDialogo.children].forEach((p, i) => {
        p.classList.toggle("activo", i === dialogoActual);
        p.classList.toggle("completado", i < dialogoActual);
    });
}

function mostrarDialogo(indice) {
    const d = dialogosNova[indice];
    if (!d) return;
    bloqueadoDialogo = true;
    cambiarExpresion(novaSprite, d.expresion);
    escribirTexto(d.texto, () => {
        bloqueadoDialogo = false;
        // Pequeña pista visual cuando termina
        if (btnSiguienteDialogo) {
            btnSiguienteDialogo.style.animation = "iconPulse 1.6s ease-in-out infinite";
        }
    });
    actualizarIndicador();
    if (btnSiguienteDialogo) btnSiguienteDialogo.style.animation = "none";
}

/* ✅ NUEVA: avanzar diálogo con protección anti-bug */
function avanzarDialogo() {
    const ahora = Date.now();
    // Anti doble-click (150ms)
    if (ahora - ultimoClickDialogo < 150) return;
    ultimoClickDialogo = ahora;

    // 1) Si está escribiendo, completar el texto (no avanzar todavía)
    if (escribiendo) {
        completarTextoDialogo();
        if (btnSiguienteDialogo) {
            btnSiguienteDialogo.style.animation = "iconPulse 1.6s ease-in-out infinite";
        }
        return;
    }

    // 2) El texto está completo → avanzar
    dialogoActual++;
    if (dialogoActual < dialogosNova.length) {
        mostrarDialogo(dialogoActual);
    } else {
        dialogoActual = 0;
        cambiarPantalla("mapa");
        actualizarMapa();
    }
}


/* =====================================================
   8. APLICAR TEMA DE MUNDO
===================================================== */

function aplicarTemaMundo(numero) {
    const config = MUNDOS[numero];
    if (!config) return;

    const c = config.colorVar;
    const root = document.documentElement;

    root.style.setProperty("--mundo-accent", c.accent);
    root.style.setProperty("--mundo-accent-soft", c.accentSoft);
    root.style.setProperty("--mundo-glow", c.glow);

    const mpBg = document.querySelector("#mundo-portada .mp-bg");
    const mjBg = document.querySelector("#minijuego .mj-bg");
    if (mpBg) mpBg.style.backgroundImage = `${c.fondo}, url('assets/images/fondo-portada.png')`;
    if (mjBg) mjBg.style.backgroundImage = `${c.fondo}, url('assets/images/fondo-portada.png')`;
}


/* =====================================================
   9. FLUJO PORTADA DE MUNDO
===================================================== */

function abrirPortadaMundo(numero) {
    const config = MUNDOS[numero];
    if (!config) return;

    minijuego.mundoActual = numero;
    aplicarTemaMundo(numero);

    mpKicker.textContent = `✦ ${config.categoria} ✦`;
    mpTitulo.textContent = config.nombre.toUpperCase();
    mpDescripcion.textContent = config.descripcion;

    mpTema1Icono.textContent = config.temas[0].icono;
    mpTema1Titulo.textContent = config.temas[0].titulo;
    mpTema1Desc.textContent = config.temas[0].desc;

    mpTema2Icono.textContent = config.temas[1].icono;
    mpTema2Titulo.textContent = config.temas[1].titulo;
    mpTema2Desc.textContent = config.temas[1].desc;

    mpRecompensa.textContent = config.cristal;
    mpNovaFrase.textContent = config.fraseNova;

    cambiarExpresion(mpNovaSprite, "normal");

    cambiarPantalla("mundo-portada");
}


/* =====================================================
   10. FLUJO MINIJUEGO
===================================================== */

function iniciarMundo(numero) {
    const config = MUNDOS[numero];
    if (!config) return;

    minijuego.mundoActual = numero;
    minijuego.indice = 0;
    minijuego.vidas = 3;
    minijuego.puntosPartida = 0;
    minijuego.aciertosPartida = 0;
    minijuego.respondiendo = false;
    minijuego.activo = true;

    aplicarTemaMundo(numero);

    mjMundoIcono.textContent = config.icono;
    mjMundoCategoria.textContent = config.categoria;
    mjMundoNombre.textContent = config.nombre;

    mjPuntos.textContent = "0";
    actualizarVidas();

    cambiarPantalla("minijuego");
    cargarPregunta();
}

function actualizarVidas() {
    const corazones = mjVidas.querySelectorAll("span");
    corazones.forEach((c, i) => c.classList.toggle("perdida", i >= minijuego.vidas));
}

function actualizarProgreso() {
    const config = MUNDOS[minijuego.mundoActual];
    if (!config) return;
    const total = config.preguntas.length;
    const porcentaje = (minijuego.indice / total) * 100;

    mjProgressFill.style.width = porcentaje + "%";
    mjProgressLabel.textContent = `Pregunta ${Math.min(minijuego.indice + 1, total)} / ${total}`;
}

function cargarPregunta() {
    const config = MUNDOS[minijuego.mundoActual];
    if (!config) return;
    const q = config.preguntas[minijuego.indice];

    if (!q) return finalizarMundo(true);

    minijuego.respondiendo = false;
    mjFeedback.textContent = "";
    mjFeedback.className = "mj-feedback";

    mjPreguntaTag.textContent = `PREGUNTA ${minijuego.indice + 1}`;
    mjPregunta.textContent = q.pregunta;

    cambiarExpresion(mjNovaSprite, "normal");
    mjNovaBurbuja.textContent = "¿Cuál es tu respuesta?";

    mjRespuestas.innerHTML = "";
    q.opciones.forEach((opcion, i) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "mj-respuesta";
        btn.textContent = opcion;
        btn.addEventListener("click", () => responder(i, btn));
        mjRespuestas.appendChild(btn);
    });

    actualizarProgreso();
}

function responder(indiceElegido, boton) {
    if (minijuego.respondiendo || !minijuego.activo) return;
    minijuego.respondiendo = true;

    const config = MUNDOS[minijuego.mundoActual];
    if (!config) return;
    const q = config.preguntas[minijuego.indice];
    if (!q) return;

    const botones = mjRespuestas.querySelectorAll(".mj-respuesta");
    botones.forEach((b) => (b.disabled = true));

    const esCorrecta = indiceElegido === q.correcta;

    if (esCorrecta) {
        boton.classList.add("correcta");
        mjFeedback.textContent = "✨ " + q.exito;
        mjFeedback.className = "mj-feedback exito";

        const bonus = 100 + minijuego.vidas * 20;
        minijuego.puntosPartida += bonus;
        minijuego.aciertosPartida++;
        juego.puntos += bonus;
        juego.aciertos++;

        mjPuntos.textContent = minijuego.puntosPartida;
        reproducirAudio(sonidoAcierto, 0.6);
        cambiarExpresion(mjNovaSprite, "feliz");
        mjNovaBurbuja.textContent = "¡Genial! Sigamos.";

        setTimeout(() => {
            if (!minijuego.activo) return;
            minijuego.indice++;
            if (minijuego.indice >= config.preguntas.length) finalizarMundo(true);
            else cargarPregunta();
        }, 1300);

    } else {
        boton.classList.add("incorrecta");
        if (botones[q.correcta]) botones[q.correcta].classList.add("correcta");
        mjFeedback.textContent = "✖ " + q.fallo;
        mjFeedback.className = "mj-feedback fallo";

        minijuego.vidas--;
        actualizarVidas();

        reproducirAudio(sonidoError, 0.5);
        cambiarExpresion(mjNovaSprite, "preocupada");
        mjNovaBurbuja.textContent = "¡Vamos a aprender cómo se hace!";

        setTimeout(() => {
            if (!minijuego.activo) return;
            mostrarLeccion(q, () => {
                if (!minijuego.activo) return;
                if (minijuego.vidas <= 0) {
                    finalizarMundo(false);
                } else {
                    minijuego.indice++;
                    if (minijuego.indice >= config.preguntas.length) finalizarMundo(true);
                    else cargarPregunta();
                }
            });
        }, 1100);
    }
}

function mostrarLeccion(pregunta, callback) {
    mjLeccionPregunta.textContent = pregunta.pregunta;

    mjLeccionPasos.innerHTML = "";
    pregunta.pasos.forEach((paso) => {
        const li = document.createElement("li");
        li.innerHTML = paso;
        mjLeccionPasos.appendChild(li);
    });

    mjLeccionRespuesta.textContent = pregunta.respuestaCorrecta;
    minijuego.callbackLeccion = callback;
    mjLeccion.classList.remove("oculto");
}

function cerrarLeccion() {
    mjLeccion.classList.add("oculto");
    const cb = minijuego.callbackLeccion;
    minijuego.callbackLeccion = null;
    if (typeof cb === "function") setTimeout(cb, 260);
}

function finalizarMundo(victoria) {
    const config = MUNDOS[minijuego.mundoActual];
    if (!config) return;

    minijuego.activo = false;

    if (victoria) {
        juego[`mundo${minijuego.mundoActual}`] = true;

        let cristalNuevo = false;
        if (!config.cristalOtorgado) {
            juego.cristales++;
            config.cristalOtorgado = true;
            cristalNuevo = true;
        }

        mjProgressFill.style.width = "100%";
        mjProgressLabel.textContent = "¡Completado!";

        actualizarMapa();

        if (cristalNuevo) {
            setTimeout(() => {
                mostrarModalCristal(config, minijuego.puntosPartida);
            }, 700);
        } else {
            setTimeout(() => cambiarPantalla("mapa"), 1200);
        }

    } else {
        mjFeedback.textContent = "Te has quedado sin vidas. ¡Inténtalo de nuevo!";
        mjFeedback.className = "mj-feedback fallo";
        cambiarExpresion(mjNovaSprite, "molesta");
        mjNovaBurbuja.textContent = "Vuelve cuando estés listo.";
        setTimeout(() => cambiarPantalla("mapa"), 1800);
    }
}


/* =====================================================
   11. MODAL — ¡CRISTAL OBTENIDO!
===================================================== */

let mcAbierto = false;

function mostrarModalCristal(config, puntosPartida) {
    if (mcAbierto) return;
    mcAbierto = true;

    const nombreCristal = config.cristal;

    const mensajes = {
        1: "Los secretos de la Ciudad Algebraica ahora te pertenecen.",
        2: "El poder del Templo del Equilibrio ha sido restaurado.",
        3: "La Torre de las Sombras ha revelado su luz."
    };

    mcNombreCristal.textContent = nombreCristal;
    mcMensaje.textContent = mensajes[minijuego.mundoActual] ||
        `Has restaurado el poder de ${config.nombre}.`;

    mcPuntos.textContent = puntosPartida;
    mcCristales.textContent = juego.cristales;
    mcGema.textContent = "💎";

    const colores = {
        1: "drop-shadow(0 0 20px rgba(255, 45, 181, 1)) drop-shadow(0 0 45px rgba(255, 45, 181, 0.7)) drop-shadow(0 0 80px rgba(255, 143, 220, 0.5))",
        2: "drop-shadow(0 0 20px rgba(0, 240, 255, 1)) drop-shadow(0 0 45px rgba(0, 240, 255, 0.7)) drop-shadow(0 0 80px rgba(125, 255, 255, 0.5))",
        3: "drop-shadow(0 0 20px rgba(255, 155, 46, 1)) drop-shadow(0 0 45px rgba(255, 155, 46, 0.7)) drop-shadow(0 0 80px rgba(255, 213, 128, 0.5))"
    };
    const color = colores[minijuego.mundoActual];
    mcGema.style.filter = color || "";

    modalCristal.classList.remove("oculto");
    reproducirAudio(sonidoCristal, 0.8);
}

function cerrarModalCristal() {
    if (!mcAbierto) return;
    modalCristal.classList.add("oculto");
    mcGema.style.filter = "";
    mcAbierto = false;

    setTimeout(() => {
        cambiarPantalla("mapa");
    }, 280);
}


/* =====================================================
   12. ACTUALIZAR MAPA
===================================================== */

function actualizarMapa() {
    cristalesNumero.textContent = juego.cristales;
    if (puntosNumero) puntosNumero.textContent = juego.puntos;

    if (juego.mundo1) {
        mundo1.classList.remove("disponible");
        mundo1.classList.add("completado");
        mundo1.querySelector(".nodo-estado").textContent = "✓ COMPLETADO";

        mundo2.disabled = false;
        mundo2.classList.remove("bloqueado");
        mundo2.classList.add("disponible");
        mundo2.querySelector(".nodo-estado").textContent = "DISPONIBLE";
    }

    if (juego.mundo2) {
        mundo2.classList.remove("disponible");
        mundo2.classList.add("completado");
        mundo2.querySelector(".nodo-estado").textContent = "✓ COMPLETADO";

        mundo3.disabled = false;
        mundo3.classList.remove("bloqueado");
        mundo3.classList.add("disponible");
        mundo3.querySelector(".nodo-estado").textContent = "DISPONIBLE";
    }

    if (juego.mundo3) {
        mundo3.classList.remove("disponible");
        mundo3.classList.add("completado");
        mundo3.querySelector(".nodo-estado").textContent = "✓ COMPLETADO";
    }

    if (juego.cristales >= 3) {
        castillo.disabled = false;
        castillo.classList.remove("bloqueado");
        castillo.classList.add("disponible");
        castillo.querySelector(".nodo-estado").textContent = "¡ENTRAR!";
    }
}


/* =====================================================
   13. CINEMÁTICA FINAL — NOVA Y LOS 3 CRISTALES
===================================================== */

function abrirCinematicaVictoria() {
    vcFraseActual = 0;
    vcEscribiendo = false;
    vcUltimoClick = 0;
    victoriaCinematica.classList.remove("oculto");

    void victoriaCinematica.offsetWidth;
    victoriaCinematica.classList.add("activa");

    reproducirAudio(sonidoCristal, 0.9);

    if (vcNovaImg) vcNovaImg.src = SPRITES_NOVA.sorprendida;

    setTimeout(() => {
        mostrarFraseCinematica(0);
    }, 850);
}

function mostrarFraseCinematica(indice) {
    const frase = FRASES_CINEMATICA[indice];
    if (!frase) return;

    if (vcNovaImg) {
        vcNovaImg.style.opacity = "0";
        setTimeout(() => {
            vcNovaImg.src = SPRITES_NOVA[frase.sprite];
            vcNovaImg.style.opacity = "1";
        }, 170);
    }

    clearInterval(vcTimerTexto);
    vcTexto.textContent = "";
    vcEscribiendo = true;
    let i = 0;
    vcTimerTexto = setInterval(() => {
        vcTexto.textContent += frase.texto[i];
        i++;
        if (i >= frase.texto.length) {
            clearInterval(vcTimerTexto);
            vcEscribiendo = false;
        }
    }, 24);
}

function avanzarCinematica() {
    const ahora = Date.now();
    if (ahora - vcUltimoClick < 150) return;
    vcUltimoClick = ahora;

    if (vcEscribiendo) {
        clearInterval(vcTimerTexto);
        vcTexto.textContent = FRASES_CINEMATICA[vcFraseActual].texto;
        vcEscribiendo = false;
        return;
    }

    vcFraseActual++;
    if (vcFraseActual < FRASES_CINEMATICA.length) {
        mostrarFraseCinematica(vcFraseActual);
    } else {
        cerrarCinematicaYVictoria();
    }
}

function cerrarCinematicaYVictoria() {
    clearInterval(vcTimerTexto);
    vcEscribiendo = false;
    victoriaCinematica.classList.remove("activa");
    setTimeout(() => {
        victoriaCinematica.classList.add("oculto");
        vPuntos.textContent = juego.puntos;
        vAciertos.textContent = juego.aciertos;
        cambiarPantalla("victoria");
    }, 450);
}


/* =====================================================
   14. EVENTOS
===================================================== */

// Portada
btnComenzar.addEventListener("click", () => {
    reproducirClick();
    iniciarMusica();
    dialogoActual = 0;
    textoCompleto = false;
    escribiendo = false;
    ultimoClickDialogo = 0;
    construirIndicador();
    cambiarPantalla("intro");
    mostrarDialogo(dialogoActual);
});

btnLeyenda.addEventListener("click", () => {
    reproducirClick();
    iniciarMusica();
    modalLeyenda.classList.remove("oculto");
});

btnAudio.addEventListener("click", async () => {
    reproducirClick();
    if (!musicaFondo) return;
    if (musicaFondo.paused) {
        musicaFondo.volume = 0.22;
        try { await musicaFondo.play(); juego.musicaIniciada = true; } catch (e) { }
    } else {
        musicaFondo.pause();
    }
    actualizarBotonAudio();
});

// Modal Leyenda
cerrarLeyenda.addEventListener("click", () => {
    reproducirClick();
    modalLeyenda.classList.add("oculto");
});

modalLeyenda.addEventListener("click", (e) => {
    if (e.target === modalLeyenda) modalLeyenda.classList.add("oculto");
});

// Escape global
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        modalLeyenda.classList.add("oculto");
        if (!mjLeccion.classList.contains("oculto")) cerrarLeccion();
        if (!modalCristal.classList.contains("oculto")) cerrarModalCristal();
        if (victoriaCinematica && !victoriaCinematica.classList.contains("oculto")) {
            cerrarCinematicaYVictoria();
        }
    }
    // Espacio / Enter para avanzar diálogo
    if ((e.key === " " || e.key === "Enter") && document.getElementById("intro").classList.contains("activa")) {
        e.preventDefault();
        avanzarDialogo();
    }
});

// Diálogo — usar pointerdown para respuesta más rápida
if (btnSiguienteDialogo) {
    btnSiguienteDialogo.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        reproducirClick();
        avanzarDialogo();
    });
}

// Caja de diálogo también clickable (fluid)
if (dialogoBox) {
    dialogoBox.addEventListener("pointerdown", (e) => {
        // Si el click fue en el botón, lo maneja el otro handler
        if (e.target.closest("#btn-siguiente-dialogo")) return;
        e.preventDefault();
        reproducirClick();
        avanzarDialogo();
    });
}

// Mapa
mundo1.addEventListener("click", () => {
    reproducirClick();
    if (!juego.mundo1) abrirPortadaMundo(1);
});

mundo2.addEventListener("click", () => {
    reproducirClick();
    if (!juego.mundo2 && juego.mundo1) abrirPortadaMundo(2);
});

mundo3.addEventListener("click", () => {
    reproducirClick();
    if (!juego.mundo3 && juego.mundo2) abrirPortadaMundo(3);
});

castillo.addEventListener("click", () => {
    reproducirClick();
    if (juego.cristales >= 3) {
        abrirCinematicaVictoria();
    }
});

// Portada de mundo
mpVolver.addEventListener("click", () => {
    reproducirClick();
    cambiarPantalla("mapa");
});

mpEntrar.addEventListener("click", () => {
    reproducirClick();
    iniciarMundo(minijuego.mundoActual);
});

// Minijuego — salir sin confirm() bloqueante
mjSalir.addEventListener("click", () => {
    reproducirClick();
    minijuego.activo = false;
    cambiarPantalla("mapa");
});

mjLeccionCerrar.addEventListener("click", () => {
    reproducirClick();
    cerrarLeccion();
});

// Modal Cristal Obtenido
mcContinuar.addEventListener("click", () => {
    reproducirClick();
    cerrarModalCristal();
});

// Cinemática final
if (vcContinuar) {
    vcContinuar.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        e.stopPropagation();
        reproducirClick();
        if (vcFraseActual >= FRASES_CINEMATICA.length - 1 && !vcEscribiendo) {
            cerrarCinematicaYVictoria();
        } else {
            avanzarCinematica();
        }
    });
}

if (victoriaCinematica) {
    victoriaCinematica.addEventListener("pointerdown", (e) => {
        if (e.target.closest("#vc-continuar")) return;
        e.preventDefault();
        avanzarCinematica();
    });
}


/* =====================================================
   15. REINICIAR
===================================================== */

btnReiniciar.addEventListener("click", () => {
    reproducirClick();

    // Resetear estado
    juego.cristales = 0;
    juego.puntos = 0;
    juego.aciertos = 0;
    juego.mundo1 = false;
    juego.mundo2 = false;
    juego.mundo3 = false;

    // Resetear diálogos
    dialogoActual = 0;
    escribiendo = false;
    textoCompleto = false;
    bloqueadoDialogo = false;
    ultimoClickDialogo = 0;
    clearInterval(temporizadorTexto);

    // Resetear cinemática
    clearInterval(vcTimerTexto);
    vcFraseActual = 0;
    vcEscribiendo = false;
    vcUltimoClick = 0;

    // Resetear minijuego
    minijuego.activo = false;
    minijuego.respondiendo = false;
    minijuego.callbackLeccion = null;

    // Resetear mapa
    [mundo1, mundo2, mundo3].forEach((el) => el.classList.remove("completado", "disponible"));
    mundo1.classList.add("disponible");

    mundo2.classList.add("bloqueado");
    mundo2.disabled = true;
    mundo3.classList.add("bloqueado");
    mundo3.disabled = true;

    mundo2.querySelector(".nodo-estado").textContent = "🔒 BLOQUEADO";
    mundo3.querySelector(".nodo-estado").textContent = "🔒 BLOQUEADO";

    castillo.classList.remove("disponible");
    castillo.classList.add("bloqueado");
    castillo.disabled = true;
    castillo.querySelector(".nodo-estado").textContent = "🔒 3 cristales necesarios";

    Object.values(MUNDOS).forEach((m) => delete m.cristalOtorgado);

    // Cerrar overlays
    modalCristal.classList.add("oculto");
    modalLeyenda.classList.add("oculto");
    mjLeccion.classList.add("oculto");
    victoriaCinematica.classList.add("oculto");
    victoriaCinematica.classList.remove("activa");
    mcAbierto = false;

    actualizarMapa();
    cambiarPantalla("portada");
});


/* =====================================================
   16. PARALAJE DE PORTADA
===================================================== */

(function activarParallaxPortada() {
    const portadaEl = document.getElementById("portada");
    const novaWrap = document.getElementById("portada-nova-parallax");
    if (!portadaEl || !novaWrap) return;
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let animating = false;

    function loop() {
        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;

        novaWrap.style.transform = `translate3d(${currentX * 18}px, ${currentY * 14}px, 0)`;

        const bgEl = portadaEl.querySelector(".portada-bg");
        if (bgEl) bgEl.style.transform = `scale(1.08) translate3d(${currentX * -10}px, ${currentY * -8}px, 0)`;

        if (Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001) {
            requestAnimationFrame(loop);
        } else {
            animating = false;
        }
    }

    portadaEl.addEventListener("mousemove", (e) => {
        const rect = portadaEl.getBoundingClientRect();
        targetX = (e.clientX - rect.left) / rect.width - 0.5;
        targetY = (e.clientY - rect.top) / rect.height - 0.5;
        if (!animating) { animating = true; requestAnimationFrame(loop); }
    });
    
    portadaEl.addEventListener("mouseleave", () => {
        targetX = 0; targetY = 0;
        if (!animating) { animating = true; requestAnimationFrame(loop); }
    });
})();


/* =====================================================
   17. INICIALIZACIÓN
===================================================== */

cambiarPantalla("portada");
actualizarBotonAudio();
actualizarMapa();