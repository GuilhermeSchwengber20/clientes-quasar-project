<template>
    <div class="row items-center justify-between q-mb-lg q-col-gutter-md">
        <div class="col-12 col-sm">
            <div class="text-h5 text-weight-bold">{{ title }}</div>
            <div v-if="subtitle" class="text-body2 text-grey-7 q-mt-xs">{{ subtitle }}</div>
        </div>
        <div class="col-12 col-sm-auto">
            <slot name="actions" />
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: { type: String, required: true },
    subtitle: { type: String, default: '' }
})
</script>