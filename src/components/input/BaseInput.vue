<template>
    <div class="base-input">
        <label :for="label" v-if="label">
            <slot name="label">
                {{ label }}
            </slot>
        </label>

        <input :type="type" v-model="modelValue">
    </div>
</template>

<script>
export default {
    name:  "BaseInput",
    props: {
        label:      {
            type:     String,
            required: false,
        },
        type:       {
            type:     String,
            required: false,
            default:  'text',
        },
        modelValue: {
            required: false,
        },
    },
};
</script>

<style scoped>

</style>
