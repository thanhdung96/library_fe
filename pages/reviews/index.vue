<template>
  <div class="review-list">
    <Toolbar>
      <template #left>
        <h1>Review List</h1>
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
                <v-toolbar-title>Review</v-toolbar-title>

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
              <nuxt-link :to="getPath(item['@id'], '/reviews/[id]')">
                {{ item['@id'] }}
              </nuxt-link>
            </template>
            <template slot="item.book" slot-scope="{ item }">
              <nuxt-link :to="getPath(item['book']['@id'], '/books/[id]')">
                {{ item['book']['@id'] }}
              </nuxt-link>
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
              :show-href="getPath(props.item['@id'], '/reviews/[id]')"
              :edit-href="getPath(props.item['@id'], '/reviews/[id]/edit')"
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
  servicePrefix: 'reviews',
  mixins: [list],
  components: {
    Toolbar: () => import('../../components/Toolbar'),
    ActionCell: () => import('../../components/ActionCell'),
    ReviewFilterForm: () => import('../../components/review/Filter'),
    DataFilter: () => import('../../components/DataFilter'),
  },
  data: () => ({
    headers: [
      { text: 'id', value: '@id' },
      { text: 'reviewerName', value: 'reviewerName' },
      { text: 'comment', value: 'comment' },
      { text: 'rating', value: 'rating' },
      { text: 'book', value: 'book' },
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
    ...mapGetters('review', {
      items: 'list',
    }),
    ...mapFields('review', {
      deletedItem: 'deleted',
      error: 'error',
      isLoading: 'isLoading',
      resetList: 'resetList',
      totalItems: 'totalItems',
      view: 'view',
    }),
  },
  methods: {
    ...mapActions('review', {
      fetchAll: 'fetchAll',
      deleteItem: 'del',
    }),
    getPath,
  },
}
</script>
