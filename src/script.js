import './style.css'
import "./smallStyle.css"
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { gsap } from 'gsap'
import { DoubleSide } from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

// Media Query
const smallScreen = window.matchMedia('(max-width: 600px)')
window.addEventListener("contextmenu", function(e) {e.stopPropagation();e.preventDefault();}, true)

// HTML Elements
let controlDiv = document.getElementById("controls")
let welcomeDiv = document.getElementById("welcome")
let enterDiv = document.getElementById("enter")
let juleDiv = document.getElementById("jules")
let speakerDiv = document.getElementById("speaker")

let welcomeSubDiv = document.createElement("div")
welcomeSubDiv.classList.add("welcome")
let tag = document.createElement("h2")
let text = document.createTextNode("Welcome, Space Explorer")
let subTag = document.createElement("p")
let subText = document.createTextNode("Click anywhere on the screen to start your adventure")
tag.appendChild(text)
welcomeSubDiv.appendChild(tag)
subTag.appendChild(subText)
welcomeSubDiv.appendChild(subTag)
if (smallScreen.matches) {
    let mobileTag = document.createElement("p")
    let mobileBreak = document.createElement("br")
    let mobileText = document.createTextNode("--- Mobile Version ---")
    mobileTag.appendChild(mobileBreak)
    mobileTag.appendChild(mobileText)
    welcomeSubDiv.appendChild(mobileTag)
}
welcomeDiv.appendChild(welcomeSubDiv)

const startEverything = () => {
    welcomeTick()
    welcomeSubDiv.classList.add("hidden")
    document.removeEventListener("click", startEverything)
}
const removeWelcomeDiv = () => {
    welcomeDiv.removeChild(welcomeSubDiv)
}

const addStartInfo = () => {

    var startImageDiv = document.createElement("div")
    startImageDiv.classList.add("startImageDiv")
    var startImage = document.createElement("img")

    if (smallScreen.matches) {
        startImage.src = "images/mobile_start.png"
        startImage.setAttribute("style", "width:50vw;")
        startImageDiv.appendChild(startImage)
        controlDiv.appendChild(startImageDiv)
      }
    else {
        startImage.src = "images/start.png"
        startImageDiv.appendChild(startImage)
        controlDiv.appendChild(startImageDiv)
    }
}
const hideStartInfo = () => {
    controlDiv.classList.add("hidden")
}
const removeStartInfo = () => {
    controlDiv.innerHTML = ""
}
const addFlightInfo = () => {

    controlDiv.classList.remove("hidden")
    

    if (smallScreen.matches) {
        // GPS Options

        const pointToCv = () => { cvGps = 1, gitHubGps = 0, linkedinGps = 0 }
        const pointToGitHub = () => { cvGps = 0, gitHubGps = 1, linkedinGps = 0 }
        const pointToLinkedin = () => { cvGps = 0, gitHubGps = 0, linkedinGps = 1 }

        var controlGpsDiv = document.createElement("div")
        controlGpsDiv.setAttribute("id", "controlGpsDiv")
        var gitHubGpsImage = document.createElement("img")
        gitHubGpsImage.src = "images/gitHubGps.png"
        var linkedinGpsImage = document.createElement("img")
        linkedinGpsImage.src = "images/linkedinGps.png"
        var cvGpsImage = document.createElement("img")
        cvGpsImage.src = "images/cvGps.png"

        gitHubGpsImage.addEventListener("click", pointToGitHub)
        cvGpsImage.addEventListener("click", pointToCv)
        linkedinGpsImage.addEventListener("click", pointToLinkedin)

        controlGpsDiv.appendChild(gitHubGpsImage)
        controlGpsDiv.appendChild(linkedinGpsImage)
        controlGpsDiv.appendChild(cvGpsImage)

        controlDiv.appendChild(controlGpsDiv)

        // Left Right buttons
        var controlLeftRightDiv = document.createElement("div")
        controlLeftRightDiv.classList.add("controlLeftRightDiv")
        var leftImage = document.createElement("img")
        leftImage.src = "images/left.png"
        var rightImage = document.createElement("img")
        rightImage.src = "images/right.png"

        const makeLeftTrue = (e) => { 
            e.preventDefault(),
            move_left = 1
        }
        const makeLeftFalse = (e) => {
            e.preventDefault(),
            move_left = 0
        }
        const makeRightTrue = (e) => {
            e.preventDefault(),
            move_right = 1
        }
        const makeRightFalse = (e) => {
            e.preventDefault(),
            move_right = 0
        }

        leftImage.addEventListener("touchstart", makeLeftTrue)
        leftImage.addEventListener("touchend", makeLeftFalse)
        rightImage.addEventListener("touchstart", makeRightTrue)
        rightImage.addEventListener("touchend", makeRightFalse)

        controlLeftRightDiv.appendChild(leftImage)
        controlLeftRightDiv.appendChild(rightImage)

        controlDiv.appendChild(controlLeftRightDiv)

        // Honking Button
        var controlHonkDiv = document.createElement("div")
        controlHonkDiv.classList.add("controlHonkDiv")
        var honkingImage = document.createElement("img")
        honkingImage.src = "images/honk_key.png"

        const handleHonk = () => {
            return  soundOn ? honkSound.play() : "" ,
            console.log(honkSound),
            isHonking = 1,
            honkingClock.start()
        }

        honkingImage.addEventListener("click", handleHonk)

        controlHonkDiv.appendChild(honkingImage)
        controlDiv.appendChild(controlHonkDiv)

    }

    else {
        var controlImageDiv = document.createElement("div")
        controlImageDiv.classList.add("controlImageDiv")
        var controlImage = document.createElement("img")
        controlImage.src = "images/controls.png"
        controlImageDiv.appendChild(controlImage)
        var honkingImage = document.createElement("img")
        honkingImage.src = "images/honk_key.png"
        honkingImage.id = "honking"
        controlImageDiv.appendChild(honkingImage)
        controlDiv.appendChild(controlImageDiv)
    }
}

