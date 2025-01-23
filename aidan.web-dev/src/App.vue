<script setup>
  import landingSection from './components/landingSection.vue'
  import ProjectsSection from './components/projectsSection.vue'
  import skillsSection from './components/skillsSection.vue'
  import contactSection from './components/contactSection.vue'
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
    <div class="section">
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

<style scoped>
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: 'Work Sans', sans-serif;
    font-size: 4vw;
    color: #171616;
    --time:50s;
  }

  .contentContainer {
    width: 100vw;
    height: 100vh; 
    overflow-y: scroll; 
    scroll-snap-type: y mandatory; 
  }

  .section {
    height: 100vh;
    width: 100%;
    scroll-snap-align: start;
  }

  @media screen and (min-width: 1024px) {
    .section {
      width: 50%;
      justify-self: center;
      font-size: 4vw;
    }
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
    animation: sky var(--time) ease infinite;
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
</style>
