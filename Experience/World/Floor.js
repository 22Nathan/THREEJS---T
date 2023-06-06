

import * as THREE from 'three'

import Experience from '../Experience'


export default class Floor {

    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.ressources = this.experience.ressources

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry(){
        this.geometry = new THREE.CircleGeometry( 5 , 64 )
    }
    
    setTextures(){
        this.textures = {}

        this.textures.color = this.ressources.items.grassColorTexture
        this.textures.color.colorSpace = THREE.SRGBColorSpace
        this.textures.color.repeat.set( 1.5 , 1.5 )
        this.textures.color.wrapS = THREE.RepeatWrapping
        this.textures.color.wrapT = THREE.RepeatWrapping

        this.textures.normal = this.ressources.items.grassNormalTexture
        this.textures.normal.repeat.set( 1.5 , 1.5 )
        this.textures.normal.wrapS = THREE.RepeatWrapping
        this.textures.normal.wrapT = THREE.RepeatWrapping
    }

    setMaterial(){
        this.material = new THREE.MeshStandardMaterial({
            map: this.textures.color,
            normalMap: this.textures.normal
        })
    }

    setMesh(){
        this.mesh = new THREE.Mesh( this.geometry , this.material )
        // this.mesh.rotation.X = -Math.PI * .5
        this.mesh.rotation.set( -1.6, 0 , 0 )
        this.mesh.receiveShadow = true
        this.scene.add( this.mesh )
    }

}