// Enter Button Symbol

var enterButtonDiv = document.createElement("div")
enterButtonDiv.classList.add("enterButtonDiv")
enterButtonDiv.classList.add("hidden")
var enterButtonImage = document.createElement("img")
if (smallScreen.matches) {
    enterButtonImage.src = "images/tap_anywhere.png"
}
else {
    enterButtonImage.src = "images/enter.png"
}

enterButtonDiv.appendChild(enterButtonImage)
enterDiv.appendChild(enterButtonDiv)

var enterIsVisible = 0

const showEnterButton = () => {
    if (!enterIsVisible) {
        enterButtonDiv.classList.remove("hidden")
        enterIsVisible = 1
    }
}

const hideEnterButton = () => {
    if (enterIsVisible) {
        enterButtonDiv.classList.add("hidden")
        enterIsVisible = 0
    }
}

// jules verne
var juleMessageDiv = document.createElement("div")
juleMessageDiv.classList.add("juleDiv")
juleMessageDiv.classList.add("hidden")
var juleImage = document.createElement("img")
juleImage.src = "images/jules.png"
juleMessageDiv.appendChild(juleImage)
juleDiv.appendChild(juleMessageDiv)

var juleIsVisible = 0

const showJules = () => {
    if (!juleIsVisible) {
        juleMessageDiv.classList.remove("hidden")
        juleIsVisible = 1
    }
}

const hideJules = () => {
    if (juleIsVisible) {
        juleMessageDiv.classList.add("hidden")
        juleIsVisible = 0
    }
}

// sound on / off
let soundOn = true

var speakerImage = document.createElement("img")
speakerImage.src = "images/yes_sound.png"


const toggleSound = () => {
    if (soundOn) {speakerImage.src = "images/no_sound.png"}
    else {speakerImage.src = "images/yes_sound.png"}
    speakerDiv.appendChild(speakerImage)
    soundOn ? soundOn = false : soundOn = true
}

speakerImage.addEventListener("click", toggleSound)
speakerDiv.appendChild(speakerImage)

// clocks
const welcomeClock = new THREE.Clock()
const startClock = new THREE.Clock()
const honkingClock = new THREE.Clock()

// Loaders
const textureLoader = new THREE.TextureLoader()
const gltfLoader = new GLTFLoader()

// Textures
const moonTexture = textureLoader.load("images/moon.png")
const jupiterTexture = textureLoader.load("images/jupiter.png")
const earthTexture = textureLoader.load("images/earth_4.png")
const earthHeightTexture = textureLoader.load("images/earth_height_2.png")
const starTexture = textureLoader.load("images/star_01.png")
earthTexture.generateMipmaps = false
earthTexture.maxFilter = false
moonTexture.generateMipmaps = false
moonTexture.maxFilter = false
jupiterTexture.generateMipmaps = false
jupiterTexture.maxFilter = false
earthHeightTexture.generateMipmaps = false
earthHeightTexture.maxFilter = false
starTexture.generateMipmaps = false
starTexture.maxFilter = false

// Debug
const debugObject = {}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Models / Rocket / Duck -------------------------------------------------------

const rocketGroup = new THREE.Group()
const arrowGroup = new THREE.Group()
const duckGroup = new THREE.Group()

gltfLoader.load(
    '/models/rocket_2.glb',
    (gltf) =>
    {
        gltf.scene.scale.set(1.5, 1.5, 1.5)
        gltf.scene.position.set(0, -5.2, 0)
        gltf.scene.rotation.y = Math.PI * 1.5
        rocketGroup.add(gltf.scene)
        renderer.render(scene, camera)
    }
)

