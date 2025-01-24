<template>
    <!-- Project Container -->
    <div class="halfSection" style="justify-content: end;">
      <h2 @click="showProject('Project1')" class="left">{{projectText.Project1.name}}</h2>
      <h2 @click="showProject('Project2')" class="right">{{projectText.Project2.name}}</h2>
    </div>
    <div class="s" style="justify-content: center; height: 30%;">
      <h2>What have<br>I done?</h2>
    </div>
    <div class="halfSection">
      <h2 @click="showProject('Project3')" class="left">{{projectText.Project3.name}}</h2>
      <h2 @click="showProject('Project4')" class="right">{{projectText.Project4.name}}</h2>
    </div>

    <!-- Popup Overlay -->
    <div v-if="activeProject" class="overlay">
      <div class="popup">
        <button @click="closeProject" class="close-button">X</button>
        <h2>{{ projectText[activeProject].name }}</h2>
        <p><strong>Description:</strong> {{ projectText[activeProject].description }}</p>
        <p><strong>Tech Stack:</strong> {{ projectText[activeProject].stack }}</p>
        <p><strong>Role:</strong> {{ projectText[activeProject].role }}</p>
        <div v-if="projectText[activeProject].media">
          <img :src="projectText[activeProject].media" alt="Project media" class="project-media" />
        </div>
      </div>
    </div>
</template>

<script>
export default {
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
    };
  },
  methods: {
    showProject(project) {
      this.activeProject = project;
    },
    closeProject() {
      this.activeProject = null;
    },
  },
};
</script>

<style>
.projectContainer {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: auto;
  margin: 10px 0;
}

.project-media {
  max-width: 65%;
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
  z-index: 10;
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

.popup p, .popup p strong {
  font-size: 2.5vw;
}

.left {
  text-align: left;
}

.right {
  text-align: right;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

@media screen and (min-width: 1024px) {
  .popup p, .popup p strong {
    font-size: 1vw;
  }
}
</style>
