<template>
  <div>
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
      data-testid="loading-indicator"
    />

    <v-alert type="error" data-testid="loading-error" v-if="loadError">
      Restaurants could not be loaded.
    </v-alert>

    <v-list-item
      data-testid="restaurant"
      v-for="restaurant in restaurants"
      :key="restaurant.id"
    >
      <v-list-item-content>
        <v-list-item-title>
          {{ restaurant.name }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
export default {
  name: 'RestaurantList',
  mounted() {
    this.loadRestaurants();
  },
  methods: {
    ...mapActions({loadRestaurants: 'restaurants/load'}),
  },
  computed: {
    ...mapState({
      restaurants: state => state.restaurants.records,
      loading: state => state.restaurants.loading,
      loadError: state => state.restaurants.loadError,
    }),
  },
};
</script>
