<template>
  <div id="app">
    <h1 id='apptitle'>
      Horologium
    </h1>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
    <a href="https://github.com/donovanrichardson/horologium">GitHub</a>
    <b-container>
        <b-row>
          <b-col cols='5' sm=12>1 of 3</b-col>
          <b-col cols='2' sm=12>2 of 3</b-col>
          <b-col cols='5' sm=12>3 of 3</b-col>
        </b-row>
    </b-container>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding:1em;
}

#apptitle{
  font-weight: bold;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
