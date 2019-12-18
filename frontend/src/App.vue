<template>
  <div id="app">
    <transition
    :name="transitionName"
    mode="out-in"
    >
      <router-view/>
    </transition>
  </div>
</template>

<script>
const DEFAULT_TRANSITION = 'fade'

export default {
  name: 'App',
  data() {
    return {
      transitionName: DEFAULT_TRANSITION
    }
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      // gets transition name from router.js meta tag
      let transitionName = to.meta.transitionName || from.meta.transitionName
      // if transition is slide, we check if we are going deeper into the route or back a level
      if (transitionName === 'slide') {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
      // assign the transition name we are using and then going to the next action
      this.transitionName = transitionName || DEFAULT_TRANSITION
      next()
    })
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.5s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}
</style>
