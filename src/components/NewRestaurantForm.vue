<template>
  <form @submit.prevent="handleSave">
    <v-alert
      type="error"
      data-testid="new-restaurant-name-error"
      v-if="validationError"
    >
      Name is required.
    </v-alert>
    <v-text-field
      placeholder="Add Restaurant"
      filled
      type="text"
      data-testid="new-restaurant-name-field"
      v-model="name"
    />
    <v-btn
      type="submit"
      color="primary"
      class="black--text"
      data-testid="new-restaurant-submit-button"
    >
      Add
    </v-btn>
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
    };
  },
  methods: {
    ...mapActions({createRestaurant: 'restaurants/create'}),
    handleSave() {
      this.createRestaurant(this.name).then(() => {
        this.name = '';
      });
    },
  },
};
</script>