gltfLoader.load(
    '/models/arrow_2.glb',
    (arrow) =>
    {
        arrow.scene.scale.set(0.7, 0.7, 0.7)
        arrow.scene.position.set(0, 0, 0)
        arrow.scene.rotation.x = Math.PI * 0.5
        arrowGroup.add(arrow.scene)
        arrowGroup.up.set(0, -1, 0)
        renderer.render(scene, camera)
    }
)
arrowGroup.position.y = 46.5
arrowGroup.visible = false
scene.add(arrowGroup)

gltfLoader.load(
    '/models/duck/Duck.gltf',
    (duck) =>
    {

        duckGroup.add(duck.scene.children[0])
        renderer.render(scene, camera)
    }
)
duckGroup.position.y = 250
duckGroup.position.z = 100
duckGroup.position.x = 10
duckGroup.scale.set(8,8,8)
duckGroup.rotation.y = Math.PI
scene.add(duckGroup)

// End of Models -------------------------------------------------

// Objects =================================================================================
// Earth ------------------------------------------------------------

const earth = new THREE.Mesh(
    new THREE.SphereGeometry(30, 50, 50),
    new THREE.MeshStandardMaterial({
        map: earthTexture,
        roughness: 1,
        metalness: 0.8,
        displacementMap: earthHeightTexture,
        displacementScale: 3.5
    })
)
earth.rotation.y = 2
scene.add(earth)

// GitHub #############################################

const gitHubTexture = textureLoader.load("images/gitHub_image.png")
gitHubTexture.generateMipmaps = false

const gitHubBorderColor = "white"

var material = [
    new THREE.MeshBasicMaterial({
        map: gitHubTexture
    }),
    new THREE.MeshBasicMaterial({
        map: gitHubTexture
    }),
    new THREE.MeshBasicMaterial({
        color: gitHubBorderColor
    }),
    new THREE.MeshBasicMaterial({
        color: gitHubBorderColor
    }),
    new THREE.MeshBasicMaterial({
        color: gitHubBorderColor
    }),
    new THREE.MeshBasicMaterial({
        color: gitHubBorderColor
    }),
];

const gitHubWidth = 20

const gitHub = new THREE.Mesh(
    new RoundedBoxGeometry(gitHubWidth / 10, gitHubWidth * 0.337, gitHubWidth, 10, 0.2),
    material
)

gitHub.position.y = 200
gitHub.position.z = 200
gitHub.position.x = 6
scene.add(gitHub)

// GitHub End ###################################################

// CV ###########################################################

const cvTexture = textureLoader.load("images/cv_image.png")
cvTexture.generateMipmaps = false

const cvBorderColor = "white"

var material = [
    new THREE.MeshBasicMaterial({
        map: cvTexture
    }),
    new THREE.MeshBasicMaterial({
        map: cvTexture
    }),
    new THREE.MeshBasicMaterial({
        color: cvBorderColor
    }),
    new THREE.MeshBasicMaterial({
        color: cvBorderColor
    }),
    new THREE.MeshBasicMaterial({
        color: cvBorderColor
    }),
    new THREE.MeshBasicMaterial({
        color: cvBorderColor
    }),
];

const cvHeight = 20

const cv = new THREE.Mesh(
    new THREE.BoxGeometry(cvHeight / 15, cvHeight, cvHeight / 1.412),
    material
)
cv.position.y = 280
cv.position.z = -50
cv.position.x = 5.5
scene.add(cv)

// CV End #######################################################

// Linkedin ###########################################################

const linkedinTexture = textureLoader.load("images/linkedin.png")
linkedinTexture.generateMipmaps = false

const linkedinBorderColor = "#2a7eb8"

var material = [
    new THREE.MeshBasicMaterial({
        map: linkedinTexture
    }),
    new THREE.MeshBasicMaterial({
        map: linkedinTexture
    }),
    new THREE.MeshBasicMaterial({
        color: linkedinBorderColor
    }),
    new THREE.MeshBasicMaterial({
        color: linkedinBorderColor
    }),
    new THREE.MeshBasicMaterial({
        color: linkedinBorderColor
    }),
    new THREE.MeshBasicMaterial({
        color: linkedinBorderColor
    }),
];

const linkedinWidth = 15

const linkedin = new THREE.Mesh(
    new RoundedBoxGeometry(linkedinWidth / 10, linkedinWidth, linkedinWidth, 10, 0.2),
    material
)
linkedin.position.y = -90
linkedin.position.z = -20
linkedin.position.x = 5.5
scene.add(linkedin)


// Linkedin End #######################################################

// Arrow look positions
const flatCvPosition = cv.position.clone()
flatCvPosition.x = 0
const flatGitHubPosition = gitHub.position.clone()
flatGitHubPosition.x = 0
const flatLinkedinPosition = linkedin.position.clone()
flatLinkedinPosition.x = 0


