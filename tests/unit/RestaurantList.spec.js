import Vuex from 'vuex';
import Vue from 'vue';
import Vuetify from 'vuetify';
import {mount, createLocalVue} from '@vue/test-utils';
import RestaurantList from '@/components/RestaurantList';

describe('RestaurantList', () => {
  Vue.use(Vuetify);
  const records = [
    {id: 1, name: 'Sushi Place'},
    {id: 2, name: 'Pizza Place'},
  ];
  const vuetify = new Vuetify();
  const localVue = createLocalVue();
  localVue.use(Vuex);

  let restaurantsModule;
  let wrapper;

  const mountWithStore = (state = {records, loading: false}) => {
    restaurantsModule = {
      namespaced: true,
      state,
      actions: {
        load: jest.fn().mockName('load'),
      },
    };

    const store = new Vuex.Store({
      modules: {
        restaurants: restaurantsModule,
      },
    });

    wrapper = mount(RestaurantList, {localVue, store, vuetify});
  };

  describe('when loading fails', () => {
    beforeEach(() => {
      mountWithStore({loadError: true});
    });

    it('displays the error message', () => {
      expect(wrapper.find('[data-testid="loading-error"]').exists()).toBe(true);
    });
  });

  it('loads restaurants on mount', () => {
    mountWithStore();
    expect(restaurantsModule.actions.load).toHaveBeenCalled();
  });

  it('displays the loading indicator while loading', () => {
    mountWithStore({loading: true});
    expect(wrapper.find('[data-testid="loading-indicator"]').exists()).toBe(
      true,
    );
  });

  describe('when loading succeeds', () => {
    beforeEach(() => {
      mountWithStore();
    });
    it('does not display the loading indicator while not loading', () => {
      expect(wrapper.find('[data-testid="loading-indicator"]').exists()).toBe(
        false,
      );
    });
    it('does not display the error message', () => {
      expect(wrapper.find('[data-testid="loading-error"]').exists()).toBe(
        false,
      );
    });
    it('displays the restaurants', () => {
      const findByTestId = (wrapper, testId, index) =>
        wrapper.findAll(`[data-testid="${testId}"]`).at(index);
      expect(findByTestId(wrapper, 'restaurant', 0).text()).toBe('Sushi Place');
      expect(findByTestId(wrapper, 'restaurant', 1).text()).toBe('Pizza Place');
    });
  });
});
