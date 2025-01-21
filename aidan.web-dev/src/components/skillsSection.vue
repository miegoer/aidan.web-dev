<template>
  <div class="frontendSkills">
    <div class="animate-wrapper" :ref="setRef">
      <span class="text-2xl font-bold">Frontend</span>
    </div>
    <div class="animate-wrapper skills-grid-wrapper" :ref="setRef">
      <div class="skills-grid-FE">
        <div v-for="skill in frontendSkills" 
             :key="skill.name"
             class="skill-item">
          <img :src="skill.logo" 
               :alt="skill.name"
               class="skill-logo">
          <span class="skill-text">{{ skill.name }}</span>
        </div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="animate-wrapper" :ref="setRef">
      <span>What can I</span>
      <span>do for you?</span>
    </div>
  </div>

  <div class="backendSkills">
    <div class="animate-wrapper skills-grid-wrapper" :ref="setRef">
      <div class="skills-grid-BE">
        <div v-for="skill in backendSkills" 
             :key="skill.name"
             class="skill-item">
          <img :src="skill.logo" 
               :alt="skill.name"
               class="skill-logo">
          <span class="skill-text">{{ skill.name }}</span>
        </div>
      </div>
    </div>
    <div class="animate-wrapper" :ref="setRef">
      <span class="text-2xl font-bold">Backend</span>
    </div>
  </div>
</template>

<script setup>
import { useScrollAnimation } from './useScrollAnimation'

const { setRef } = useScrollAnimation({
  threshold: 0.1,
  once: true
})

// Combine the skills arrays for frontend
const frontendSkills = [
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Vue", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
  { name: "Angular", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
  { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "jQuery", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg" },
  { name: "Redux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
  { name: "Bootstrap", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
  { name: "HTML/CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" }
]

// Combine the skills arrays for backend
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
</script>

<style scoped>
.frontendSkills, .backendSkills {
  display: flex;
  height: 50%;
  width: 95%;
  position: relative;
  gap: 2rem;
  align-items: center;
}

.frontendSkills {
  justify-content: start;
  top: 0;
}

.backendSkills {
  justify-content: end;
  bottom: 0;
}

.skills-grid-wrapper {
  flex: 1;
  max-width: 600px; /* Adjust based on your needs */
}

.skills-grid-FE, .skills-grid-BE {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 1rem;
  width: 100%;
}

.skill-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  transition: all 0.3s ease;
}

.skill-logo {
  width: 4vw;
  height: auto;
  transition: opacity 0.3s ease;
}

.skill-text {
  position: absolute;
  opacity: 0;
  font-size: 14px;
  transition: opacity 0.3s ease;
  white-space: nowrap;
}

.skill-item:hover .skill-logo {
  opacity: 0;
}

.skill-item:hover .skill-text {
  opacity: 1;
}

@media screen and (min-width: 1024px) {
  .frontendSkills, .backendSkills {
    width: 100%;
  }

  .skills-grid-FE {
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }
  .skills-grid-BE {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }
}
</style>