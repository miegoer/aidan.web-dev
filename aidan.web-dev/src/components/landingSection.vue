<template>
  <div class="section" style="justify-content: end;">
    <span>Aidan Lamb</span>
  </div>
  <div class="section" style="justify-content: start;">
    <span>Software Engineer</span>
    <span class="smallText">*part-time outdoorsman / <a href="https://www.scouts.org.uk/" target="_blank" style="color: inherit; text-decoration: none; background-color: transparent;">Scout Leader</a></span>
  </div>
</template>

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
  .smallText {
    font-size: 2.5vw;
  }
  @media screen and (min-width: 1024px) {
    .smallText {
      font-size: 1vw;
    }
  }
</style>