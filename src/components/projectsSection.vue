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
        <button @click="closeProject" class="close-button">
          <span class="material-symbols-outlined">close</span>
        </button>
        <h2>{{ projectText[activeProject].name }}</h2>
        <p><strong style="font-weight: bold;">Description:</strong> {{ projectText[activeProject].description }}</p>
        <p><strong style="font-weight: bold;">Tech Stack:</strong> {{ projectText[activeProject].stack }}</p>
        <p><strong style="font-weight: bold;">Role:</strong> {{ projectText[activeProject].role }}</p>
        <div v-if="projectText[activeProject].media" class="media-container">
          <div v-if="!mediaLoaded[activeProject]" class="media-placeholder"></div>
          
          <!-- Dynamic media rendering -->
          <img 
            v-if="isImage(projectText[activeProject].media)"
            :src="projectText[activeProject].media" 
            alt="Project media" 
            class="project-media" 
            :class="{ 'hidden': !mediaLoaded[activeProject] }"
            @load="handleMediaLoad(activeProject)"
          />
          <video 
            v-else-if="isVideo(projectText[activeProject].media)"
            :src="projectText[activeProject].media" 
            class="project-media" 
            :class="{ 'hidden': !mediaLoaded[activeProject] }"
            @loadedmetadata="handleMediaLoad(activeProject)"
            autoplay
            loop
            muted
          ></video>
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
    const mediaLoaded = ref({})
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
      mediaLoaded,
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
          media: "/TrailStops.mp4"
        },
        Project2: {
          name: "AidanWebDev",
          description: "My personal portfolio site. A place to show off my skills and act as a point of contact to get in touch with me.",
          stack: "Vue.js",
          role: "Sole developer for entire project.",
          media: "/aidanWebDevSite.PNG"
        },
        Project3: {
          name: "UrGig",
          description: "Urgig is an online platform focused on connecting artists and promoters. With promoters able to create events and find talent, and artists able to manage their bookings, Urgig is there to simplify the events industry.",
          stack: "Next.js, MongoDB Atlas, Tailwind, TalkJS, Clerk",
          role: "Responsible for the implementation of the messenger service with TalkJS, and booking functionality",
          media: "/Urgig.mp4"
        },
        Project4: {
          name: "Scout Bingo",
          description: "An internal bingo game for an upcoming international camp ran by the South East Scout Network.",
          stack: "Vue.js, Express, MongoDB, Cloudinary",
          role: "Sole developer for entire project.",
          media: "/SouthEastScouts.jpg"
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
      this.mediaLoaded[project] = false;
    },
    handleMediaLoad(project) {
      this.mediaLoaded[project] = true;
    },
    isImage(filename) {
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
      return imageExtensions.some(ext => filename.toLowerCase().endsWith(ext));
    },
    isVideo(filename) {
      const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
      return videoExtensions.some(ext => filename.toLowerCase().endsWith(ext));
    }
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
  width: 25vw;
  height: 25vw;
  border-radius: 50%;
  pointer-events: auto;
  cursor: pointer;
}

.project-1 {
  top: 20%;
  left: 15%;
}

.project-2 {
  top: 20%;
  right: 15%;
}

.project-3 {
  bottom: 20%;
  left: 15%;
}

.project-4 {
  bottom: 20%;
  right: 15%;
}

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
  background-color: #bd4f6c;
  background-image: radial-gradient(circle at right, #bd4f6c, #d7816a);
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 1000px;
  height: 80%;
  max-height: 570px;
  text-align: center;
  position: relative;
  text-wrap: wrap;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.popup::-webkit-scrollbar {
  display: none;
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
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-button .material-symbols-outlined {
  font-size: 24px;
  color: black;
  transition: color 0.2s ease;
}

.close-button:hover .material-symbols-outlined {
  color: #666;
}

.media-container {
  position: relative;
  width: 100%;
  margin-top: 20px;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.media-placeholder {
  width: 90%;
  height: 300px;
  background-color: #a40606;
  background-image: linear-gradient(315deg, #a40606 0%, #d98324 74%);
  border-radius: 12px;
  animation: pulse 1s infinite ease-in-out;
}

.project-media {
  max-width: 90%;
  max-height: 400px;
  border-radius: 12px;
  transition: opacity 0.3s ease;
  object-fit: contain;
}

.project-media.hidden {
  display: none;
}

.centered-header {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
}

/* Hide video controls */
video::-webkit-media-controls {
  display: none !important;
}
video::-webkit-media-controls-enclosure {
  display: none !important;
}

@keyframes pulse {
  0% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 0.2;
  }
}

@media screen and (min-width: 1024px) {
  .project-click-overlay {
    width: 15vw;
    height: 15vw;
  }

  .project-1, .project-3 {
    left: 25%;
  }

  .project-2, .project-4 {
    right: 25%;
  }

  .project-1, .project-2 {
    top: 10%;
  }

  .project-3, .project-4 {
    bottom: 10%;
  }

  .project-media {
    max-width: 65%;
  }

  .media-placeholder {
    width: 65%;
    height: 200px;
  }
}

@media screen and (max-width: 768px) {
  .project-click-overlay {
    width: 30vw;
    height: 30vw;
  }

  .media-placeholder {
    height: 200px;
  }
}
</style>