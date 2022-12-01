<template>
  <v-form>
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.title"
            :error-messages="titleErrors"
            label="title"
            @input="$v.item.title.$touch()"
            @blur="$v.item.title.$touch()"
          />
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.description"
            :error-messages="descriptionErrors"
            label="description"
            @input="$v.item.description.$touch()"
            @blur="$v.item.description.$touch()"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-checkbox
            v-model="item.isPublished"
            :error-messages="isPublishedErrors"
            label="isPublished"
            @input="$v.item.isPublished.$touch()"
            @blur="$v.item.isPublished.$touch()"
          />
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model.number="item.price"
            :error-messages="priceErrors"
            label="price"
            step="0.1"
            @input="$v.item.price.$touch()"
            @blur="$v.item.price.$touch()"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.author"
            :error-messages="authorErrors"
            label="author"
            @input="$v.item.author.$touch()"
            @blur="$v.item.author.$touch()"
          />
        </v-col>

        <!-- todo : fix the dateTime format, not supported by default on vuetify -->
        <v-col cols="12" sm="6" md="6">
          <InputDate
            v-model="item.publishDate"
            label="publishDate"
            :error-messages="publishDateErrors"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.reviews"
            :error-messages="reviewsErrors"
            label="reviews"
            @input="$v.item.reviews.$touch()"
            @blur="$v.item.reviews.$touch()"
          />
        </v-col>

        <v-col cols="12"></v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import has from 'lodash/has'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import InputDate from '../InputDate'
import { date } from '../../validators/date'

export default {
  name: 'BookForm',
  mixins: [validationMixin],
  components: {
    InputDate,
  },
  props: {
    values: {
      type: Object,
      required: true,
    },

    errors: {
      type: Object,
      default: () => {},
    },

    initialValues: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {},
  data: () => ({
    title: null,
    description: null,
    isPublished: null,
    price: null,
    author: null,
    publishDate: null,
    reviews: null,
  }),
  computed: {
    // eslint-disable-next-line
    item() {
      return this.initialValues || this.values
    },

    titleErrors() {
      const errors = []

      if (!this.$v.item.title.$dirty) return errors

      has(this.violations, 'title') && errors.push(this.violations.title)

      return errors
    },
    descriptionErrors() {
      const errors = []

      if (!this.$v.item.description.$dirty) return errors

      has(this.violations, 'description') &&
        errors.push(this.violations.description)

      return errors
    },
    isPublishedErrors() {
      const errors = []

      if (!this.$v.item.isPublished.$dirty) return errors

      has(this.violations, 'isPublished') &&
        errors.push(this.violations.isPublished)

      return errors
    },
    priceErrors() {
      const errors = []

      if (!this.$v.item.price.$dirty) return errors

      has(this.violations, 'price') && errors.push(this.violations.price)

      return errors
    },
    authorErrors() {
      const errors = []

      if (!this.$v.item.author.$dirty) return errors

      has(this.violations, 'author') && errors.push(this.violations.author)

      return errors
    },
    publishDateErrors() {
      const errors = []

      if (!this.$v.item.publishDate.$dirty) return errors

      has(this.violations, 'publishDate') &&
        errors.push(this.violations.publishDate)

      return errors
    },
    reviewsErrors() {
      const errors = []

      if (!this.$v.item.reviews.$dirty) return errors

      has(this.violations, 'reviews') && errors.push(this.violations.reviews)

      return errors
    },

    violations() {
      return this.errors || {}
    },
  },
  methods: {},
  validations: {
    item: {
      title: {},
      description: {},
      isPublished: {},
      price: {},
      author: {},
      publishDate: {
        date,
      },
      reviews: {},
    },
  },
}
</script>
