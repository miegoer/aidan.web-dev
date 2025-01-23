<template>
  <div class="iconSection" style="height: 50%;">
    <img src="https://cdn.jsdelivr.net/npm/simple-icons@3.13.0/icons/linkedin.svg" href="https://www.linkedin.com/in/aidanlamb/"/>
    <img src="https://cdn.jsdelivr.net/npm/simple-icons@3.13.0/icons/github.svg" href="https://github.com/miegoer" />
    <img src="https://cdn.jsdelivr.net/npm/simple-icons@3.13.0/icons/leetcode.svg" href="https://leetcode.com/u/miegoer/">
    <i class="fa fa-envelope" style="font-size:36px" href="mailto:aidanl.webdev@gmail.com"></i>
  </div>
  <div class="section">
    <span>How can I</span>
    <span>get in touch?</span>
  </div>
  <form id="form" method="POST">
    <input type="hidden" name="access_key" value="d3155001-53a8-47dc-8657-36cdfa92c3a8">

    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required><br>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required><br>
    <label for="message">Message:</label>
    <textarea id="message" name="message" required></textarea><br>
    <button type="submit">Submit</button>
    <div id="result"></div>
  </form>
</template>

<script>
export default {
  mounted() {
    const form = document.getElementById('form');
    const result = document.getElementById('result');

    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
        result.innerHTML = "Please wait...";

        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: json
        })
          .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
              result.innerHTML = json.message;
            } else {
              console.log(response);
              result.innerHTML = json.message;
            }
          })
          .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
          })
          .then(function () {
            form.reset();
            setTimeout(() => {
              result.style.display = "none";
            }, 3000);
          });
      });
    }
  }
};
</script>