// Planets -----------------------------------------------------------

// All the planets ---------------------------------------------------

const position = new THREE.Vector3();
const rotation = new THREE.Euler();
const quaternion = new THREE.Quaternion();
const scale = new THREE.Vector3();

const randomizeMatrix = ( matrix ) => {

    let numberX = Math.floor(((Math.random() * 70) + 10))
    let numberY = Math.floor(((Math.random() * 500) + 35))
    let numberZ = Math.floor(((Math.random() * 500) + 35))

    numberX % 2? numberX *= -1 : numberX
    numberY % 2? numberY *= -1 : numberY
    numberZ % 2? numberZ *= -1 : numberZ

    position.x = numberX
    position.y = numberY
    position.z = numberZ

    rotation.x = Math.random() * 2 * Math.PI;
    rotation.y = Math.random() * 2 * Math.PI;
    rotation.z = Math.random() * 2 * Math.PI;

    quaternion.setFromEuler( rotation );

    scale.x = scale.y = scale.z = 1

    matrix.compose( position, quaternion, scale );
};

// End of stuff concerning all planets -------------------------------------

// Planet 1 **********************************

const planetOneCount = 200

const planetOneGeometry = new THREE.SphereGeometry(6, 32, 32)
const planetOneRingGeometry = new THREE.RingGeometry(8, 10, 30, 1)
    const planetOneMaterial = new THREE.MeshToonMaterial({
})
const planetOneRingMaterial = new THREE.MeshBasicMaterial({
    side: DoubleSide,
})
const matrixOne = new THREE.Matrix4();
const planetOneMesh = new THREE.InstancedMesh( planetOneGeometry, planetOneMaterial, planetOneCount );
const planetOneRingMesh = new THREE.InstancedMesh( planetOneRingGeometry, planetOneRingMaterial, planetOneCount)

for ( let i = 0; i < planetOneCount; i ++ ) {

    // different colors. Will be distributed evenly amongst instances
    const colors = ["DarkOrchid", "rgb(255, 30, 0)", "Gold", "DodgerBlue"]
    const ringColors = ["Pink", "LightGreen", "IndianRed"]
    randomizeMatrix( matrixOne );
    planetOneMesh.setMatrixAt( i, matrixOne );
    planetOneMesh.setColorAt(i, new THREE.Color(colors[Math.round(i % 4)]))
    planetOneRingMesh.setMatrixAt( i, matrixOne )
    planetOneRingMesh.setColorAt(i, new THREE.Color(ringColors[Math.round(i % 3)]))
}

scene.add( planetOneMesh, planetOneRingMesh )

// Planet 2 **********************************

const planetTwoCount = 100

const planetTwoGeometry = new THREE.SphereGeometry(4, 32, 32)
const planetTwoMaterial = new THREE.MeshBasicMaterial({
    map: moonTexture,
})

const matrixTwo = new THREE.Matrix4();
const planetTwoMesh = new THREE.InstancedMesh( planetTwoGeometry, planetTwoMaterial, planetTwoCount );

for ( let j = 0; j < planetTwoCount; j ++ ) {

    // different colors. Will be distributed evenly amongst instances
    const colors = ["Maroon", "DarkCyan", "coral"]
    randomizeMatrix( matrixTwo );
    planetTwoMesh.setMatrixAt( j, matrixTwo );
    // setting the colors
    planetTwoMesh.setColorAt(j, new THREE.Color(colors[Math.round(j % 3)]))
}
// neccesary to update the new colors

scene.add( planetTwoMesh )

// Planet 3 **********************************

const planetThreeCount = 100

const planetThreeGeometry = new THREE.SphereGeometry(8, 32, 32)
const planetThreeMaterial = new THREE.MeshBasicMaterial({
    map: jupiterTexture,
})

const matrixThree = new THREE.Matrix4();
const planetThreeMesh = new THREE.InstancedMesh( planetThreeGeometry, planetThreeMaterial, planetThreeCount );

for ( let j = 0; j < planetThreeCount; j ++ ) {

    // different colors. Will be distributed evenly amongst instances
    const colors = ["Linen", "DarkOliveGreen", "LightSkyBlue"]
    randomizeMatrix( matrixThree );
    planetThreeMesh.setMatrixAt( j, matrixThree );
    // setting the colors
    planetThreeMesh.setColorAt(j, new THREE.Color(colors[Math.round(j % 3)]))
}
// neccesary to update the new colors

scene.add( planetThreeMesh )

// End Planets -------------------------------------------------------

