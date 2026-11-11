<template>
    <slot v-if="status === 'loading'" name="loading">
        <q-card flat bordered class="q-pa-md">
            <q-skeleton type="text" width="30%" class="q-mb-md" />
            <div v-for="n in 5" :key="n" class="row q-col-gutter-md q-mb-sm">
                <div class="col-3"><q-skeleton type="text" /></div>
                <div class="col-3"><q-skeleton type="text" /></div>
                <div class="col-4"><q-skeleton type="text" /></div>
                <div class="col-2"><q-skeleton type="text" /></div>
            </div>
        </q-card>
    </slot>

    <slot v-else-if="status === 'error'" name="error" :message="errorMessage">
        <q-card flat bordered class="q-pa-xl text-center">
            <q-icon name="cloud_off" size="56px" color="negative" />
            <div class="text-h6 q-mt-md">Algo deu errado</div>
            <div class="text-body2 text-grey-7 q-mb-lg">{{ errorMessage }}</div>
            <q-btn unelevated no-caps color="primary" icon="refresh" label="Tentar novamente" @click="$emit('retry')" />
        </q-card>
    </slot>

    <slot v-else />
</template>

<script setup>
defineProps({
    status: {
        type: String,
        required: true,
        validator: (v) => ['loading', 'error', 'success'].includes(v)
    },
    errorMessage: { type: String, default: 'Não foi possível carregar os dados.' }
})

defineEmits(['retry'])
</script>