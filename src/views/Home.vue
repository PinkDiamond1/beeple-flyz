<template>

<div>

    
    <div id="info" class="hidden">
			<a href="https://threejs.org" target="_blank" rel="noopener">three.js</a> - webgl - KTX2 texture loader<br />
			<a href="http://github.khronos.org/KTX-Specification/" target="_blank" rel="noopener">KTX2</a> with
			<a href="https://github.com/binomialLLC/basis_universal" target="_blank">Basis Universal GPU Texture Codec</a>
		</div>

    <div id="canvas-holder"  >
      </div>


</div>
</template>


<script> 

	import * as THREE from 'three';
 
  import { OrbitControls } from '../js/OrbitControls.js';

  let renderer, scene, camera, controls;

export default {
  name: 'Home',
  props: [],
  components: {},
  data() {
    return {
      imageId: 1

    }
  },

  mounted(){

    this.imageId = this.$route.params.id

    console.log('this.$route.params',this.$route.params)


    if(!this.imageId || isNaN(this.imageId)){
      this.imageId = 1
    }

    this.init()
  },

  methods: {
    async init(){


	    const width = window.innerWidth;
			const height = window.innerHeight;

			renderer = new THREE.WebGLRenderer( { antialias: true } );
			renderer.setSize( width, height );
			renderer.outputEncoding = THREE.sRGBEncoding;

      let canvasHolder = document.getElementById('canvas-holder')
			canvasHolder.appendChild( renderer.domElement );

			scene = new THREE.Scene();
			scene.background = new THREE.Color( 0x202020 );

			camera = new THREE.PerspectiveCamera( 60, width / height, 0.1, 100 );
			camera.position.set( 2, 1.5, 1 );
			camera.lookAt( scene.position );
			scene.add( camera );

			controls = new OrbitControls( camera, renderer.domElement );
			controls.autoRotate = true;

			// PlaneGeometry UVs assume flipY=true, which compressed textures don't support.
			const geometry =  ( new THREE.PlaneGeometry() );
			const material = new THREE.MeshBasicMaterial( {
				color: 0xFFFFFF,
				side: THREE.DoubleSide
			} );
			const mesh = new THREE.Mesh( geometry, material );
			scene.add( mesh );

		 
			// Samples: sample_etc1s.ktx2, sample_uastc.ktx2, sample_uastc_zstd.ktx2
		//	const loader = new THREE.ImageLoader()
			 


			try { 
        console.log('this.imageId',this.imageId)
 
				const texture = new THREE.TextureLoader().load( `./images/flyz/${this.imageId}.jpg` );
 
				material.map = texture;
				material.transparent = true;

				material.needsUpdate = true;

			} catch ( e ) {

				console.error( e );

			} finally {

			//	loader.dispose();

			}


			this.animate();


      window.addEventListener( 'resize', this.onWindowResize );

    },
    animate() {

				requestAnimationFrame( this.animate );

				controls.update();

				renderer.render( scene, camera );

		},
     onWindowResize() {

				const width = window.innerWidth;
				const height = window.innerHeight;

				camera.aspect = width / height;
				camera.updateProjectionMatrix();
				renderer.setSize( width, height );

			},
      


  }
}
</script>


	  