// Exhaust System ----------------------------

    let flameParticles
    let launchParticles
    // standstill or liftoff variable (true or false)
    let start

    const loader = new THREE.TextureLoader();

    const vertexShader = `
    uniform float pointMultiplier;
    attribute float scale;
    attribute float alpha;
    
    varying float alphaToFrag;
    
    void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        gl_PointSize = pointMultiplier * 2000.0 * scale / gl_Position.w;
    
        alphaToFrag = alpha;
    }
    `;
    
    const fragmentShader = `
    uniform sampler2D diffuseTexture;
    
    varying float alphaToFrag;
    
    void main() {
        gl_FragColor = texture2D(diffuseTexture, gl_PointCoord) * vec4(1.0, 1.0, 1.0, alphaToFrag);
    }
    `;
    
    class ParticleSystem {
    constructor (texture, emit_every, particle_life) {
        this.texture = texture;
        this.emit_every = emit_every;
        this.particle_life = particle_life;
        this.last_emission = 0;
    
        this.geometry = new THREE.BufferGeometry();
        this.particles = [];
        this.material = new THREE.ShaderMaterial({
        uniforms: {
            diffuseTexture: { value: texture },
            pointMultiplier: { value: window.innerHeight / window.innerWidth }
        },
        vertexShader,
        fragmentShader,
        blending: THREE.NormalBlending,
        depthTest: true,
        depthWrite: false,
        transparent: true,
        vertexColors: true,
        });
    
        this.mesh = new THREE.Points(this.geometry, this.material);
        this.clock = new THREE.Clock();
    }
    
    setPosition(position) {
        this.mesh.position.x = position.x;
        this.mesh.position.y = position.y;
        this.mesh.position.z = position.z;
    }
    
    getMesh() {
        return this.mesh;
    }
    
    updateAspect() {
        this.material.uniforms.pointMultiplier.value = window.innerHeight / window.innerWidth;
    }
    
    spawn() {
        this.particles.push({
        position: [0, 0, 0],
        scale: 2,
        alpha: 1,
        spawnTime: this.clock.elapsedTime,
        });
    
        this.last_emission = this.clock.elapsedTime;
    }
    
    update() {
        const elapsedTime = this.clock.getElapsedTime();
    
        this.particles = this.particles.filter((particle) => elapsedTime - particle.spawnTime < this.particle_life);
    
        if (elapsedTime - this.last_emission >= this.emit_every) {
        this.spawn();
        }
    
        this.geometry.setAttribute("position", new THREE.Float32BufferAttribute(this.particles.map((particle) => particle.position).flat(), 3));
        this.geometry.setAttribute("scale", new THREE.Float32BufferAttribute(this.particles.map((particle) => particle.scale).flat(), 1));
        this.geometry.setAttribute("alpha", new THREE.Float32BufferAttribute(this.particles.map((particle) => particle.alpha).flat(), 1));
        this.geometry.attributes.position.needsUpdate = true;
        this.geometry.attributes.scale.needsUpdate = true;
        this.geometry.attributes.alpha.needsUpdate = true;
    }
    }

    class FlightGrowParticleSystem extends ParticleSystem {
        update() {
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].position[1] -= 0.02;
            this.particles[i].scale += 0.02;
            this.particles[i].alpha -= 0 
        }
        super.update();
        }
    }

    class LaunchGrowParticleSystem extends ParticleSystem {
        update() {
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].position[1] += 0.001;
            this.particles[i].scale += 0.2
            this.particles[i].alpha += 0.01
        }
        super.update();
        }
    }

    function FlightInit() {
        
        const flame = loader.load("/images/fire.png");
        flame.flipY = false;

        flameParticles = new FlightGrowParticleSystem(flame, 0.07, 1.6);
        flameParticles.setPosition(new THREE.Vector3(0, -4, 0));

        launchParticles = new LaunchGrowParticleSystem(flame, 0.1, 0.6);
        launchParticles.setPosition(new THREE.Vector3(0, -4.5, 0))
    }

    FlightInit()

// End of Exhaust System ------------------------

rocketGroup.position.y = 35
rocketGroup.position.x = 0
scene.add(rocketGroup)

// Rocket End -------------------------------------------------------

// Particles --------------------------------------------------------

const count = 20000

const particleGeometry = new THREE.BufferGeometry
const particleMaterial = new THREE.PointsMaterial
({
    map: starTexture,
    transparent: true,
    sizeAttenuation: true,
    alphaTest: 0.5,
    
    size: 4
})

const positions = new Float32Array(count * 3)

for (let i = 0; i < count; i++)
{
    const i3 = i * 3

    positions[i3 + 0] = (Math.random() - 0.5) * 1500
    positions[i3 + 1] = (Math.random() - 0.5) * 1500
    positions[i3 + 2] = (Math.random() - 0.5) * 1500
}

particleGeometry.setAttribute( "position", new THREE.BufferAttribute(positions, 3))

const particle = new THREE.Points(particleGeometry, particleMaterial)
scene.add(particle)
// End of Particles --------------------------------------------------

// Points of intrest -------------------------------------------------

    // Raycaster
    const raycaster = new THREE.Raycaster()

