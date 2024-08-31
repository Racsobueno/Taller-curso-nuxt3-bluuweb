<script setup lang="ts">
import type { People } from '~/interfaces/people.type';
  const {getPeople , peoples, deletePeople } = usePeopleFireStore();
  await getPeople();

  const columns = [{
  key: 'name',
  label: 'Name'
  }, {
    key: 'title',
    label: 'Title'
  }, {
    key: 'email',
    label: 'Email'
  }, {
    key: 'role',
    label: 'Role'
  }, {
    key: 'actions',
    label: 'Actions'
  }]


  const items = (row: People) => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => console.log('Edit', row.id)
  }],[{
    label: 'Remove',
    icon: 'i-heroicons-trash-20-solid',
    click: async() => await deletePeople(row.id)
  }]
]
</script>

<template>
    <PeopleForm/>

    <UTable :rows="peoples" :columns="columns">
      <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
    </UTable>
</template>

