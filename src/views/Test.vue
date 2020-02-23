<template>
  <div class="test">
    <v-container fluid>
      <TestComponent />
      <!-- <v-row align="center" justify="center">
        <v-col cols="10">
          <v-card>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="6">
                 
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn text>Cancel</v-btn>
              <v-btn text color="primary">Submit</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row> -->
    </v-container>
  </div>
</template>

<script>
import TestComponent from "@/components/TestComponent.vue";

export default {
  name: "Test",
  components: {
    TestComponent
  }
};
</script>

<style></style>
