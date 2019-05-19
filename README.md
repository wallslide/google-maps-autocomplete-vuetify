# @nagoos/google-maps-autocomplete-vuetify

A component to allow users to lookup places, and see their selected place on a map. Uses the google maps places API, Vuetify, and vue2-google-maps.

See [working demo](https://codesandbox.io/s/nagoosgooglemapsautocompletevuetify-example-r2o5h?fontsize=14)

## Installation

`yarn add @nagoos/google-maps-autocomplete-vuetify`

## Setup

This component requires two main libraries to work: [Vuetify](https://vuetifyjs.com/), and [vue2-google-maps](https://github.com/xkjyeah/vue-google-maps)

This component won't work until you setup the `vue2-google-maps` library with your google maps api key:

```javascript
import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "<your google api key>",
    libraries: "places"
  }
});
```

## Usage

1. Import the library into your component:

```javascript
import GoogleMapsAutocomplete from "@nagoos/google-maps-autocomplete-vuetify";
```

2. Add to your VueJS component's `components` section:

```javascript
components: {
    GoogleMapsAutocomplete,
    ...
},
```

3. Use in your component's template:

```javascript
<GoogleMapsAutocomplete
    v-model="address"
    :restrict-to-countries="['jp']"
    @initialized="mapsLoaded = true"
    class="ma-1"
    placeholder="Enter a business name"
/>
```

## API

### v-model

When a user selects a place, the v-model is updated with a json object representing the selected place.

Example:

```json
{
  "name": "WAGYUMAFIA THE BUTCHER’S KITCHEN",
  "address": "WAGYUMAFIA THE BUTCHER’S KITCHEN, 1 Chome-14-16 Nishiazabu, Minato City, Tokyo, Japan",
  "placeId": "ChIJz55I6XqLGGARpI3NfnSQINk",
  "location": {
    "lat": 35.6611479,
    "lng": 139.72333349999997
  }
}
```
