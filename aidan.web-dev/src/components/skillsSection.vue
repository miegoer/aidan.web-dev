<template>
  <div class="staticSun">
    <div class="sun-content-skills">
      <h2>About Me</h2>
      <p>Hi! I'm Aidan Lamb, a Full Stack Software Engineer based in Glasgow, specializing in TypeScript and JavaScript technologies, with hands-on experience in React, Node.js, Next.js, and Express.js. My journey in programming spans over a decade, driven by a genuine passion for technology and problem-solving.</p>
    </div>
  </div>
  <div class="wheel-container">
    <div class="wheel-top">
      <div 
        class="circle" 
        :style="{ transform: `rotate(${rotation}deg)` }"
      >
        <div 
          v-for="(skill, index) in skills" 
          :key="skill.name"
          class="icon-wrapper"
          :style="{ 
            transform: `rotate(${index * angleStep}deg) translateX(${radius}px)` 
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
      <div 
        class="circle" 
        :style="{ transform: `rotate(${rotation}deg)` }"
      >
        <div 
          v-for="(skill, index) in backendSkills" 
          :key="skill.name"
          class="icon-wrapper"
          :style="{ 
            transform: `rotate(${index * angleStep}deg) translateX(${radius}px)` 
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
import { ref, onMounted, onUnmounted } from 'vue'

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
const angleStep = 360 / skills.length
const rotation = ref(0)

function calculateRadius() {
  // Calculate radius as the lesser of:
  // 1. 40% of screen width
  // 2. Screen height / 2
  // 3. Hardcoded max of 350px
  radius.value = Math.min(
    window.innerWidth * 0.3, 
    window.innerHeight * 0.3, 
    350
  )
}

function animate() {
  rotation.value += 0.5
  requestAnimationFrame(animate)
}

onMounted(() => {
  calculateRadius()
  window.addEventListener('resize', calculateRadius)
  animate()
})

onUnmounted(() => {
  window.removeEventListener('resize', calculateRadius)
})
</script>

<style scoped>
.wheel-container {
  position: relative;
  width: 100%;
  height: 50%;
  overflow: hidden;
}

.wheel, .wheel-top {
  position: absolute;
  width: 100%;
  height: 800px;
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
  width: 500px;
  height: 400px;
}

.icon-wrapper {
  position: absolute;
  width: 100px;
  height: 100px;
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
  object-fit: contain;
  z-index: 3;
}

.staticSun {
  position: absolute;
  width: 28vw;
  height: 28vw;
  max-width: 440px;
  max-height: 440px;
  min-width: 200px;
  min-height: 200px;
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
  align-items: start;
  text-align: center;
  padding: 2vw;
}

.sun-content-skills {
  width: 80%;
  color: white;
  text-wrap: wrap;
}

.sun-content h2 {
  font-size: 2.5;
  margin-bottom: 1vw;
}

.sun-content p {
  font-size: 1vw;
  line-height: 1.5;
  text-wrap: wrap;
}
</style>