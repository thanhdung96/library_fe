<template>
  <v-form>
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.reviewerName"
            :error-messages="reviewerNameErrors"
            label="reviewerName"
            @input="$v.item.reviewerName.$touch()"
            @blur="$v.item.reviewerName.$touch()"
          />
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.comment"
            :error-messages="commentErrors"
            label="comment"
            @input="$v.item.comment.$touch()"
            @blur="$v.item.comment.$touch()"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model.number="item.rating"
            :error-messages="ratingErrors"
            label="rating"
            @input="$v.item.rating.$touch()"
            @blur="$v.item.rating.$touch()"
          />
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.book"
            :error-messages="bookErrors"
            label="book"
            @input="$v.item.book.$touch()"
            @blur="$v.item.book.$touch()"
          />
        </v-col>
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

export default {
  name: 'ReviewForm',
  mixins: [validationMixin],
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
    reviewerName: null,
    comment: null,
    rating: null,
    book: null,
  }),
  computed: {
    // eslint-disable-next-line
    item() {
      return this.initialValues || this.values
    },

    reviewerNameErrors() {
      const errors = []

      if (!this.$v.item.reviewerName.$dirty) return errors

      has(this.violations, 'reviewerName') &&
        errors.push(this.violations.reviewerName)

      return errors
    },
    commentErrors() {
      const errors = []

      if (!this.$v.item.comment.$dirty) return errors

      has(this.violations, 'comment') && errors.push(this.violations.comment)

      return errors
    },
    ratingErrors() {
      const errors = []

      if (!this.$v.item.rating.$dirty) return errors

      has(this.violations, 'rating') && errors.push(this.violations.rating)

      return errors
    },
    bookErrors() {
      const errors = []

      if (!this.$v.item.book.$dirty) return errors

      has(this.violations, 'book') && errors.push(this.violations.book)

      return errors
    },

    violations() {
      return this.errors || {}
    },
  },
  methods: {},
  validations: {
    item: {
      reviewerName: {},
      comment: {},
      rating: {},
      book: {},
    },
  },
}
</script>
