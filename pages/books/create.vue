<template>
  <div>
    <Toolbar
      :list-href="`/${$options.servicePrefix}`"
      :handle-submit="onSendForm"
      :handle-reset="resetForm"
    >
      <template #left>
        <h1>Create Book</h1>
      </template>
    </Toolbar>
    <BookForm ref="createForm" :values="item" :errors="violations" />
    <Loading :visible="isLoading" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { createHelpers } from 'vuex-map-fields'
import create from '../../mixins/create'

const servicePrefix = 'books'

const { mapFields } = createHelpers({
  getterType: 'book/getField',
  mutationType: 'book/updateField',
})

export default {
  servicePrefix,
  pathTemplate: `/${servicePrefix}/[id]`,
  mixins: [create],
  components: {
    Loading: () => import('../../components/Loading'),
    Toolbar: () => import('../../components/Toolbar'),
    BookForm: () => import('../../components/book/Form'),
  },
  data: () => ({
    item: {},
  }),
  computed: {
    ...mapFields(['error', 'isLoading', 'created', 'violations']),
  },
  methods: {
    ...mapActions('book', ['create', 'reset']),
  },
}
</script>