const points = [
    {
        position: new THREE.Vector3(0, 50, 10),
        element: document.querySelector('.cv')
    }
]

// Lights

const directionalLight = new THREE.DirectionalLight('#ffffff', 2)
const hemisphereLight = new THREE.HemisphereLight('#ffffff', '#ffffff', 1.5)
directionalLight.position.set(25, 100, 0)
scene.add(directionalLight, hemisphereLight)

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    if (flameParticles) {
        flameParticles.updateAspect();
    }
    if (launchParticles) {
        launchParticles.updateAspect();
    }

})

// Keypress experiments -----------------------------------------------------

// steering variables
let move_left
let move_right
let speed = 1
if (smallScreen.matches) {speed = 2}

// gps variables
let cvGps
let gitHubGps
let linkedinGps

// honk variable
let isHonking = 0

// Rocket moving function
const moveRocket = () => {

    if (move_left) {
        rocketGroup.rotation.x -= Math.PI * 0.02
    }
    else if (move_right) {
        rocketGroup.rotation.x += Math.PI * 0.02
    }
}

const doMobileAudio = () => {
    let listener = new THREE.AudioListener()
    camera.add(listener)

    let audioLoader = new THREE.AudioLoader()

    const volume = 0.15

    let countdownSound = new THREE.Audio(listener)
    let launchSound = new THREE.Audio(listener)
    let fasterSoundOne = new THREE.Audio(listener)
    let fasterSoundTwo = new THREE.Audio(listener)
    let slowerSoundOne = new THREE.Audio(listener)
    let slowerSoundTwo = new THREE.Audio(listener)
    let honkSound = new THREE.Audio(listener)

    countdownSound.setVolume(volume * 0.5)
    launchSound.setVolume(volume)
    fasterSoundOne.setVolume(volume)
    fasterSoundTwo.setVolume(volume)
    slowerSoundOne.setVolume(volume)
    slowerSoundTwo.setVolume(volume)
    honkSound.setVolume(volume)
    audioLoader.load("/sounds/countdown.mp3", (buffer) => {
        countdownSound.setBuffer(buffer)
    })
    audioLoader.load("/sounds/launch.mp3", (buffer) => {
        launchSound.setBuffer(buffer)
    })
    audioLoader.load("/sounds/thruster.mp3", (buffer) => {
        fasterSoundOne.setBuffer(buffer),
        fasterSoundTwo.setBuffer(buffer)
    })
    audioLoader.load("/sounds/slower.mp3", (buffer) => {
        slowerSoundOne.setBuffer(buffer),
        slowerSoundTwo.setBuffer(buffer)
    })
    audioLoader.load("/sounds/honk.mp3", (buffer) => {
        honkSound.setBuffer(buffer)
    })
}

// starting Function
const startCommand = () => {
    if (!start) {
        start = 1,
        rocketGroup.add(launchParticles.getMesh()),
        hideStartInfo(),
        doMobileAudio()
    }
}

document.addEventListener("click", startEverything)
// Mobile event listeners
if (smallScreen.matches) {

    controlDiv.addEventListener("click", startCommand)

}


// Key Down Listener
document.onkeydown = function(e) {
    e.preventDefault();
    let k = e.code
    // listening for liftoff command
    if (k === "KeyS" && !start) { startCommand() }
    // listening for flight-controlls
    else if (k === "ArrowLeft") { move_left = 1}
    else if (k === "ArrowRight") { move_right = 1 }

    // speed
    else if (k === "ArrowUp") {
         if (speed === 1) {speed = 2, soundOn ? fasterSoundOne.play() : "" }
         else if (speed === 2) {speed = 3, soundOn ? fasterSoundTwo.play() : "" }
    }
    else if (k === "ArrowDown") {
        if (speed === 2) {speed = 1, soundOn ? slowerSoundOne.play() : "" }
        if (speed === 3) {speed = 2, soundOn ? slowerSoundTwo.play() : "" }
   }

    // Opening other websites
    else if (k === "Enter") {
        if ( Math.abs(rocketGroup.position.z - gitHub.position.z) < 15 && Math.abs(rocketGroup.position.y - gitHub.position.y) < 15) { 
            window.open('https://github.com/SwissCheese15', '_blank')
        }
        if ( Math.abs(rocketGroup.position.z - linkedin.position.z) < 15 && Math.abs(rocketGroup.position.y - linkedin.position.y) < 15) { 
            window.open('https://www.linkedin.com/in/manuel-winkler-developer/', '_blank')
        }
        if ( Math.abs(rocketGroup.position.z - cv.position.z) < 15 && Math.abs(rocketGroup.position.y - cv.position.y) < 15) { 
            window.open('documents/CV Manuel Winkler.pdf', '_blank')
        }
        if ( Math.abs(rocketGroup.position.z - duckGroup.position.z) < 20 && Math.abs(rocketGroup.position.y - duckGroup.position.y) < 20) { 
            window.open('documents/duck_award.pdf', '_blank')
        }
    }

    // GPS
    else if (k === "KeyC") {
        return cvGps = 1, gitHubGps = 0, linkedinGps = 0
    }
    else if (k === "KeyG") {
        return cvGps = 0, gitHubGps = 1, linkedinGps = 0
    }
    else if (k === "KeyL") {
        return cvGps = 0, gitHubGps = 0, linkedinGps = 1
    }

    // Honk
    else if (k === "KeyH") {
        return  soundOn ? honkSound.play() : "" ,
        isHonking = 1,
        honkingClock.start()
    }

  };

