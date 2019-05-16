<template>
  <v-layout column>
    <v-card>
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
        </GmapMap>
      </v-layout>
    </v-card>
    <v-card dark v-if="address">
      <VueJsonPretty :data="address"></VueJsonPretty>
    </v-card>
  </v-layout>
</template>

<script>
import MapsAutocomplete from "@/components/google-maps-autocomplete-vuetify";
import VueJsonPretty from "vue-json-pretty";
export default {
  components: {
    MapsAutocomplete,
    VueJsonPretty
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
