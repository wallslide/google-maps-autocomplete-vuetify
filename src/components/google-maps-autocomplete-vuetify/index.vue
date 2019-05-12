<template>
  <v-autocomplete
    :value="value"
    :items="virtualItems"
    :search-input.sync="search"
    :disabled="!readyForSearch"
    :loading="isLoading"
    :hide-no-data="isLoading || !search"
    clearable
    item-text="name"
    item-value="placeId"
    return-object
    placeholder="店舗名で検索してください"
    data-vv-name="business-name-search"
    @input="onSelected"
  >
    <template slot="no-data">
      <v-list-tile>
        <v-list-tile-title>
          見つかりませんでした。
        </v-list-tile-title>
      </v-list-tile>
    </template>
  
    <template
      slot="item"
      slot-scope="{ item }"
    >
      <v-list-tile-avatar>
        <v-icon>place</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title v-text="item.name"/>
        <v-list-tile-sub-title v-text="item.address"/>
      </v-list-tile-content>
    </template>
  </v-autocomplete>
</template>

<script>
import debouncePromise from 'debounce-promise'

export default {
  props: {
    value: {
      type: Object,
      default: null
    },
    restrictToCountries: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isLoading: false,
      items: [],
      lastItemUpdate: 0,
      search: null,
      autocomplete: null,
      geocoder: null
    }
  },
  computed: {
    readyForSearch() {
      return !!this.autocomplete && !!this.geocoder
    },
    // If we saved the value but not the items, ensure that we spoof an items array
    // with at least the value so that the component still works
    virtualItems() {
      if (this.items.length === 0 && this.value) {
        return [this.value]
      } else {
        return this.items
      }
    }
  },
  watch: {
    search(text) {
      if (text) {
        this.isLoading = true
        this.searchPlaces(text).then(({ predictions, status }) => {
          const autocompleteError =
            status != google.maps.places.PlacesServiceStatus.OK

          if (!autocompleteError) {
            this.items = predictions.map(p => ({
              name: p.structured_formatting.main_text,
              address: p.description,
              placeId: p.place_id
            }))
          }
          this.isLoading = false
        })
      }
    }
    // Resolve lat and lng of selected place's location, and update selected place with that
    // information
  },
  created() {
    this.$gmapApiPromiseLazy().then(() => {
      this.geocoder = new window.google.maps.Geocoder()
      this.autocomplete = new window.google.maps.places.AutocompleteService()
    })
  },
  methods: {
    searchPlaces: debouncePromise(function(text) {
      return new Promise(resolve => {
        this.autocomplete.getPlacePredictions(
          {
            input: text,
            componentRestrictions: { country: this.restrictToCountries }
          },
          (predictions, status) => {
            resolve({ predictions, status })
          }
        )
      })
    }, 500),
    // When selected, get the lat/lng info and merge with original selection
    onSelected(selectedItem) {
      if (!!selectedItem) {
        const { placeId } = selectedItem
        this.geocoder.geocode({ placeId }, ([{ geometry: { location } }]) => {
          this.$emit(
            'input',
            Object.assign({}, selectedItem, {
              location: {
                lat: location.lat(),
                lng: location.lng()
              }
            })
          )
        })
      }
    }
  }
}
</script>
