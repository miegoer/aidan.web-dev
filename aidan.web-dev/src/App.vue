<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import landingSection from './components/landingSection.vue'
import ProjectsSection from './components/projectsSection.vue'
import skillsSection from './components/skillsSection.vue'
import contactSection from './components/contactSection.vue'

const projectsSection = ref(null)

const handleProjectClick = (projectId) => {
  if (projectsSection.value) {
    projectsSection.value.showProject(projectId)
  }
}

let mainObserver = null;
let projectsObserver = null;
const isInitialLoad = ref(true);

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

const handleProjectsIntersection = (entries) => {
  const projectSuns = document.querySelectorAll('.projectSuns .sunProjects');
  const project1 = document.querySelector('.project1');
  const project2 = document.querySelector('.project2');
  const project3 = document.querySelector('.project3');
  const project4 = document.querySelector('.project4');

  entries.forEach(entry => {
    if (isInitialLoad.value) {
      isInitialLoad.value = false;
      return;
    }

    if (entry.isIntersecting) {
      // Projects section is in view
      projectSuns.forEach(sun => sun.classList.remove('hidden'));
      project1.classList.add('project-enter-bottom');
      project2.classList.add('project-enter-bottom');
      project3.classList.add('project-enter-top');
      project4.classList.add('project-enter-top');
    } else {
      // Projects section is out of view
      project1.classList.remove('project-enter-bottom');
      project2.classList.remove('project-enter-bottom');
      project3.classList.remove('project-enter-top');
      project4.classList.remove('project-enter-top');
      
      // Add exit animations
      project1.classList.add('project-exit-bottom');
      project2.classList.add('project-exit-bottom');
      project3.classList.add('project-exit-top');
      project4.classList.add('project-exit-top');

      // Hide project suns after animation
      setTimeout(() => {
        projectSuns.forEach(sun => sun.classList.add('hidden'));
        
        // Reset exit animations
        project1.classList.remove('project-exit-bottom');
        project2.classList.remove('project-exit-bottom');
        project3.classList.remove('project-exit-top');
        project4.classList.remove('project-exit-top');
      }, 200);
    }
  });
};

onMounted(async () => {
  await nextTick();

  const firstSection = document.querySelector('.contentContainer .section:first-child');
  const projectsSection = document.querySelector('.projects-section');

  mainObserver = new IntersectionObserver(handleIntersection, {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  });

  projectsObserver = new IntersectionObserver(handleProjectsIntersection, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  });

  if (firstSection) {
    mainObserver.observe(firstSection);
  }

  if (projectsSection) {
    projectsObserver.observe(projectsSection);
  }

  // Initially hide project suns
  const projectSuns = document.querySelectorAll('.projectSuns .sunProjects');
  projectSuns.forEach(sun => sun.classList.add('hidden'));
});

onUnmounted(() => {
  if (mainObserver) {
    mainObserver.disconnect();
  }
  if (projectsObserver) {
    projectsObserver.disconnect();
  }
});
</script>

<template>
  <div class="background">
    <div class="sky">
      <div class="sun"></div>
    </div>
    <div class="ocean"></div>
    
    <!-- Project suns now directly in background div, but positioned absolutely -->
    <div class="projectSuns">
      <div class="sunProjects project1" @click="console.log('Project 1 clicked')">
        <h2>Trail Stops</h2>
      </div>
      <div class="sunProjects project2" @click="() => handleProjectClick('Project2')">
        <h2>aidan.web-dev</h2>
      </div>

      <div class="projectSuns ocean-projects">
        <div class="sunProjects project3" @click="() => handleProjectClick('Project3')">
          <h2>UrGig</h2>
        </div>
        <div class="sunProjects project4" @click="() => handleProjectClick('Project4')">
          <h2>Scout Bingo</h2>
        </div>
      </div>
    </div>
  </div>
  
  <div class="contentContainer">
    <div class="section">
      <landingSection></landingSection>
    </div>
    <div class="section" style="justify-content: center; position: relative;">
      <skillsSection></skillsSection>
    </div>
    <div class="section projects-section">
      <ProjectsSection 
      @show-project="handleProjectClick"
      ref="projectsSection"
    ></ProjectsSection>
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

  .projects-section {
    z-index: 2;
  }

  .projectSuns-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 1;
  }

  .projectSuns-container .projectSuns {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: auto;
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

  .projectSuns {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-box-reflect: revert;
    overflow: hidden;
    cursor: pointer;
    z-index: 5;
  }

  .projectSuns .sunProjects {
    position: absolute;
    width: 15vw;
    height: 15vw;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: all 0.8s ease-out;
    -webkit-box-reflect: revert;
    cursor: pointer;
    z-index: 5;
  }

  .projectSuns .sunProjects.hidden {
    opacity: 0;
    transform: translateY(100%);
  }

  .project1 {
    top: 10%;
    left: 25%;
    background-color: #a40606;
    background-image: linear-gradient(135deg, #a40606 0%, #d98324 74%);
  }

  .project2 {
    top: 10%;
    right: 25%;
    background-color: #a40606;
    background-image: linear-gradient(225deg, #a40606 0%, #d98324 74%);
  }

  .project3 {
    bottom: 10%;
    left: 25%;
    background-color: #a40606;
    background-image: linear-gradient(45deg, #a40606 0%, #d98324 74%);
    opacity: 0.7;
  }

  .project4 {
    bottom: 10%;
    right: 25%;
    background-color: #a40606;
    background-image: linear-gradient(315deg, #a40606 0%, #d98324 74%);
    opacity: 0.7;
  }

  .projectSuns h2 {
    color: white;
    text-align: center;
    font-size: 1.2vw;
    opacity: 0.7;
  }

  /* Project Sun Animation Classes */
  .project-enter-bottom {
    animation: enter-from-bottom 0.2s ease-out forwards;
  }

  .project-enter-top {
    animation: enter-from-top 0.2s ease-out forwards;
  }

  .project-exit-bottom {
    animation: exit-to-bottom 0.2s linear forwards;
  }

  .project-exit-top {
    animation: exit-to-top 0.2s linear forwards;
  }

  @keyframes enter-from-bottom {
    from {
      opacity: 0;
      transform: translateY(100%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes enter-from-top {
    from {
      opacity: 0;
      transform: translateY(-100%);
    }
    to {
      opacity: 0.7;
      transform: translateY(0);
    }
  }

  @keyframes exit-to-bottom {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(100%);
    }
  }

  @keyframes exit-to-top {
    from {
      opacity: 0.7;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-100%);
    }
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