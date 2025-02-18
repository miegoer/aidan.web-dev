<template>
  <div class="staticSun">
    <div class="sun-content-skills">
      <h2>About Me</h2>
      <p>Hi! I'm Aidan Lamb, a Full Stack Software Engineer based in Glasgow, specializing in TypeScript and JavaScript technologies, with hands-on experience in React, Node.js, Next.js, and Express.js. My journey in programming spans over a decade, driven by a genuine passion for technology and problem-solving.</p>
    </div>
  </div>
  <div class="wheel-container">
    <div class="wheel-top">
      <div class="circle rotating">
        <div 
          v-for="(skill, index) in skills" 
          :key="skill.name"
          class="icon-wrapper"
          :style="{ 
            transform: `rotate(${index * angleStep}deg) translateX(${translateDistance}px)` 
          }"
        >
          <img 
            :src="skill.logo" 
            :alt="skill.name" 
            class="skill-icon"
          >
        </div>
      </div>
    </div>
  </div>
  <div class="wheel-container">
    <div class="wheel">
      <div class="circle rotating">
        <div 
          v-for="(skill, index) in backendSkills" 
          :key="skill.name"
          class="icon-wrapper"
          :style="{ 
            transform: `rotate(${index * angleStep}deg) translateX(${translateDistance}px)` 
          }"
        >
          <img 
            :src="skill.logo" 
            :alt="skill.name" 
            class="skill-icon"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const skills = [
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Vue", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
  { name: "Angular", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
  { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Bootstrap", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
  { name: "HTML/CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" }
]

const backendSkills = [
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Redis", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
  { name: "Postman", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" },
  { name: "Jest", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" },
  { name: "Mocha", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mocha/mocha-plain.svg" }
]

const radius = ref(0)
const windowWidth = ref(window.innerWidth)
const angleStep = 360 / skills.length

const translateDistance = computed(() => {
  if (windowWidth.value < 800) {
    return 150 // Minimum distance in pixels for small screens
  }
  else if (windowWidth.value > 1700) {
    return 300 // Maximum distance in pixels for large screens
  }
  else {
    return windowWidth.value * 0.2 // 20vw converted to pixels for medium screens
  }
})

function updateWindowWidth() {
  windowWidth.value = window.innerWidth
  calculateRadius()
}

function calculateRadius() {
  const responsiveWidth = window.innerWidth * 0.35
  radius.value = Math.min(
    Math.max(250, responsiveWidth),
    500
  ) / 2
}

onMounted(() => {
  updateWindowWidth()
  window.addEventListener('resize', updateWindowWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowWidth)
})
</script>

<style scoped>
.wheel-container {
  position: relative;
  width: 100%;
  height: 50%;
  overflow: hidden;
  max-width: 1800px;
}

.wheel, .wheel-top {
  position: absolute;
  width: 100%;
  height: 800px;
  max-width: 1800px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wheel-top {
  bottom: -400px;
}

.wheel {
  top: -400px;
}

.circle {
  position: absolute;
  width: 100%;
  height: 100%;
  max-width: 1700px;
}

.icon-wrapper {
  position: absolute;
  width: max(60px, 6vw);
  height: max(60px, 6vw);
  display: flex;
  justify-content: center;
  align-items: center;
  transform-origin: 0 0;
  left: 50%;
  top: 50%;
  z-index: 2;
}

.skill-icon {
  width: 5vw;
  height: auto;
  min-width: 30px;
  max-width: 70px;
  object-fit: contain;
  z-index: 3;
}

.staticSun {
  position: absolute;
  width: 30vw;
  height: 30vw;
  max-width: 500px;
  max-height: 500px;
  min-width: 260px;
  min-height: 260px;
  border-radius: 50%;
  background-color: #a40606;
  background-image: linear-gradient(315deg, #a40606 0%, #d98324 74%);
  box-shadow: 0 0 210px 100px rgba(253, 142,54,0.6), 0 0 210px 200px rgba(251, 167,98,0.781);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 4vw;
}

.sun-content-skills {
  width: 80%;
  color: white;
  text-wrap: wrap;
}

.sun-content-skills h2 {
  font-size: 15px;
  margin-bottom: 1vw;
}

.sun-content-skills p {
  font-size: 10px;
  line-height: 1.5;
  text-wrap: wrap;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.rotating {
  animation: rotate 20s linear infinite;
  will-change: transform;
}

@media only screen and (min-width: 850px) {
  .sun-content-skills h2 {
    font-size: 2vw;
  }
  .sun-content-skills p {
    font-size: 1.2vw;
  }
  .staticSun {
    padding: 2vw;
  }
}

@media only screen and (min-width: 1700px) {
  .sun-content-skills h2 {
    font-size: 28.86px;
  }
  .sun-content-skills p {
    font-size: 20.412px;
  }
}
</style>