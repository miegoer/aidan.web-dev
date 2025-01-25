<template>
  <div class="projectsWrapper">
    <h2>Previous <br>Projects</h2>

    <div class="project-click-overlays">
      <div 
        class="project-click-overlay project-1" 
        @click="showProject('Project1')"
      ></div>
      <div 
        class="project-click-overlay project-2" 
        @click="showProject('Project2')"
      ></div>
      <div 
        class="project-click-overlay project-3" 
        @click="showProject('Project3')"
      ></div>
      <div 
        class="project-click-overlay project-4" 
        @click="showProject('Project4')"
      ></div>
    </div>

    <div v-if="activeProject" class="overlay">
      <div class="popup">
        <button @click="closeProject" class="close-button">X</button>
        <h2>{{ projectText[activeProject].name }}</h2>
        <p><strong style="font-size: 2.5vw;">Description:</strong> {{ projectText[activeProject].description }}</p>
        <p><strong style="font-size: 2.5vw;">Tech Stack:</strong> {{ projectText[activeProject].stack }}</p>
        <p><strong style="font-size: 2.5vw;">Role:</strong> {{ projectText[activeProject].role }}</p>
        <div v-if="projectText[activeProject].media">
          <img :src="projectText[activeProject].media" alt="Project media" class="project-media" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'

export default {
  emits: ['show-project'],
  setup(props, { emit }) {
    const isVisible = ref(false)
    let observer = null

    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        isVisible.value = entry.isIntersecting
      })
    }

    onMounted(() => {
      observer = new IntersectionObserver(handleIntersection, {
        root: null,
        threshold: 0.5,
      })

      const section = document.querySelector('.section:nth-child(3)')
      if (section) {
        observer.observe(section)
      }
    })

    onUnmounted(() => {
      if (observer) {
        observer.disconnect()
      }
    })

    return {
      isVisible,
    }
  },
  data() {
    return {
      activeProject: null,
      projectText: {
        Project1: {
          name: "Trail Stops",
          description: "Trail Stops is an outdoor focused website, helping hikers plan their next big trip. Place stops to find nearby accommodation and see how far you'll walk each day.",
          stack: "React, Express, MongoDB, Leaflet Maps, Google Places API",
          role: "Sole developer for entire project.",
          media: "/public/TrailStops.gif"
        },
        Project2: {
          name: "aidan.web-dev",
          description: "My personal portfolio site. A place to show off my skills and act as a point of contact to get in touch with me.",
          stack: "Vue.js, Bootstrap",
          role: "Sole developer for entire project.",
          media: ""
        },
        Project3: {
          name: "UrGig",
          description: "Urgig is an online platform focused on connecting artists and promoters. With promoters able to create events and find talent, and artists able to manage their bookings, Urgig is there to simplify the events industry.",
          stack: "Next.js, MongoDB Atlas, Tailwind, TalkJS, Clerk",
          role: "Responsible for the implementation of the messenger service with TalkJS, and booking functionality",
          media: "/public/UrGigGIF.gif"
        },
        Project4: {
          name: "Scout Bingo",
          description: "An internal bingo game for an upcoming international camp ran by the South East Scout Network.",
          stack: "Vue.js, Express, MongoDB, Cloudinary",
          role: "Sole developer for entire project.",
          media: "/public/SouthEastScouts.jpg"
        },
      },
    }
  },
  methods: {
  closeProject() {
    this.activeProject = null;
  },
  showProject(project) {
    this.activeProject = project;
    this.$emit('show-project', project);
  },
},
}
</script>

<style scoped>
.projectsWrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 100%;
  z-index: 4;
}

.project-click-overlays {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 3;
}

.project-click-overlay {
  position: absolute;
  width: 15vw;
  height: 15vw;
  border-radius: 50%;
  pointer-events: auto;
  cursor: pointer;
}

.project-1 {
  top: 10%;
  left: 25.5%;
}

.project-2 {
  top: 10%;
  right: 24.5%;
}

.project-3 {
  bottom: 10%;
  left: 25.5%;
}

.project-4 {
  bottom: 10%;
  right: 24.5%;
}

/* Existing popup styles */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 11;
}

.popup {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 1000px;
  text-align: center;
  position: relative;
  text-wrap: wrap;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  padding: 10px;
  cursor: pointer;
  z-index: 101;
  pointer-events: auto;
}

.project-media {
  max-width: 65%;
}

.centered-header {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
}

@media screen and (max-width: 768px) {
  .project-click-overlay {
    width: 30vw;
    height: 30vw;
  }
}
</style>