// Key Up Listener
document.onkeyup = function(e) {
    e.preventDefault();
    
    let k = e.code
    // listening for end of flight-controlls
    if (k === "ArrowLeft") { move_left = 0 }
    else if (k === "ArrowRight") { move_right = 0 }
  };

// Mobile Support
if (smallScreen.matches) {

    const navigate = () => {
        if ( Math.abs(rocketGroup.position.z - gitHub.position.z) < 15 && Math.abs(rocketGroup.position.y - gitHub.position.y) < 15) { 
            window.open('https://github.com/SwissCheese15', '_blank')
        }
        if ( Math.abs(rocketGroup.position.z - linkedin.position.z) < 15 && Math.abs(rocketGroup.position.y - linkedin.position.y) < 15) { 
            window.open('https://www.linkedin.com/in/manuel-winkler-developer/', '_blank')
        }
        if ( Math.abs(rocketGroup.position.z - cv.position.z) < 15 && Math.abs(rocketGroup.position.y - cv.position.y) < 15) { 
            window.open('documents/CV Manuel Winkler.pdf', '_blank')
        }
        if ( Math.abs(rocketGroup.position.z - duckGroup.position.z) < 20 && Math.abs(rocketGroup.position.y - duckGroup.position.y) < 20) { 
            window.open('documents/duck_award.pdf', '_blank')
        }
    }
    
    document.addEventListener("click", navigate)
}


// End of Keypress experiments -----------------------------------------------------
// Animations ----------------------------------------------------------------------

// Sizes

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Camera

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(-1.9, 35.05, 0)
camera.lookAt(rocketGroup.position)

scene.add(camera)
camera.lookAt(rocketGroup.position)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

camera.lookAt(rocketGroup.position)

// Sounds --------------------------------------------------------

let listener = new THREE.AudioListener()
camera.add(listener)

let audioLoader = new THREE.AudioLoader()

const volume = 0.15

let countdownSound = new THREE.Audio(listener)
let launchSound = new THREE.Audio(listener)
let fasterSoundOne = new THREE.Audio(listener)
let fasterSoundTwo = new THREE.Audio(listener)
let slowerSoundOne = new THREE.Audio(listener)
let slowerSoundTwo = new THREE.Audio(listener)
let honkSound = new THREE.Audio(listener)

countdownSound.setVolume(volume * 0.5)
launchSound.setVolume(volume)
fasterSoundOne.setVolume(volume)
fasterSoundTwo.setVolume(volume)
slowerSoundOne.setVolume(volume)
slowerSoundTwo.setVolume(volume)
honkSound.setVolume(volume)

audioLoader.load("/sounds/countdown.mp3", (buffer) => {
    countdownSound.setBuffer(buffer)
})
audioLoader.load("/sounds/launch.mp3", (buffer) => {
    console.log("launch loaded")
    launchSound.setBuffer(buffer)
    console.log("launch loaded")
})
audioLoader.load("/sounds/thruster.mp3", (buffer) => {
    fasterSoundOne.setBuffer(buffer),
    fasterSoundTwo.setBuffer(buffer)
})
audioLoader.load("/sounds/slower.mp3", (buffer) => {
    slowerSoundOne.setBuffer(buffer),
    slowerSoundTwo.setBuffer(buffer)
})
audioLoader.load("/sounds/honk.mp3", (buffer) => {
    honkSound.setBuffer(buffer)
})

// End of Sounds -------------------------------------------------

// Renderer

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Sirst phase after click (camera moving back and then back and up, text fading out)
const welcomeTick = () => {

    const elapsedTime = welcomeClock.getElapsedTime()

    // first phase after start without movement

    if (elapsedTime > 2.5 && elapsedTime < 5) {
        camera.position.x -= 0.0007 * (elapsedTime ** 4)
        camera.position.y += 0.0001 * (elapsedTime ** 4)
    }
    if (elapsedTime > 4) {
        camera.position.y += 0.0002 * (elapsedTime ** 4)
    }
    if (elapsedTime > 5) {
        return addStartInfo(), launchTick(), removeWelcomeDiv()
    }

    // Having the camera look at the rocket
    camera.lookAt(rocketGroup.position)
    
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(welcomeTick)

}

