<template>
  <div id="app">
    <TopNavBar v-if="$store.state.isLoggedIn"/>
    <transition
    :name="transitionName"
    :mode="transitionMode"
    :enter-active-class="transitionEnterActiveClass"
    >
      <router-view/>
    </transition>
  </div>
</template>

<script>
import TopNavBar from '@/components/TopNavBar'

const DEFAULT_TRANSITION = 'fade'
const DEFAULT_TRANSITION_MODE = 'out-in'

export default {
  name: 'App',
  components: {
    TopNavBar
  },
  data() {
    return {
      transitionName: DEFAULT_TRANSITION,
      transitionMode: DEFAULT_TRANSITION_MODE,
      transitionEnterActiveClass: ''
    }
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      // gets transition name from router.js meta tag
      let transitionName = to.meta.transitionName || from.meta.transitionName || DEFAULT_TRANSITION
      // if transition is slide, we check if we are going deeper into the route or back a level
      if (transitionName === 'slide') {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
      // assign the transition mode we are using and active class to use
      this.transitionMode = DEFAULT_TRANSITION_MODE
      this.transitionEnterActiveClass = `${transitionName}-enter-active`
      // if transition is zoom into a page
      if (to.meta.transitionName === 'zoom') {
        this.transitionMode = 'in-out'
        this.transitionEnterActiveClass = 'zoom-enter-active'
        // disable scolling in background
        document.body.style.overflow = 'hidden'
      }
      // if transition is zoom from a page
      if (from.meta.transitionName === 'zoom') {
        this.transitionMode = null
        this.transitionEnterActiveClass = null
        // Enable scrolling in background
        document.body.style.overflow = null
      }
      // assign transition name and call next
      this.transitionName = transitionName
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

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
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

.zoom-enter-active,
.zoom-leave-active {
  animation-duration: 0.5s;
  animation-fill-mode: both;
  animation-name: zoom;
}

.zoom-leave-active {
  animation-direction: reverse;
}

@keyframes zoom {
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  100% {
    opacity: 1;
  }
}
</style>
