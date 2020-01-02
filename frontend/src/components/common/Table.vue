<template>
  <div class="table-container">
    <table class="table">
      <thead>
        <tr>
          <slot name="table-head">
          </slot>
        </tr>
      </thead>
      <tbody>
        <slot name="table-body">
        </slot>
      </tbody>
      <tfoot>
        <tr>
          <slot name="table-foot">
          </slot>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Table'
}
</script>
