<template>
  <v-form>
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.name"
            :error-messages="nameErrors"
            label="name"
            @input="$v.item.name.$touch()"
            @blur="$v.item.name.$touch()"
          />
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.title"
            :error-messages="titleErrors"
            label="title"
            @input="$v.item.title.$touch()"
            @blur="$v.item.title.$touch()"
          />
        </v-col>
      </v-row>

      <v-row>
        <!-- todo : fix the dateTime format, not supported by default on vuetify -->
        <v-col cols="12" sm="6" md="6">
          <InputDate
            v-model="item.birthday"
            label="birthday"
            :error-messages="birthdayErrors"
          />
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.bio"
            :error-messages="bioErrors"
            label="bio"
            @input="$v.item.bio.$touch()"
            @blur="$v.item.bio.$touch()"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-checkbox
            v-model="item.active"
            :error-messages="activeErrors"
            label="active"
            @input="$v.item.active.$touch()"
            @blur="$v.item.active.$touch()"
          />
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.books"
            :error-messages="booksErrors"
            label="books"
            @input="$v.item.books.$touch()"
            @blur="$v.item.books.$touch()"
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
import InputDate from '../InputDate'
import { date } from '../../validators/date'

export default {
  name: 'AuthorForm',
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
    name: null,
    title: null,
    birthday: null,
    bio: null,
    active: null,
    books: null,
  }),
  computed: {
    // eslint-disable-next-line
    item() {
      return this.initialValues || this.values
    },

    nameErrors() {
      const errors = []

      if (!this.$v.item.name.$dirty) return errors

      has(this.violations, 'name') && errors.push(this.violations.name)

      return errors
    },
    titleErrors() {
      const errors = []

      if (!this.$v.item.title.$dirty) return errors

      has(this.violations, 'title') && errors.push(this.violations.title)

      return errors
    },
    birthdayErrors() {
      const errors = []

      if (!this.$v.item.birthday.$dirty) return errors

      has(this.violations, 'birthday') && errors.push(this.violations.birthday)

      return errors
    },
    bioErrors() {
      const errors = []

      if (!this.$v.item.bio.$dirty) return errors

      has(this.violations, 'bio') && errors.push(this.violations.bio)

      return errors
    },
    activeErrors() {
      const errors = []

      if (!this.$v.item.active.$dirty) return errors

      has(this.violations, 'active') && errors.push(this.violations.active)

      return errors
    },
    booksErrors() {
      const errors = []

      if (!this.$v.item.books.$dirty) return errors

      has(this.violations, 'books') && errors.push(this.violations.books)

      return errors
    },

    violations() {
      return this.errors || {}
    },
  },
  methods: {},
  validations: {
    item: {
      name: {},
      title: {},
      birthday: {
        date,
      },
      bio: {},
      active: {},
      books: {},
    },
  },
}
</script>
