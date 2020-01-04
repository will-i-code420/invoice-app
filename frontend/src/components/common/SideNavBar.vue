<template>
  <div class="side-nav-bar-container" :class="{'show': showSideNav}">
    <div class="side-nav-control">
      <font-awesome-icon class="icon" :icon="['fas', 'angle-double-right']" @click="showNav"/>
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
  name: 'SideNavBar',
  data() {
    return {
      showSideNav: false,
      showLinks: false
    }
  },
  methods: {
    showNav() {
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
