<template>
  <div>
    <div class="w-screen h-screen absolute">
      <Background />
    </div>
    <div class="w-screen sticky z-50 top-0 backdrop-blur-sm">
      <div class="max-w-4xl mx-auto lg:px-0 px-2">
        <div class="py-4 flex items-center space-x-2">
          <img src="./assets/logo.svg" alt="Bavel" class="w-16 h-16" />
          <h3 style="font-weight: bold;" class="dank text-5xl italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-800 to-purple-900">
            Bavel
          </h3>
        </div>
      </div>
    </div>
    <!-- <router-link to="/">Home</router-link>|
    <router-link to="/about">About</router-link> -->
    <router-view v-slot="{ Component }">
      <Suspense>
        <div class="relative">
          <component :is="Component" />
        </div>
      </Suspense>
    </router-view>
  </div>
</template>

<script setup>
import Background from "./components/background.vue";

</script>
