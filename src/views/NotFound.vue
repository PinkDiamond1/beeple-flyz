<template>
  <div class="bg-gray-800" >

      <Navbar />



      <div class="lg:flex mb-4">
          File not found!
          <router-link to="/">Go Home</router-link>
      </div>

  <Footer/>

  </div>
</template>


<script>

 
import Footer from './components/Footer.vue'

export default {
  name: 'NotFound',
  props: [],
  components: {Footer},
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>
