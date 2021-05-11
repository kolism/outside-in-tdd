<template>
  <form @submit.prevent="handleSave">
    <v-alert
      type="error"
      data-testid="new-restaurant-name-error"
      v-if="validationError"
    >
      Name is required.
    </v-alert>
    <v-alert
      type="error"
      data-testid="new-restaurant-server-error"
      v-if="serverError"
    >
      The restaurant could not be saved. Please try again.
    </v-alert>
    <v-row>
      <v-col cols="9">
        <v-text-field
          placeholder="Add Restaurant"
          filled
          type="text"
          data-testid="new-restaurant-name-field"
          v-model="name"
        />
      </v-col>
      <v-col cols="3">
        <v-btn
          block
          type="submit"
          color="primary"
          class="black--text"
          data-testid="new-restaurant-submit-button"
        >
          Add
        </v-btn>
      </v-col>
    </v-row>
  </form>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: 'NewRestaurantForm',
  data() {
    return {
      name: '',
      validationError: false,
      serverError: false,
    };
  },
  methods: {
    ...mapActions({createRestaurant: 'restaurants/create'}),
    handleSave() {
      if (this.name) {
        this.validationError = false;
        this.serverError = false;
        this.createRestaurant(this.name)
          .then(() => {
            this.name = '';
          })
          .catch(() => {
            this.serverError = true;
          });
      } else {
        this.validationError = true;
      }
    },
  },
};
</script>