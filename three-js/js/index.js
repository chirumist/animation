let camera
let container
let scene
let render
let house

function init() {
    container = document.querySelector('.scene')

    scene = new THREE.Scene()
    const fov = 35
    const aspect = container.clientWidth / container.clientHeight
    const near = .1
    const far = 1000

    camera = new THREE.PerspectiveCamera(fov, aspect, far, near)
    camera.position.set(-8, 3, 20)
    const ambient = new THREE.AmbientLight(0x404040, 2)
    scene.add(ambient)

    const light = new THREE.DirectionalLight(0xFFFFFF, 1)
    light.position.set(10, 50, 30)
    scene.add(light)

    render = new THREE.WebGLRenderer({antialias: true, alpha: true})
    render.setSize(container.clientWidth, container.clientHeight)
    render.setPixelRatio(window.devicePixel)
    container.appendChild(render.domElement)
    let loader = new THREE.GLTFLoader()
    loader.load('./3d/houses/scene.gltf', function (gltf) {
        scene.add(gltf.scene)
        house = gltf.scene.children[0]
        render.render(scene, camera)
        animate()
    })
}

function animate() {
    requestAnimationFrame(animate)
    house.rotation.z += .005
    render.render(scene, camera)
}
init()