<template>
  <div>
    <Toolbar
      :list-href="`/${$options.servicePrefix}`"
      :handle-submit="onSendForm"
      :handle-reset="resetForm"
    >
      <template #left>
        <h1>Create Author</h1>
      </template>
    </Toolbar>
    <AuthorForm ref="createForm" :values="item" :errors="violations" />
    <Loading :visible="isLoading" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { createHelpers } from 'vuex-map-fields'
import create from '../../mixins/create'

const servicePrefix = 'authors'

const { mapFields } = createHelpers({
  getterType: 'author/getField',
  mutationType: 'author/updateField',
})

export default {
  servicePrefix,
  pathTemplate: `/${servicePrefix}/[id]`,
  mixins: [create],
  components: {
    Loading: () => import('../../components/Loading'),
    Toolbar: () => import('../../components/Toolbar'),
    AuthorForm: () => import('../../components/author/Form'),
  },
  data: () => ({
    item: {},
  }),
  computed: {
    ...mapFields(['error', 'isLoading', 'created', 'violations']),
  },
  methods: {
    ...mapActions('author', ['create', 'reset']),
  },
}
</script>
