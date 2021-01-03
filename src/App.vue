<template>
  <div id="app">
    <h1 id='apptitle'>
      Horologium
    </h1>
    <h2>
      <em>Show the time in your local time zone, UTC, or any other time zone</em>
    </h2>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
    <a href="https://github.com/donovanrichardson/horologium">GitHub</a>
  </div>
</template>

<style lang="scss">
html, body {
    margin: 0;
    height: 100%;
}
body{
  background: url("https://res.cloudinary.com/donovanrichardson/image/upload/e_colorize:95,co_rgb:ffffff/v1609706333/jontyson-brown-and-white%20clocks%20photo.jpg");
  background-size: cover;
  background-position: center;
}
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
