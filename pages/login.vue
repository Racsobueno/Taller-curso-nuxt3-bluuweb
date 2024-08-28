<script lang="ts" setup>
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';

const {login} = useFirebaseAuth()

const toast = useToast()

const schema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Must be at least 6 characters')
})

type Schema = z.output<typeof schema>

const state = reactive({
    email: undefined,
    password: undefined
})

async function onSubmit (event: FormSubmitEvent<Schema>) {
    try {
        await login(event.data.email, event.data.password);
        toast.add({title:'Redirigiendo a admin...', timeout:2000, 
        callback: async() => {
            await navigateTo('/admin')
        }})
    } catch (error) {
        console.log(error);
    }
}
</script>


<template>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" type="password" />
        </UFormGroup>

        <UButton type="submit" class="bg-white">
        Login
        </UButton>
    </UForm>
</template>