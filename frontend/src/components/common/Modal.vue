<template>
  <div class="modal-container">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
        </slot>
      </header>
      <section class="modal-body">
        <slot name="body">
        </slot>
      </section>
      <footer class="modal-footer">
        <slot name="footer">
        </slot>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal'
}
</script>
