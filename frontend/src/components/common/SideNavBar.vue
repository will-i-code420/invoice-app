<template>
  <div class="side-nav-bar-container" :class="{'show': showSideNav}">
    <div class="side-nav-control">
      <fa-icon icon="['fas', 'angle-double-right']" />
    </div>
    <div class="side-nav-icons">
      <slot name="icons">
      </slot>
    </div>
    <div class="side-nav-links">
      <transition-group name="side-nav-fade">
        <slot name="links" v-if="showLinks">
        </slot>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'side-nav-bar',
  data() {
    return {
      showSideNav: false,
      showLinks: false
    }
  },
  methods: {
    showSideNav() {
      if (this.showLinks) {
        this.showLinks = false
        setTimeout(() => {
          this.showSideNav = false
        }, 500)
      } else {
        this.showSideNav = true
        setTimeout(() => {
          this.showLinks = true
        },500)
      }
    }
  }
}
</script>
