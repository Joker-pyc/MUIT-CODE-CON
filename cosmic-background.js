import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { EffectComposer } from 'EffectComposer';
import { RenderPass } from 'RenderPass';
import { UnrealBloomPass } from 'UnrealBloomPass';
import { ShaderPass } from 'ShaderPass';
import { FontLoader } from 'FontLoader';
import { TextGeometry } from 'TextGeometry';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00184); // Dark deep blue background

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('webgl-background'), antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 100;
controls.maxDistance = 500;
controls.maxPolarAngle = Math.PI;

camera.position.z = 300;

const starLayers = createParallaxStarLayers();
starLayers.forEach(layer => scene.add(layer));

const nebula = createRealisticNebula();
scene.add(nebula);

const codeTexts = createFloatingCodeTexts();
scene.add(codeTexts);

const galaxySpiral = createGalaxySpiral();
scene.add(galaxySpiral);

const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5,
    0.4,
    0.85
);
bloomPass.threshold = 0;
bloomPass.strength = 1.5;
bloomPass.radius = 0;
composer.addPass(bloomPass);

const customShaderPass = new ShaderPass({
    uniforms: {
        tDiffuse: { value: null },
        time: { value: 0 }
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float time;
        varying vec2 vUv;
        
        void main() {
            vec4 color = texture2D(tDiffuse, vUv);
            color.rgb += 0.05 * vec3(sin(vUv.x * 10.0 + time), sin(vUv.y * 10.0 + time), sin((vUv.x + vUv.y) * 10.0 + time));
            gl_FragColor = color;
        }
    `
});
composer.addPass(customShaderPass);

let time = 0;
let scrollY = 0;
let mouseX = 0;
let mouseY = 0;

function animate() {
    requestAnimationFrame(animate);
    time += 0.001;

    starLayers.forEach((layer, index) => {
        const parallaxFactor = 0.1 * (index + 1);
        layer.position.x = mouseX * parallaxFactor;
        layer.position.y = -mouseY * parallaxFactor;
        layer.rotation.y += 0.0001 * (index + 1);
    });

    nebula.material.uniforms.time.value = time;
    nebula.rotation.y += 0.0001;

    codeTexts.children.forEach((text, index) => {
        text.position.y = Math.sin(time * 2 + index) * 10;
        text.rotation.x = Math.sin(time + index) * 0.2;
        text.rotation.y = Math.cos(time + index) * 0.2;
    });

    galaxySpiral.rotation.y += 0.0001;

    const targetY = scrollY * 0.5;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
    camera.position.z += (300 - mouseY * 0.5 - camera.position.z) * 0.05;

    customShaderPass.uniforms.time.value = time;

    controls.update();
    composer.render();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(event) {
    mouseX = (event.clientX - window.innerWidth / 2) * 0.05;
    mouseY = (event.clientY - window.innerHeight / 2) * 0.05;
}

window.addEventListener('resize', onWindowResize);
window.addEventListener('scroll', () => { scrollY = window.scrollY; });
window.addEventListener('mousemove', onMouseMove);

function createParallaxStarLayers() {
    const layers = [];
    const layerCount = 3;
    for (let i = 0; i < layerCount; i++) {
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        const sizes = [];
        const layerDepth = 500 + i * 500;
        const starCount = 2000 - i * 500;
        for (let j = 0; j < starCount; j++) {
            vertices.push(
                (Math.random() - 0.5) * 2000,
                (Math.random() - 0.5) * 2000,
                (Math.random() - 0.5) * layerDepth
            );
            sizes.push(Math.random() * 2 + 0.5);
        }
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
        const material = new THREE.ShaderMaterial({
            uniforms: {
                color: { value: new THREE.Color(0xffffff) }
            },
            vertexShader: `
                attribute float size;
                varying float vSize;
                void main() {
                    vSize = size;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = size * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                uniform vec3 color;
                varying float vSize;
                void main() {
                    if (length(gl_PointCoord - vec2(0.5)) > 0.5) discard;
                    gl_FragColor = vec4(color, vSize * 0.5);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending
        });
        layers.push(new THREE.Points(geometry, material));
    }
    return layers;
}

function createRealisticNebula() {
    const geometry = new THREE.IcosahedronGeometry(300, 64);
    const material = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 },
            resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
        },
        vertexShader: `
            varying vec3 vPosition;
            void main() {
                vPosition = position;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float time;
            uniform vec2 resolution;
            varying vec3 vPosition;

            float noise(vec3 p) {
                vec3 i = floor(p);
                vec3 f = fract(p);
                f = f * f * (3.0 - 2.0 * f);
                return mix(mix(mix(dot(random3(i + vec3(0, 0, 0)), f - vec3(0, 0, 0)),
                                   dot(random3(i + vec3(1, 0, 0)), f - vec3(1, 0, 0)), f.x),
                               mix(dot(random3(i + vec3(0, 1, 0)), f - vec3(0, 1, 0)),
                                   dot(random3(i + vec3(1, 1, 0)), f - vec3(1, 1, 0)), f.x), f.y),
                           mix(mix(dot(random3(i + vec3(0, 0, 1)), f - vec3(0, 0, 1)),
                                   dot(random3(i + vec3(1, 0, 1)), f - vec3(1, 0, 1)), f.x),
                               mix(dot(random3(i + vec3(0, 1, 1)), f - vec3(0, 1, 1)),
                                   dot(random3(i + vec3(1, 1, 1)), f - vec3(1, 1, 1)), f.x), f.y), f.z);
            }

            vec3 random3(vec3 c) {
                float j = 4096.0*sin(dot(c,vec3(17.0, 59.4, 15.0)));
                vec3 r;
                r.z = fract(512.0*j);
                j *= .125;
                r.x = fract(512.0*j);
                j *= .125;
                r.y = fract(512.0*j);
                return r-0.5;
            }

            void main() {
                vec3 pos = vPosition * 0.1;
                float n = noise(pos + time * 0.1);
                vec3 color1 = vec3(0.5, 0.0, 1.0);
                vec3 color2 = vec3(0.0, 0.5, 1.0);
                vec3 color = mix(color1, color2, n);
                float alpha = smoothstep(0.1, 0.9, n);
                gl_FragColor = vec4(color, alpha * 0.5);
            }
        `,
        transparent: true,
        side: THREE.DoubleSide
    });
    return new THREE.Mesh(geometry, material);
}

