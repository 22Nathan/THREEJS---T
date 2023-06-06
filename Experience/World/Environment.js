

import * as THREE from 'three'

import Experience from '../Experience'


export default class Environment {

    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.ressources = this.experience.ressources
        this.debug = this.experience.debug

        if( this.debug.active ){
            this.debugFolder = this.debug.ui.addFolder('environment')
        }

        this.setSunLight()
        this.setEnvironmentMap()
    }

    setSunLight(){
        this.sunLight = new THREE.DirectionalLight('#ffffff', 4)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 15
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(3, 3, - 2.25)
        this.scene.add(this.sunLight)

        if( this.debug.active ){
            this.debugFolder
                .add( this.sunLight, 'intensity' )
                .name( 'sunLightIntensity' )
                .min(0)
                .max(10)
                .step(.001)
        }
    }

    setEnvironmentMap(){
        this.environmentMap = {}
        this.environmentMap.intensity = .8
        this.environmentMap.texture = this.ressources.items.environmentMapTexture
        // this.environmentMap.texture.encoding = THREE.sRGBEncoding
        this.environmentMap.texture.colorSpace = THREE.SRGBColorSpace

        this.scene.environment = this.environmentMap.texture

        this.environmentMap.updateMaterials = () => {
            this.scene.traverse((child) => {
                if( child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial ){
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }

        this.environmentMap.updateMaterials()

        if( this.debug.active ){
            this.debugFolder
                .add( this.environmentMap, 'intensity' )
                .name( 'envMapIntensity' )
                .min(0)
                .max(4)
                .step(.001)
                .onChange( this.environmentMap.updateMaterials )
        }
    }

}