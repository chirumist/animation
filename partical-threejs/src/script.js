import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { BufferAttribute } from 'three'

// Debug
const gui = new dat.GUI()

const loader = new THREE.TextureLoader()
const cross = loader.load('./cross.png')

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
const particalGeomatry = new THREE.BufferGeometry;
const particalCnt = 50000;

const posArray = new Float32Array(particalCnt * 3)

for (let i = 0; i < particalCnt * 3; i++) {
    posArray[i] = (Math.random() - .5) * (Math.random() * 5);
}

particalGeomatry.setAttribute('position', new BufferAttribute(posArray, 3))
// Materials

const material = new THREE.PointsMaterial({
    size: 0.010
})

const particalMaterial = new THREE.PointsMaterial({
    size: 0.005,
    map: cross,
    transparent: true
})

// Mesh
const sphere = new THREE.Points(geometry,material)
const partical = new THREE.Points(particalGeomatry,particalMaterial)
scene.add(sphere, partical)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

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
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(new THREE.Color('#21282a'))

/**
 * Animate
 */

const clock = new THREE.Clock()

let mouseY = 1
let mouseX = 1

document.addEventListener('mousemove', (e) => {
    mouseY = e.clientY
    mouseX = e.clientX
})

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime
    partical.rotation.y = -.03 * elapsedTime
    if(mouseY > 1 && mouseX > 1) {
        partical.rotation.y = -mouseX * (elapsedTime * 0.00004)
        partical.rotation.x = -mouseY * (elapsedTime * 0.00004)
    }

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()