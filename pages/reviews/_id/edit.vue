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
        <h1 v-if="item">Edit Review {{ item['@id'] }}</h1>
      </template>
    </Toolbar>
    <ReviewForm
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

const servicePrefix = 'reviews'

export default {
  name: 'reviews',
  servicePrefix,
  mixins: [update],
  components: {
    Loading: () => import('../../../components/Loading'),
    Toolbar: () => import('../../../components/Toolbar'),
    ReviewForm: () => import('../../../components/review/Form.vue'),
  },

  computed: {
    ...mapFields('review', {
      deleteLoading: 'isLoading',
      isLoading: 'isLoading',
      error: 'error',
      updated: 'updated',
      deleted: 'deleted',
      violations: 'violations',
    }),
    ...mapGetters('review', ['find']),
  },

  methods: {
    ...mapActions('review', {
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
