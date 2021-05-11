<template>
  <div>
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
    ...mapState({restaurants: state => state.restaurants.records}),
  },
};
</script>
