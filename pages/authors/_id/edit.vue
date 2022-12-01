<!-- TODO : Use this for create / update !! -->
<template>
  <div>
    <Toolbar
      :list-href="`/${$options.servicePrefix}`"
      :handle-submit="onSendForm"
      :handle-reset="resetForm"
      :handle-delete="del"
    >
      <template #left>
        <h1 v-if="item">Edit Author {{ item['@id'] }}</h1>
      </template>
    </Toolbar>
    <AuthorForm
      ref="updateForm"
      v-if="item"
      :values="item"
      :errors="violations"
    />
    <Loading :visible="deleteLoading" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import update from '../../../mixins/update'

const servicePrefix = 'authors'

export default {
  name: 'authors',
  servicePrefix,
  mixins: [update],
  components: {
    Loading: () => import('../../../components/Loading'),
    Toolbar: () => import('../../../components/Toolbar'),
    AuthorForm: () => import('../../../components/author/Form.vue'),
  },

  computed: {
    ...mapFields('author', {
      deleteLoading: 'isLoading',
      isLoading: 'isLoading',
      error: 'error',
      updated: 'updated',
      deleted: 'deleted',
      violations: 'violations',
    }),
    ...mapGetters('author', ['find']),
  },

  methods: {
    ...mapActions('author', {
      createReset: 'resetCreate',
      deleteItem: 'del',
      delReset: 'resetDelete',
      retrieve: 'load',
      update: 'update',
      updateReset: 'resetUpdate',
    }),
  },
}
</script>
