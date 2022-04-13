<template>
  <div class="relative w-full flex flex-col items-start mb-md">
      <label v-if="label">{{ label }}</label>
      <input
          :type="type"
          :value="value"
          :placeholder="placeholder"
          autocomplete="off"
          @key.up="$emit('keyup', $event.target.value)"
          name="name">
    <p v-if="error" class="mt-2 text-sm text-red-600" id="email-error">{{ error }}</p>
  </div>
</template>
<script>
export default {
  name: "InputField",
  props: ['type', 'error', 'label', 'placeholder', 'value'],
  data() {
    return {
    }
  }
}
</script>

<style scoped lang="scss">

input {
  min-height: 60px !important;
  height: 60px;
  background: #F6F8FA;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 24px;
}

label {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.01em;
  color: #1B1A1A;
  opacity: 0.4;
  margin-bottom: 10px;
}

::placeholder {
  color: #b1b1b1;
}
</style>