// Second phase for the launch. (Camera doing a slight turn, moving up, then passed by rocket)
const launchTick = () => {
    
    if (start) {

        const elapsedTime = startClock.getElapsedTime()

        // countdown sound
        if (elapsedTime < 0.1 && soundOn) {countdownSound.play()}
        
        // rocket / camera animations
        if (elapsedTime < 3.8) {camera.position.z -= 0.2}

        if (elapsedTime > 3.8) {
            rocketGroup.position.y += 0.0038 * elapsedTime ** 3
            arrowGroup.position.y += 0.0038 * elapsedTime ** 3
            camera.position.z += 0.27
            camera.position.y +=  0.5
            camera.position.x -= 0.20
        }
        if (elapsedTime > 3.8 && elapsedTime < 3.83) {
            rocketGroup.remove(rocketGroup.children[1]),
            rocketGroup.add(flameParticles.getMesh()),
            soundOn ? launchSound.play() : ""
        }
    }

    // Exhaust animation
    flameParticles.update();
    launchParticles.update()

    camera.lookAt(rocketGroup.position)
    
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    if (camera.position.z <= 0) {
        window.requestAnimationFrame(launchTick)
    }
    else { return removeStartInfo(), addFlightInfo(), flightTick() }

}

// Third phase, flight. Triggered when camera and rocket pos Y level.
const flightTick = () =>
{
    // // Update controls
    // controls.update()

    // Rocket Animations -----------------------------------

        // changing the value of v depending on the up arrow press
        let v
        if (speed === 1) { v = new THREE.Vector3(0, 0.2, 0) }
        else if (speed === 2) { v = new THREE.Vector3(0, 0.4, 0) }
        else { v = new THREE.Vector3(0, 0.6, 0) }
        // changing the vector depending on the current rotation of the rocket
        v.applyAxisAngle( new THREE.Vector3(1, 0, 0), rocketGroup.rotation.x)
        // changing the position of the rocket and camera
        rocketGroup.position.add(v)
        arrowGroup.position.add(v)
        camera.position.add(v)
        // Exhaust animation
        flameParticles.update();

    moveRocket()

    // Animate eastereggs
    duckGroup.rotation.y += 0.03

    // GPS Animation
    if (cvGps || gitHubGps || linkedinGps) { arrowGroup.visible = true }

    if (cvGps) {arrowGroup.lookAt(flatCvPosition)}
    if (gitHubGps) {arrowGroup.lookAt(flatGitHubPosition)}
    if (linkedinGps) {arrowGroup.lookAt(flatLinkedinPosition)}

    // resizing the targets when in the vicinity
    // displaying Enter Button / jules message (hidden by default)
    hideEnterButton()
    hideJules()
    
    if ( Math.abs(rocketGroup.position.z - gitHub.position.z) < 15 && Math.abs(rocketGroup.position.y - gitHub.position.y) < 15) {
        gitHub.scale.set(1.2, 1.2, 1.2), showEnterButton()
    }
    else {gitHub.scale.set(1, 1, 1)}

    if ( Math.abs(rocketGroup.position.z - cv.position.z) < 15 && Math.abs(rocketGroup.position.y - cv.position.y) < 15) {
        cv.scale.set(1.2, 1.2, 1.2), showEnterButton()
    }
    else {cv.scale.set(1, 1, 1)}

    if ( Math.abs(rocketGroup.position.z - linkedin.position.z) < 15 && Math.abs(rocketGroup.position.y - linkedin.position.y) < 15) {
        linkedin.scale.set(1.2, 1.2, 1.2), showEnterButton()
    }
    else {linkedin.scale.set(1, 1, 1)}
    // duck certificate
    if ( Math.abs(rocketGroup.position.z - duckGroup.position.z) < 20 && Math.abs(rocketGroup.position.y - duckGroup.position.y) < 20) {
        showEnterButton()
    }
    // jule message
    if (Math.abs(rocketGroup.position.z - 0) < 25 && Math.abs(rocketGroup.position.y - 0) < 25) {
        showJules()
    }

    // honking movement
    
    if (isHonking) {
        let elapsedHonkingTime = honkingClock.getElapsedTime()
        if (elapsedHonkingTime > 0.1) {rocketGroup.scale.set(1.1, 1.1, 1.1)}
        if (elapsedHonkingTime > 0.2) {rocketGroup.scale.set(1, 1, 1)}
        if (elapsedHonkingTime > 0.3) {rocketGroup.scale.set(1.1, 1.1, 1.1)}
        if (elapsedHonkingTime > 0.4) {
            rocketGroup.scale.set(1, 1, 1),
            isHonking = 0
        }
    }

    // Having the camera look at the rocket
    camera.lookAt(rocketGroup.position)
    
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(flightTick)
}