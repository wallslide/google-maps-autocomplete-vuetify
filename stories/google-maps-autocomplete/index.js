import { storiesOf } from "@storybook/vue";
import "vuetify/dist/vuetify.min.css";
import GoogleMapsAutocomplete from "@/components/google-maps-autocomplete-vuetify";

// Wrap stories in app so that they get the correct styles
const AppDecorator = () => {
  return {
    template: `<v-app><v-content fluid fill-height><v-layout 
    align-center 
    justify-center> <v-flex xs11><story/></v-flex></v-layout></v-content></v-app>`
  };
};

storiesOf("Google Maps Autocomplete", module)
  .addDecorator(AppDecorator)
  .add("Default", () => {
    return {
      components: { GoogleMapsAutocomplete },
      template: `<GoogleMapsAutocomplete :restrictToCountries="['jp']"/>`
    };
  });
