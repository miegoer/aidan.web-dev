<script setup>
import { onMounted, onUnmounted } from 'vue'
import landingSection from './components/landingSection.vue'
import ProjectsSection from './components/projectsSection.vue'
import skillsSection from './components/skillsSection.vue'
import contactSection from './components/contactSection.vue'

let observer = null;

const handleIntersection = (entries) => {
  const sun = document.querySelector('.sun');
  
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      const computedStyle = window.getComputedStyle(sun);
      const matrix = computedStyle.transform;

      let currentY = 0;
      if (matrix !== 'none') {
        const values = matrix.match(/matrix.*\((.+)\)/)[1].split(', ');
        currentY = parseFloat(values[5]);
      }

      sun.style.transform = `translateY(${currentY}px)`;

      sun.style.animation = 'quick-descent 0.3s linear forwards';
    } else {

      sun.style.animation = '';
      sun.style.transform = ''; 
    }
  });
};

onMounted(() => {
  const firstSection = document.querySelector('.contentContainer .section:first-child');

  observer = new IntersectionObserver(handleIntersection, {
    root: null,
    threshold: 0.5,
  });

  if (firstSection) {
    observer.observe(firstSection);
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<template>
  <div class="background">
    <div class="sky">
      <div class="sun"></div>
    </div>
    <div class="ocean"></div>
  </div>
  <div class="contentContainer">
    <div class="section">
      <landingSection></landingSection>
    </div>
    <div class="section" style="justify-content: center; position: relative;">
      <skillsSection></skillsSection>
    </div>
    <div class="section">
      <ProjectsSection></ProjectsSection>
    </div>
    <div class="section">
      <contactSection></contactSection>
    </div>
  </div>
</template>

<style>
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: 'Work Sans', sans-serif;
    font-size: 8vw;
    color: #171616;
    --time:50s;
  }

  h1 {
    font-size: 8vw;
  }

  h2 {
    font-size: 5vw;
  }

  h3, a, label, button, p, form input, form textarea {
    font-size: 2.5vw;
  }

  .contentContainer {
    width: 100vw;
    height: 100vh; 
    overflow-y: scroll; 
    scroll-snap-type: y mandatory; 
  }

  .section {
    scroll-snap-align: start;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin: 0px;
    width: 100%;
    height: 100%;
    white-space: nowrap;
  }

  .halfSection {
    display: flex;
    flex-direction: column;
    height: 50%;
  }

  .background {
    width: 100vw;
    height: 100vh;
    position: fixed;
    display: flex;
    flex-direction: column;
    z-index: -1;
  }

  .sky,.ocean {
    width: 100%;
    height: 50%;
  }

  .sky {
    background-color: #bd4f6c;
    background-image: radial-gradient(circle at right, #bd4f6c, #d7816a);
    background-size: 400% 400%;
    position: relative;
    -webkit-box-reflect: below 0 linear-gradient(transparent, rgba(0, 0, 0, 0.7));
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    overflow: hidden;
    animation: sky var(--time) ease;
  }

  .ocean {
    background-color: #a4508b;
    background-image: radial-gradient(circle at center, #c86dd7 0%, #522343 0%);
  }

  .sun {
    width: 15vw;
    height: 15vw;
    border-radius: 50%;
    background-color: #a40606;
    background-image: linear-gradient(315deg, #a40606 0%, #d98324 74%);
    transform: translateY(20%);
    animation: set var(--time) ease infinite;
    box-shadow: 0 0 210px 100px rgba(253, 142,54,0.6), 0 0 210px 200px rgba(251, 167,98,0.781);
  }

  .sun-fade-enter-active,
  .sun-fade-leave-active {
    transition: opacity 0.5s ease;
  }
  
  .sun-fade-enter-from,
  .sun-fade-leave-to {
    opacity: 0;
  }

  @media screen and (min-width: 1024px) {
    h1 {
      font-size: 4vw;
    }
    h2 {
      font-size: 2.5vw;
    }
    h3, a, label, button, p, form input, form textarea {
      font-size: 1vw;
    }
  }

  @keyframes set{
    0%,
    100%{
      transform: translate(0, 100%);
    }
    40% {
      transform: translate(0, -50%);
    }
    60% {
      transform: translate(0, -50%);
    }
  }

  @keyframes quick-descent {
  to {
    transform: translate(0, 105%);
  }
  }
</style>
