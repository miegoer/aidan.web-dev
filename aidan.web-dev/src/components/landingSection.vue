<template>
  <div class="halfSection" style="justify-content: end;">
    <div class="animate-wrapper" :ref="setRef">
      <h1>Aidan Lamb</h1>
    </div>
  </div>
  <div class="halfSection" style="justify-content: start;">
    <div class="animate-wrapper" :ref="setRef">
      <h1>Software Engineer</h1>
      <h3>*part-time outdoorsman / <a href="https://www.scouts.org.uk/" target="_blank" style="color: inherit; text-decoration: none; background-color: transparent;">Scout Leader</a></h3>
    </div>
  </div>
</template>

<script setup>
import { useScrollAnimation } from './useScrollAnimation'

const { setRef } = useScrollAnimation({
  threshold: 0.1,
  once: true
})
</script>

<style>

  .animate-wrapper {
  opacity: 0;
  position: relative;
  transform: translateY(50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  }

  .animate-wrapper.animate {
    animation: riseUp 1s forwards;
  }
  @keyframes riseUp {
    0% {
      opacity: 0;
      transform: translateY(50px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>