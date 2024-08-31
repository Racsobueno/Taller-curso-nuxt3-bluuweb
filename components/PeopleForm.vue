<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const {postPeople} = usePeopleFireStore()

const roles = ['Admin', 'Member', 'Owner']

const schema = z.object({
    name: z.string().min(3,'Muy corto').max(50, 'Muy largo' ),
    title: z.string().min(3,'Muy corto').max(50, 'Muy largo' ),
    email: z.string().email('correo invalido'),
    role: z.enum(roles)
})

type Schema = z.output<typeof schema>

const state = reactive({
    email : "test@test.com",
    role : "Owner",
    name : "title test 1",
    title : "test 1",
})

async function onSubmit (event: FormSubmitEvent<Schema>) {
    await postPeople({
        name : event.data.name,
        title :event.data.title,
        email :event.data.email,
        role : event.data.role
    })


}
</script>

<template>
    <UForm :schema="schema" 
        :state="state" class="space-y-4" 
        @submit="onSubmit">

        <UFormGroup label="Name" name="name" class="mb-4">
            <UInput v-model="state.name" type="text" />
        </UFormGroup>

        <UFormGroup label="Title" name="title" class="mb-4">
            <UInput v-model="state.title" type="text" />
        </UFormGroup>

        <UFormGroup label="Email" name="email" class="mb-4">
            <UInput v-model="state.email" />
        </UFormGroup>

        <UFormGroup label="Role" name="role" class="mb-4">
            <USelect v-model="state.role" :options="roles" ></USelect>
        </UFormGroup>

        <UButton type="submit">
            Submit
        </UButton>
    </UForm>
</template>

