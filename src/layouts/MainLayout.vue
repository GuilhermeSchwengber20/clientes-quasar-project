<template>
    <q-layout view="lHh Lpr lFf" class="bg-grey-1">
        <q-header bordered class="bg-white text-dark">
            <q-toolbar>
                <q-btn flat round dense icon="menu" class="lt-md" @click="drawer = !drawer" />
                <q-avatar size="32px" color="primary" text-color="white" icon="hub" class="q-mr-sm" />
                <q-toolbar-title class="text-weight-bold">Meu App</q-toolbar-title>

                <q-btn flat round dense icon="notifications_none" />
                <q-btn flat round dense>
                    <q-avatar size="30px" color="primary" text-color="white">A</q-avatar>
                    <q-menu>
                        <q-list style="min-width: 160px">
                            <q-item clickable v-close-popup>
                                <q-item-section>Perfil</q-item-section>
                            </q-item>
                            <q-separator />
                            <q-item clickable v-close-popup>
                                <q-item-section>Sair</q-item-section>
                            </q-item>
                        </q-list>
                    </q-menu>
                </q-btn>
            </q-toolbar>
        </q-header>

        <q-drawer v-model="drawer" show-if-above bordered :width="240" class="bg-white">
            <q-list padding class="q-px-sm">
                <q-item-label header class="text-uppercase text-caption">Menu</q-item-label>

                <q-item v-for="item in menu" :key="item.to" :to="item.to" clickable v-ripple
                    active-class="bg-indigo-1 text-primary text-weight-medium" class="rounded-borders q-mb-xs">
                    <q-item-section avatar>
                        <q-icon :name="item.icon" />
                    </q-item-section>
                    <q-item-section>{{ item.label }}</q-item-section>
                </q-item>
            </q-list>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(false)

const menu = [
    { label: 'Clientes', icon: 'group', to: '/clientes' }
    // Adicione novas rotas aqui
]
</script>