<script setup lang="ts" >
definePageMeta({
    middleware: ["auth"]
})
const {logout, infoCurrentUser} = useFirebaseAuth()
</script>

<template>
    <div>
        <h1 class="mb-4">Admin (ruta protegida)</h1>
        <h2>uid: {{ infoCurrentUser?.uid }}</h2>
        <h2>email: {{ infoCurrentUser?.email }}</h2>
        <UButton @click="logout" class="mt-8">Salir</UButton>
    </div>
</template>