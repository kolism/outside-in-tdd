<template>
  <div>
    <transition
      mode="out-in"
      @before-enter="beforeEnter"
      @enter="enter"
      @before-leave="beforeLeave"
      @leave="leave"
      :css="false"
    >
      <h1>Restaurants</h1>
    </transition>
    <RestaurantList />
  </div>
</template>

<script>
import RestaurantList from './RestaurantList.vue';
export default {
  components: {RestaurantList},
  name: 'RestaurantScreen',
};
</script>