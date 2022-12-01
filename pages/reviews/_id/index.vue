<!-- TODO : Use this for create / update !! -->
<template>
  <div>
    <Toolbar
      :edit-href="editPath"
      :list-href="`/${$options.servicePrefix}`"
      :handle-delete="del"
    >
      <template #left>
        <h1 v-if="item">Show Review {{ item['@id'] }}</h1>
      </template>
    </Toolbar>
    <v-simple-table v-if="item">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Field</th>
            <th class="text-left">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">reviewerName</th>
            <td>
              {{ item['reviewerName'] }}
            </td>
          </tr>
          <tr>
            <th scope="row">comment</th>
            <td>
              {{ item['comment'] }}
            </td>
          </tr>
          <tr>
            <th scope="row">rating</th>
            <td>
              {{ item['rating'] }}
            </td>
          </tr>
          <tr>
            <th scope="row">book</th>
            <td>
              {{ item['book'] }}
            </td>
          </tr>
          <tr>
            <th scope="row">created</th>
            <td>
              {{ item['created'] }}
            </td>
          </tr>
          <tr>
            <th scope="row">modified</th>
            <td>
              {{ item['modified'] }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <Loading :visible="deleteLoading" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import show from '../../../mixins/show'
import { getPath } from '../../../utils/fetch'

const servicePrefix = 'reviews'

export default {
  name: 'reviews',
  servicePrefix,
  mixins: [show],
  components: {
    Loading: () => import('../../../components/Loading'),
    Toolbar: () => import('../../../components/Toolbar'),
  },

  computed: {
    ...mapFields('review', {
      deleteLoading: 'isLoading',
      isLoading: 'isLoading',
      error: 'error',
      deleted: 'deleted',
    }),
    ...mapGetters('review', ['find']),
    editPath() {
      return this.item ? getPath(this.item['@id'], '/reviews/[id]/edit') : ''
    },
  },

  methods: {
    ...mapActions('review', {
      deleteItem: 'del',
      delReset: 'resetDelete',
      retrieve: 'load',
    }),
  },
}
</script>
