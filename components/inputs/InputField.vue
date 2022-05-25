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
        <span class="text-xs text-gray-400 mt-2" v-show="hintText">{{ hintText }}</span>
    </div>
</template>
<script>
export default {
    name: "InputField",
    props: ['type', 'error', 'label', 'placeholder', 'value', 'bgColor', 'hintText'],
    data() {
        return {}
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

input:focus::placeholder {
    color: transparent;
}
</style>
