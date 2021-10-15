import * as Three from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module.js'

import ModelHelper from './modelHelper'

export class BvModel {
    constructor(domElement, data) {
        this.clear()

        this.__initThree(domElement)

        this.__initSphere(data['nodeTable'])
        this.__initLine(data['linkTable'])

        this.__initClick()
        this.__initSlide(data['dateList'])

        this.__animate()
    }

    __animate() {
        this.animationId = requestAnimationFrame(() => this.__animate())
        this.renderer.render(this.scene, this.camera)

        if (this.currentSphereMaterial) {
            this.currentSphereMaterial.uniforms['time'].value = performance.now() * 0.0001
        }

        if (this.currentLine) {
            this.currentLine.material.resolution.set(innerWidth, innerHeight)
        }

        if (this.isClick > 0) {
            this.__handleClick()
        }

        //console.log(this.renderer.info.render.calls)

        this.stats.update()
    }

    clear() {
        // DomElement BvModel bound on Dom tree
        this.element = null
        // Base
        this.renderer = null
        this.scene = null
        this.camera = null
        // Control
        this.controls = null
        // Layer Index
        this.currentLayer = null
        // Sphere
        this.sphereArray = []
        this.currentSphere = null
        this.currentSphereMaterial = null // Change 'time' value to make animation
        // Dummy Points: InstancedBufferGeom cannot be casted by ray, so add an invisible dummy
        this.dummyPointsArray = [] //[index][points]
        this.currentDummyPoints = null
        // Line
        this.currentLine = null
        this.lastLine = null
        // SpriteText
        this.spriteTextArray = []
        // Data Structure
        this.sphereId2EntityMaps = null
        this.sphereIndex2RawEdgeMaps = null
        this.sphereIndex2LineMaps = null
        // Click
        this.raycaster = null
        this.intersects = null
        this.mouse = null
        this.isClick = 3
        this.lastChosenIndex = -1
        //
        this.stats = null
        this.__clearWhenDestroyed()
    }

    __clearWhenDestroyed() {
        // Cancel animation frame requests when destroyed
        if (this.animationId !== undefined) {
            cancelAnimationFrame(this.animationId)
        }
        // Clear the event listener bound to window when destroyed
        window.removeEventListener('resize', this.__handleResize)
    }

    enableHelp() {
        this.typeColorHint = new ModelHelper.bvTypeColorHint(this.element)
        this.typeColorHint.show()
    }

    /**
     * Click Method
     */
    __handleClick() {
        if (this.raycaster) { // Only handle click when initClick has been called
            this.raycaster.setFromCamera(this.mouse, this.camera)
            this.intersects = this.raycaster.intersectObject(this.currentDummyPoints)
            if (this.intersects.length > 0) {
                const intersect = this.intersects[0]
                const index = intersect.index

                if (this.sphereIndex2LineMaps) {
                    this.__showLine(index)
                }
            }
        }
    }

    __showLine(index) {
        if (this.lastChosenIndex === index) {
            return
        }
        if (this.lastLine) {
            this.lastLine.visible = false
        }
        this.currentLine = this.sphereIndex2LineMaps[this.currentLayer].get(index)
        if (this.currentLine) {// Some bv has no line(rawEdge)
            this.currentLine.visible = true
        }
        this.lastChosenIndex = index
        this.lastLine = this.currentLine
    }

    /**
     * SlideBar Change Layer Display
     */
    __initSlide(dateList) {
        this.slideBar = new ModelHelper.BvSlideBar(this.element, dateList)
        this.slideBar.getSlideBar().addEventListener('input', () => {
            const target = this.slideBar.getValue()

            this.__switchLayer(target)

            this.slideBar.updateTag()
        })
    }

