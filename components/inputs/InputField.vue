<template>
  <div class="relative w-full flex flex-col items-start mb-md">
      <label v-if="label">{{ label }}</label>
      <input
          :type="type"
          :value="value"
          :placeholder="placeholder"
          autocomplete="off"
          @change="$emit('input', $event.target.value)"
          @keyup="$emit('show-suggests', $event.target.value)"
          name="name"
          :style="{ 'background': bgColor }"
      >
<!--    <span v-show="type === 'password'" id="email-error" @mouseover="type = 'text'" @mouseout="type = 'password'">-->
<!--      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">-->
<!--        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />-->
<!--        <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />-->
<!--      </svg>-->
<!--    </span>-->
  </div>
</template>
<script>
export default {
  name: "InputField",
  props: ['type', 'error', 'label', 'placeholder', 'value', 'bgColor'],
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
  background: rgba(216, 205, 188, 0.2);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 24px;

  &:focus {
    outline: none;
  }
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

//span {
//  position: absolute;
//  right: 24px;
//  bottom: 20px;
//  opacity: 0.5;
//}
</style>
