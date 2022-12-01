<!-- TODO : Use this for create / update !! -->
<template>
  <div>
    <Toolbar
      :edit-href="editPath"
      :list-href="`/${$options.servicePrefix}`"
      :handle-delete="del"
    >
      <template #left>
        <h1 v-if="item">Show Book {{ item['@id'] }}</h1>
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
            <th scope="row">title</th>
            <td>
              {{ item['title'] }}
            </td>
          </tr>
          <tr>
            <th scope="row">description</th>
            <td>
              {{ item['description'] }}
            </td>
          </tr>
          <tr>
            <th scope="row">isPublished</th>
            <td>
              {{ item['isPublished'] }}
            </td>
          </tr>
          <tr>
            <th scope="row">price</th>
            <td>
              {{ item['price'] }}
            </td>
          </tr>
          <tr>
            <th scope="row">author</th>
            <td>
              {{ item['author'] }}
            </td>
          </tr>
          <tr>
            <th scope="row">publishDate</th>
            <td>
              {{ item['publishDate'] }}
            </td>
          </tr>
          <tr>
            <th scope="row">reviews</th>
            <td>
              {{ item['reviews'] }}
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

const servicePrefix = 'books'

export default {
  name: 'books',
  servicePrefix,
  mixins: [show],
  components: {
    Loading: () => import('../../../components/Loading'),
    Toolbar: () => import('../../../components/Toolbar'),
  },

  computed: {
    ...mapFields('book', {
      deleteLoading: 'isLoading',
      isLoading: 'isLoading',
      error: 'error',
      deleted: 'deleted',
    }),
    ...mapGetters('book', ['find']),
    editPath() {
      return this.item ? getPath(this.item['@id'], '/books/[id]/edit') : ''
    },
  },

  methods: {
    ...mapActions('book', {
      deleteItem: 'del',
      delReset: 'resetDelete',
      retrieve: 'load',
    }),
  },
}
</script>