function createFloatingCodeTexts() {
    const textGroup = new THREE.Group();
    const loader = new FontLoader();
    const codeSnippets = ['<>', '{}', '[]', '#', '//', '/**/', 'if', 'for', 'while', 'function', 'class', 'const', 'let', 'var', '===', '=>', 'return', 'import', 'export', 'async', 'await'];
    const neonColors = [0xff00ff, 0x00ffff, 0xff3300, 0x33ff00, 0xffff00, 0x0033ff];

    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
        codeSnippets.forEach((snippet, index) => {
            const textGeometry = new TextGeometry(snippet, {
                font: font,
                size: 5 + Math.random() * 10,
                height: 1 + Math.random() * 2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.2 + Math.random() * 0.5,
                bevelSize: 0.1 + Math.random() * 0.3,
                bevelOffset: 0,
                bevelSegments: 5
            });
            const color = neonColors[Math.floor(Math.random() * neonColors.length)];
            const textMaterial = new THREE.MeshPhongMaterial({
                color: color,
                emissive: color,
                emissiveIntensity: 0.5 + Math.random() * 0.5,
                shininess: 100
            });
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);
            textMesh.position.set(
                (Math.random() - 0.5) * 500,
                (Math.random() - 0.5) * 500,
                (Math.random() - 0.5) * 500
            );
            textMesh.rotation.set(
                Math.random() * Math.PI * 2,
                Math.random() * Math.PI * 2,
                Math.random() * Math.PI * 2
            );
            textGroup.add(textMesh);
        });
    });
    return textGroup;
}

function createGalaxySpiral() {
    const particleCount = 50000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const spiralArms = 5;
    const armWidth = 0.5;
    const innerRadius = 50;
    const outerRadius = 300;

    for (let i = 0; i < particleCount; i++) {
        const t = Math.random();
        const angle = t * Math.PI * 2 * spiralArms + Math.random() * armWidth;
        const radius = innerRadius + t * (outerRadius - innerRadius);

        const x = Math.cos(angle) * radius;
        const y = (Math.random() - 0.5) * 20;
        const z = Math.sin(angle) * radius;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        const r = 0.5 + 0.5 * Math.random();
        const g = 0.2 + 0.3 * Math.random();
        const b = 0.7 + 0.3 * Math.random();

        colors[i * 3] = r;
        colors[i * 3 + 1] = g;
        colors[i * 3 + 2] = b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.5,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.8
    });

    return new THREE.Points(geometry, material);
}

animate();
