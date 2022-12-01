<template>
  <div class="author-list">
    <Toolbar>
      <template #left>
        <h1>Author List</h1>
      </template>
    </Toolbar>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg12>
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="items"
            :items-per-page.sync="options.itemsPerPage"
            :loading="isLoading"
            loading-text="Loading..."
            :options.sync="options"
            :server-items-length="totalItems"
            class="elevation-1"
            item-key="@id"
            show-select
            @update:options="onUpdateOptions"
            :footer-props="{
              showFirstLastPage: true,
            }"
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>Author</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn
                  color="primary"
                  dark
                  class="ml-2"
                  :href="`/${$options.servicePrefix}/create`"
                >
                  Create
                </v-btn>
              </v-toolbar>
            </template>

            <template slot="item.@id" slot-scope="{ item }">
              <nuxt-link :to="getPath(item['@id'], '/authors/[id]')">
                {{ item['@id'] }}
              </nuxt-link>
            </template>
            <template slot="item.birthday" slot-scope="{ item }">
              {{ formatDateTime(item['birthday'], 'long') }}
            </template>
            <template slot="item.books" slot-scope="{ item }">
              <ul>
                <li v-for="_item in item['books']" :key="_item['@id']">
                  <nuxt-link :to="getPath(_item['@id'], '/books/[id]')">
                    {{ _item['@id'] }}
                  </nuxt-link>
                </li>
              </ul>
            </template>
            <template slot="item.created" slot-scope="{ item }">
              {{ formatDateTime(item['created'], 'long') }}
            </template>
            <template slot="item.modified" slot-scope="{ item }">
              {{ formatDateTime(item['modified'], 'long') }}
            </template>

            <ActionCell
              slot="item.action"
              slot-scope="props"
              :show-href="getPath(props.item['@id'], '/authors/[id]')"
              :edit-href="getPath(props.item['@id'], '/authors/[id]/edit')"
              :handle-delete="() => deleteHandler(props.item)"
            ></ActionCell>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import list from '../../mixins/list'
import { getPath } from '../../utils/fetch'

export default {
  servicePrefix: 'authors',
  mixins: [list],
  components: {
    Toolbar: () => import('../../components/Toolbar'),
    ActionCell: () => import('../../components/ActionCell'),
    AuthorFilterForm: () => import('../../components/author/Filter'),
    DataFilter: () => import('../../components/DataFilter'),
  },
  data: () => ({
    headers: [
      { text: 'id', value: '@id' },
      { text: 'name', value: 'name' },
      { text: 'title', value: 'title' },
      { text: 'birthday', value: 'birthday' },
      { text: 'bio', value: 'bio' },
      { text: 'active', value: 'active' },
      { text: 'books', value: 'books' },
      { text: 'created', value: 'created' },
      { text: 'modified', value: 'modified' },
      {
        text: 'Actions',
        value: 'action',
        sortable: false,
      },
    ],
    selected: [],
  }),
  computed: {
    ...mapGetters('author', {
      items: 'list',
    }),
    ...mapFields('author', {
      deletedItem: 'deleted',
      error: 'error',
      isLoading: 'isLoading',
      resetList: 'resetList',
      totalItems: 'totalItems',
      view: 'view',
    }),
  },
  methods: {
    ...mapActions('author', {
      fetchAll: 'fetchAll',
      deleteItem: 'del',
    }),
    getPath,
  },
}
</script>
