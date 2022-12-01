<!-- TODO : Use this for create / update !! -->
<template>
  <div>
    <Toolbar
      :edit-href="editPath"
      :list-href="`/${$options.servicePrefix}`"
      :handle-delete="del"
    >
      <template #left>
        <h1 v-if="item">Show Author {{ item['@id'] }}</h1>
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
            <th scope="row">name</th>
            <td>
              {{ item['name'] }}
            </td>
          </tr>
          <tr>
            <th scope="row">title</th>
            <td>
              {{ item['title'] }}
            </td>
          </tr>
          <tr>
            <th scope="row">birthday</th>
            <td>
              {{ item['birthday'] }}
            </td>
          </tr>
          <tr>
            <th scope="row">bio</th>
            <td>
              {{ item['bio'] }}
            </td>
          </tr>
          <tr>
            <th scope="row">active</th>
            <td>
              {{ item['active'] }}
            </td>
          </tr>
          <tr>
            <th scope="row">books</th>
            <td>
              {{ item['books'] }}
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

const servicePrefix = 'authors'

export default {
  name: 'authors',
  servicePrefix,
  mixins: [show],
  components: {
    Loading: () => import('../../../components/Loading'),
    Toolbar: () => import('../../../components/Toolbar'),
  },

  computed: {
    ...mapFields('author', {
      deleteLoading: 'isLoading',
      isLoading: 'isLoading',
      error: 'error',
      deleted: 'deleted',
    }),
    ...mapGetters('author', ['find']),
    editPath() {
      return this.item ? getPath(this.item['@id'], '/authors/[id]/edit') : ''
    },
  },

  methods: {
    ...mapActions('author', {
      deleteItem: 'del',
      delReset: 'resetDelete',
      retrieve: 'load',
    }),
  },
}
</script>
