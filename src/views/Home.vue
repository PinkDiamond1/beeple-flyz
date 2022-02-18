<template>

<div>

    
    <div id="info" class="hidden">
			<a href="https://threejs.org" target="_blank" rel="noopener">three.js</a> - webgl - KTX2 texture loader<br />
			<a href="http://github.khronos.org/KTX-Specification/" target="_blank" rel="noopener">KTX2</a> with
			<a href="https://github.com/binomialLLC/basis_universal" target="_blank">Basis Universal GPU Texture Codec</a>
		</div>

    <div id="canvas-holder" class="relative"  >

      <div class="absolute border-2 border-white p-2 text-white" style="top:25px;left:25px;">
       <div class="text-center p-4">  Cryptoflyz #{{imageId}}   </div>

       <div class="text-center">
            <svg class="svg-icon inline  cursor-pointer" viewBox="0 0 20 20" v-on:click="incrementFlyz(-1)">
							<path d="M11.739,13.962c-0.087,0.086-0.199,0.131-0.312,0.131c-0.112,0-0.226-0.045-0.312-0.131l-3.738-3.736c-0.173-0.173-0.173-0.454,0-0.626l3.559-3.562c0.173-0.175,0.454-0.173,0.626,0c0.173,0.172,0.173,0.451,0,0.624l-3.248,3.25l3.425,3.426C11.911,13.511,11.911,13.789,11.739,13.962 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.148,3.374,7.521,7.521,7.521C14.147,17.521,17.521,14.148,17.521,10"></path>
						</svg>

            <svg class="svg-icon inline  cursor-pointer" viewBox="0 0 20 20" v-on:click="incrementFlyz(1)">
							<path d="M12.522,10.4l-3.559,3.562c-0.172,0.173-0.451,0.176-0.625,0c-0.173-0.173-0.173-0.451,0-0.624l3.248-3.25L8.161,6.662c-0.173-0.173-0.173-0.452,0-0.624c0.172-0.175,0.451-0.175,0.624,0l3.738,3.736C12.695,9.947,12.695,10.228,12.522,10.4 M18.406,10c0,4.644-3.764,8.406-8.406,8.406c-4.644,0-8.406-3.763-8.406-8.406S5.356,1.594,10,1.594C14.643,1.594,18.406,5.356,18.406,10M17.521,10c0-4.148-3.374-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.147,17.521,17.521,14.147,17.521,10"></path>
						</svg>
            
       </div>
       </div>



        <div class="absolute  p-2 text-white" style="bottom:25px;left:25px;">

          <a href="https://github.com/admazzola/beeple-flyz" target="_blank" class="">
            <svg class="svg-icon" viewBox="0 0 20 20">
							<path fill="none" d="M16.198,10.896c-0.252,0-0.455,0.203-0.455,0.455v2.396c0,0.626-0.511,1.137-1.138,1.137H5.117c-0.627,0-1.138-0.511-1.138-1.137V7.852c0-0.626,0.511-1.137,1.138-1.137h5.315c0.252,0,0.456-0.203,0.456-0.455c0-0.251-0.204-0.455-0.456-0.455H5.117c-1.129,0-2.049,0.918-2.049,2.047v5.894c0,1.129,0.92,2.048,2.049,2.048h9.488c1.129,0,2.048-0.919,2.048-2.048v-2.396C16.653,11.099,16.45,10.896,16.198,10.896z"></path>
							<path fill="none" d="M14.053,4.279c-0.207-0.135-0.492-0.079-0.63,0.133c-0.137,0.211-0.077,0.493,0.134,0.63l1.65,1.073c-4.115,0.62-5.705,4.891-5.774,5.082c-0.084,0.236,0.038,0.495,0.274,0.581c0.052,0.019,0.103,0.027,0.154,0.027c0.186,0,0.361-0.115,0.429-0.301c0.014-0.042,1.538-4.023,5.238-4.482l-1.172,1.799c-0.137,0.21-0.077,0.492,0.134,0.629c0.076,0.05,0.163,0.074,0.248,0.074c0.148,0,0.294-0.073,0.382-0.207l1.738-2.671c0.066-0.101,0.09-0.224,0.064-0.343c-0.025-0.118-0.096-0.221-0.197-0.287L14.053,4.279z"></path>
						</svg>
          </a>

       </div>
    </div>


</div>
</template>


<script> 

const MAX_COUNT = 6969

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

          this.rebuildScene()
      }

     

      
  } ,
 
  mounted(){

    this.imageId = this.$route.params.id

   
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


         if(this.imageId <1){
            this.imageId = MAX_COUNT
          }

          if(this.imageId > MAX_COUNT){
            this.imageId = 1
          }

        if(!this.imageId || isNaN(this.imageId)){
            this.imageId = 1
          }

       




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


      incrementFlyz(delta) {

        

         this.imageId += parseInt(delta)
 

         this.rebuildScene()

      }
      


  }
}
</script>


	  