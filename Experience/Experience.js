

import * as THREE from 'three'

import Sizes from './Utils/Sizes'
import Time from './Utils/Time'
import Camera from './Utils/Camera'
import Renderer from './Utils/Renderer'
import World from './World/World'
import Ressources from './Utils/Ressources'
import sources from './sources'
import Debug from './Utils/Debug'



let instance = null

export default class Experience {

    constructor( canvas ){

        // SINGLETON
        if( instance ) { return instance }
        instance = this

        this.canvas = canvas

        this.debug = new Debug()

        this.sizes = new Sizes()
        this.sizes.on('resize', () => { this.resize() })

        this.time = new Time()
        this.time.on('tick', () => { this.update() })

        this.scene = new THREE.Scene()

        this.ressources = new Ressources( sources )

        this.camera = new Camera()

        this.renderer = new Renderer()

        this.world = new World()
    }

    resize(){
        this.camera.resize()
        this.renderer.resize()
    }

    update(){
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }

    destroy(){
        this.sizes.off('resize')
        this.time.off('tick')

        this.scene.traverse((child) => {
            if( child instanceof THREE.Mesh ){
                child.geometry.dispose()
                for( const key in child.material ){
                    const value = child.material[key]
                    if( value && typeof value.dispose === 'function' ){
                        value.dispose()
                    }
                }
            }
        })

        this.camera.controls.dispose()
        this.renderer.instance.dispose()

        if( this.debug.active ){ this.debug.ui.destroy() }
    }

}