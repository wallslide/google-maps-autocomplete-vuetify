<template>
  <v-card class="ma-1">
    <v-layout column>
      <MapsAutocomplete
        v-model="address"
        :restrict-to-countries="['jp']"
        @initialized="mapsLoaded = true"
        class="ma-1"
        placeholder="Enter a business name"
      />
      <GmapMap
        v-if="mapsLoaded"
        :center="center"
        :options="{streetViewControl: false, mapTypeControl: false}"
        :zoom="16"
        style="width: 100%; height: 400px"
      >
        <GmapMarker v-if="address" :position="center"/>
        <v-flex xs12/>
      </GmapMap>
    </v-layout>
  </v-card>
</template>

<script>
import MapsAutocomplete from "@/components/google-maps-autocomplete-vuetify";
export default {
  components: {
    MapsAutocomplete
  },
  data() {
    return {
      defaultCenter: {
        lat: 35.6895,
        lng: 139.6917
      },
      mapsLoaded: false,
      address: null
    };
  },
  computed: {
    center() {
      if (this.address && this.address.location) {
        return this.address.location;
      } else {
        return this.defaultCenter;
      }
    }
  }
};
</script>
