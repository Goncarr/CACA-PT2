/**
 * Inicializa um logotipo 3D rotativo utilizando Three.js dentro de um elemento HTML.
 * 
 * @param {string} seletor - Seletor CSS do elemento container.
 * @param {string} caminhoImagem - URL ou caminho local da textura inicial.
 * @param {number} larguraPadrao - Largura fallback caso o container não tenha dimensão.
 * @param {number} alturaPadrao - Altura fallback caso o container não tenha dimensão.
 * @returns {Function} Uma função que permite atualizar a textura do logotipo dinamicamente.
 */
function criarLogoRotativo(seletor, caminhoImagem, larguraPadrao, alturaPadrao) {
    const container = document.querySelector(seletor);
    if (!container) return null;

    // --- Configuração Inicial ---
    
    /**
     * Obtém as dimensões atuais do elemento container.
     * @returns {{w: number, h: number}} Objeto com largura e altura.
     */
    const getDimensoes = () => {
        const rect = container.getBoundingClientRect();
        return {
            w: rect.width || larguraPadrao,
            h: rect.height || alturaPadrao
        };
    };

    let { w, h } = getDimensoes();

    // --- Componentes Three.js ---
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(w, h);
    
    // Garantir que o canvas se comporte bem no layout
    Object.assign(renderer.domElement.style, {
        width: '100%',
        height: '100%',
        display: 'block'
    });

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 1.5));

    // --- Gerenciamento de Estado e Objetos ---
    
    let logoMesh = null;
    const textureLoader = new THREE.TextureLoader();

    /**
     * Carrega uma nova imagem e substitui a textura atual do objeto 3D.
     * @param {string} url - Caminho da nova imagem.
     */
    function atualizarTextura(url) {
        textureLoader.load(
            url,
            (texture) => {
                const aspectRatio = texture.image.width / texture.image.height;
                
                // Criamos uma geometria proporcional à imagem original
                const geometry = new THREE.PlaneGeometry(aspectRatio * 1.5, 1.5);
                const material = new THREE.MeshBasicMaterial({
                    map: texture,
                    transparent: true,
                    side: THREE.DoubleSide
                });

                if (logoMesh) scene.remove(logoMesh);
                
                logoMesh = new THREE.Mesh(geometry, material);
                scene.add(logoMesh);
            },
            undefined,
            (err) => console.error(`Erro ao carregar logotipo em ${url}:`, err)
        );
    }

    // --- Responsividade ---
    
    const resizeObserver = new ResizeObserver(() => {
        const { w: newW, h: newH } = getDimensoes();
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
    });
    resizeObserver.observe(container);

    // --- Loop de Animação ---
    
    function renderizar() {
        requestAnimationFrame(renderizar);
        if (logoMesh) {
            logoMesh.rotation.y += 0.015;
        }
        renderer.render(scene, camera);
    }

    // Inicialização
    atualizarTextura(caminhoImagem);
    renderizar();

    return atualizarTextura;
}

// --- Implementação Prática ---

// Inicializa os logos
const setLogoDesktop = criarLogoRotativo(
    '.logotipo', 
    'imagens/logotipos/logotipo.png', 
    334, 128
);

criarLogoRotativo(
    '.logotipo-mobile', 
    'imagens/logotipos/logotipo-mobile.png', 
    60, 70
);

/**
 * Monitora o breakpoint de tablet para trocar a versão do logotipo.
 */
const monitorarBreakpointTablet = () => {
    const tabletMediaQuery = window.matchMedia('(max-width: 1350px)');

    const verificarResolucao = (e) => {
        if (!setLogoDesktop) return;

        const path = e.matches 
            ? 'imagens/logotipos/logotipo_tablet.png' 
            : 'imagens/logotipos/logotipo.png';
            
        setLogoDesktop(path);
    };

    tabletMediaQuery.addEventListener('change', verificarResolucao);
    verificarResolucao(tabletMediaQuery); // Execução inicial
};

monitorarBreakpointTablet();