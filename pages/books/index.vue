<template>
  <div class="book-list">
    <Toolbar>
      <template #left>
        <h1>Book List</h1>
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
                <v-toolbar-title>Book</v-toolbar-title>

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
              <nuxt-link :to="getPath(item['@id'], '/books/[id]')">
                {{ item['@id'] }}
              </nuxt-link>
            </template>
            <template slot="item.author" slot-scope="{ item }">
              <nuxt-link :to="getPath(item['author']['@id'], '/authors/[id]')">
                {{ item['author']['@id'] }}
              </nuxt-link>
            </template>
            <template slot="item.publishDate" slot-scope="{ item }">
              {{ formatDateTime(item['publishDate'], 'long') }}
            </template>
            <template slot="item.reviews" slot-scope="{ item }">
              <ul>
                <li v-for="_item in item['reviews']" :key="_item['@id']">
                  <nuxt-link :to="getPath(_item['@id'], '/reviews/[id]')">
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
              :show-href="getPath(props.item['@id'], '/books/[id]')"
              :edit-href="getPath(props.item['@id'], '/books/[id]/edit')"
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
  servicePrefix: 'books',
  mixins: [list],
  components: {
    Toolbar: () => import('../../components/Toolbar'),
    ActionCell: () => import('../../components/ActionCell'),
    BookFilterForm: () => import('../../components/book/Filter'),
    DataFilter: () => import('../../components/DataFilter'),
  },
  data: () => ({
    headers: [
      { text: 'id', value: '@id' },
      { text: 'title', value: 'title' },
      { text: 'description', value: 'description' },
      { text: 'isPublished', value: 'isPublished' },
      { text: 'price', value: 'price' },
      { text: 'author', value: 'author' },
      { text: 'publishDate', value: 'publishDate' },
      { text: 'reviews', value: 'reviews' },
      { text: 'averageRating', value: 'averageRating' },
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
    ...mapGetters('book', {
      items: 'list',
    }),
    ...mapFields('book', {
      deletedItem: 'deleted',
      error: 'error',
      isLoading: 'isLoading',
      resetList: 'resetList',
      totalItems: 'totalItems',
      view: 'view',
    }),
  },
  methods: {
    ...mapActions('book', {
      fetchAll: 'fetchAll',
      deleteItem: 'del',
    }),
    getPath,
  },
}
</script>