    __switchLayer(layer) {
        this.currentLayer = layer

        this.lastChosenIndex = -1
        this.lastLine = undefined
        if (this.currentLine) {
            this.currentLine.visible = false
        }

        this.sphereArray.forEach(sphere => {
            sphere.visible = false
        })
        this.currentSphere = this.sphereArray[layer]
        this.currentSphere.visible = true
        this.currentSphereMaterial = this.currentSphere.material

        this.currentDummyPoints = this.dummyPointsArray[layer]

        this.spriteTextArray.forEach((spriteTexts, index) => {
            spriteTexts.forEach(spriteText => {
                // TODO Why (index === layer) went wrong?
                // spriteText.visible = (index === layer)
                spriteText.visible = (index - layer === 0)
            })
        })
    }

    /**
     * Initialization Methods
     */

    __initSphere(bvData) {
        this.sphereId2EntityMaps = []
        this.sphereIndex2RawEdgeMaps = []
        this.sphereIndex2LineMaps = []
        this.spriteTextArray = []

        bvData.forEach(dataOfDays => {
            const sphereId2Entity = new Map()
            const sphereIndex2RawEdge = new Map()
            const sphereIndex2Line = new Map()
            const spriteTexts = []

            const colors = []
            const positions = []
            const sizes = []
            const speeds = []

            const dummySizes = []
            const dummyGenres = []
            const dummyAlphas = []

            dataOfDays.forEach((data, index) => {
                const id = data['id']
                const x = data['x'] // The whole model should use origin as center
                const y = data['y']
                const z = data['z']
                const hint = data['hint']
                const type = data['type']
                const flashSpeed = data['flashSpeed']
                let size = data['size']

                const node = new ModelHelper.BvNode(id, index, x, y, z, hint, type, size, flashSpeed)
                sphereId2Entity.set(id, node)
                sphereIndex2RawEdge.set(index, [])

                // Color
                const color = ModelHelper.MODEL_COLOR.getThreeColorByType(type)
                new Three.Color(color).toArray(colors, index * 3)
                // Position
                positions.push(x, y, z)
                // Size
                sizes.push(size)
                // FlashSpeed
                speeds.push(flashSpeed)

                dummySizes.push(size * ModelHelper.BV_DUMMY_POINT_SCALE)
                dummyAlphas.push(1.0)
                dummyGenres.push(0)

                const spriteTextLod = ModelHelper.getBvSpriteTextLod(hint, x, y, z, 30000, {
                    'borderColor': {
                        r: 0,
                        g: 0,
                        b: 0,
                        a: 0.0
                    }, 'scale': Math.max(5, size * 10) // SpriteText content shouldn't be too small
                })
                this.scene.add(spriteTextLod)
                spriteTexts.push(spriteTextLod)
            })
            this.sphereId2EntityMaps.push(sphereId2Entity)
            this.sphereIndex2RawEdgeMaps.push(sphereIndex2RawEdge)
            this.sphereIndex2LineMaps.push(sphereIndex2Line)
            // TODO A better way to store SpriteText:
            // Only make new SpriteText when necessary,
            // otherwise just record new coordinate.
            // Namely, when layer changes, you should
            // use spriteText.setPosition(new Position)
            // instead of spriteText.visible = false/ true
            this.spriteTextArray.push(spriteTexts)

            const spheres = ModelHelper.getBvSpheres(positions, colors, sizes, speeds)
            this.sphereArray.push(spheres)
            this.scene.add(spheres)

            const dummyPoints = ModelHelper.getBvPoints(positions, colors, dummySizes, dummyGenres, dummyAlphas)
            dummyPoints.visible = false
            this.dummyPointsArray.push(dummyPoints)
            this.scene.add(dummyPoints)

        })
        // Enable layer 0
        this.__switchLayer(0)
    }

