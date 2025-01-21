<template>
  <div class="section" style="justify-content: end;">
    <div class="animate-wrapper" :ref="setRef">
      <span>Aidan Lamb</span>
    </div>
  </div>
  <div class="section" style="justify-content: start;">
    <div class="animate-wrapper" :ref="setRef">
      <span>Software Engineer</span>
      <span class="smallText">*part-time outdoorsman / <a href="https://www.scouts.org.uk/" target="_blank" style="color: inherit; text-decoration: none; background-color: transparent;">Scout Leader</a></span>
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
  .section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 0px;
    width: 100%;
    height: 50%;
    white-space: nowrap;
  }
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

  .smallText {
    font-size: 2.5vw;
  }
  @media screen and (min-width: 1024px) {
    .smallText {
      font-size: 1vw;
    }
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