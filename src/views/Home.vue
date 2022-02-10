<template>

<div>

    
    <div id="info" class="hidden">
			<a href="https://threejs.org" target="_blank" rel="noopener">three.js</a> - webgl - KTX2 texture loader<br />
			<a href="http://github.khronos.org/KTX-Specification/" target="_blank" rel="noopener">KTX2</a> with
			<a href="https://github.com/binomialLLC/basis_universal" target="_blank">Basis Universal GPU Texture Codec</a>
		</div>

    <div id="canvas-holder" class="relative"  >

      <div class="absolute border-2 border-white p-2 text-white" style="top:25px;left:25px;">
        Cryptoflyz #{{imageId}}  
       </div>
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
  watch:{
    $route (to, from){
         this.imageId = this.$route.params.id


        if(!this.imageId || isNaN(this.imageId)){
          this.imageId = 1
        }

          this.rebuildScene()
      }

     

      
  } ,
 
  mounted(){

    this.imageId = this.$route.params.id

   
    if(!this.imageId || isNaN(this.imageId)){
      this.imageId = 1
    }

    this.init()
     this.rebuildScene()
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
		

			controls = new OrbitControls( camera, renderer.domElement );
			controls.autoRotate = true;


      this.rebuildScene()



		

			this.animate();


      window.addEventListener( 'resize', this.onWindowResize );

    },

    rebuildScene(){

      while(scene.children.length > 0){ 
          scene.remove(scene.children[0]); 
      }

      	scene.add( camera );

      	// PlaneGeometry UVs assume flipY=true, which compressed textures don't support.
			const fly_geometry =  ( new THREE.PlaneGeometry() );
			const fly_material = new THREE.MeshBasicMaterial( {
				color: 0xFFFFFF,
				side: THREE.DoubleSide
			} );
			const fly_mesh = new THREE.Mesh( fly_geometry, fly_material );
			scene.add( fly_mesh );


      const box_geometry = new THREE.BoxGeometry( 1.4, 2, 1.4 ); 
      const box_material = new THREE.MeshBasicMaterial( { color: 0xffffff,   wireframe: true, } ); 
      const box_mesh = new THREE.Mesh( box_geometry, box_material );  
      scene.add( box_mesh );

		 
			// Samples: sample_etc1s.ktx2, sample_uastc.ktx2, sample_uastc_zstd.ktx2
		//	const loader = new THREE.ImageLoader()
			 


			try { 
        console.log('this.imageId',this.imageId)
 
				const texture = new THREE.TextureLoader().load( `./images/flyz/${this.imageId}.jpg` );
 
				fly_material.map = texture;
				fly_material.transparent = true;

				fly_material.needsUpdate = true;

			} catch ( e ) {

				console.error( e );

			} finally {

			//	loader.dispose();

			}



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


	  