    __initLine(edgeData) {
        edgeData.forEach((dataOfDay, index) => {
            const sphereIndex2Line = this.sphereIndex2LineMaps[index]
            const sphereId2Entity = this.sphereId2EntityMaps[index]
            const sphereIndex2RawEdge = this.sphereIndex2RawEdgeMaps[index]
            dataOfDay.forEach(data => {
                const bv1 = sphereId2Entity.get(data['id1'])
                const bv2 = sphereId2Entity.get(data['id2'])
                const value = data['value']

                const rawEdge = new ModelHelper.BvRawEdge(bv1, bv2, value)
                sphereIndex2RawEdge.get(bv1.index).push(rawEdge)
                sphereIndex2RawEdge.get(bv2.index).push(rawEdge)
            })
            sphereIndex2RawEdge.forEach((edgeArr, bvIndex) => {
                if (edgeArr.length !== 0) { // Some bvNode has no edge
                    const posArr = []
                    const colorArr = []
                    const widthArr = []

                    edgeArr.forEach((rawEdge, innerIndex) => {
                        posArr.push(rawEdge.x1, rawEdge.y1, rawEdge.z1, rawEdge.x2, rawEdge.y2, rawEdge.z2)

                        const color1 = ModelHelper.MODEL_COLOR.getThreeColorByType(rawEdge.type1)
                        const color2 = ModelHelper.MODEL_COLOR.getThreeColorByType(rawEdge.type2)

                        color1.toArray(colorArr, innerIndex * 6)
                        color2.toArray(colorArr, innerIndex * 6 + 3)

                        const width = Math.min(8.0, Math.max(rawEdge.value, 3.0))
                        widthArr.push(width)// Experiment proves there are 6 times vertex shader calling
                    })
                    const line = ModelHelper.getBvLines(posArr, colorArr, widthArr)
                    line.visible = false
                    sphereIndex2Line.set(bvIndex, line)

                    this.scene.add(line)
                }
            })
        })
    }

    __initClick() {
        this.raycaster = new Three.Raycaster()
        // Must expand point effective ray range for click
        this.raycaster.params.Points.threshold = ModelHelper.BV_DUMMY_POINT_SCALE / 5
        this.mouse = new Three.Vector2()

        const element = this.element
        element.addEventListener('pointerdown', () => {
            this.isClick = 3
        })
        element.addEventListener('pointermove', () => {
            this.isClick = this.isClick - 1
        })
        element.addEventListener('pointerup', () => {
            if (this.isClick > 0) {
                // calc the offset recursively in the element tree
                let offsetLeft = element.offsetLeft
                let offsetTop = element.offsetTop
                let current = element.offsetParent
                while (current !== null) {
                    offsetLeft += current.offsetLeft
                    offsetTop += current.offsetTop
                    current = current.offsetParent
                }
                this.mouse.x =
                    ((event.clientX - offsetLeft) / element.clientWidth) * 2 - 1
                this.mouse.y =
                    -((event.clientY - offsetTop) / element.clientHeight) * 2 + 1
            }
        })
    }

    __initThree(domElement) {
        this.element = domElement

        this.scene = new Three.Scene()

        this.camera = new Three.PerspectiveCamera(70, this.element.clientWidth / this.element.clientHeight, 1, 100000)
        this.camera.position.set(10000, 10000, 10000)
        this.camera.lookAt(0, 0, 0)

        this.renderer = new Three.WebGLRenderer({antialias: true, alpha: true})
        this.renderer.setSize(this.element.clientWidth, this.element.clientHeight)
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setClearColor(0x000000, 0.9)
        this.element.appendChild(this.renderer.domElement)
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.enablePan = false // prevent moving spheres from camera scale
        this.controls.maxDistance = 50000

        this.stats = new Stats()
        this.element.appendChild(this.stats.dom)

        // adjust camera when window resize
        window.addEventListener('resize', this.__handleResize = () => {
            this.camera.aspect = this.element.clientWidth / this.element.clientHeight
            this.camera.updateProjectionMatrix()

            this.renderer.setSize(this.element.clientWidth, this.element.clientHeight)
        })
        // Cancel the right click menu
        this.element.oncontextmenu = (event) => {
            event.returnValue = false
        }
    }
}
