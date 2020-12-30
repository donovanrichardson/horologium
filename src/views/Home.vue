<template>
  <div class="home">
    <b-button variant='success'>
      Hello World
    </b-button>
    <UTC/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import UTC from '@/components/UTC.vue'

export default {
  name: 'Home',
  components: {
    UTC
  }
}
</script>
