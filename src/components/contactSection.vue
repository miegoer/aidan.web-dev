<template>
  <div class="contact-container">
    <div class="form-section">
      <div class="content-wrapper">
        <div class="contact-sun">
          <div class="sun-content">
            <div class="header-section">
              <h2>Where can I<br>find you?</h2>
              <div class="iconSection">
                <a target="_blank" href="https://www.linkedin.com/in/aidanlamb/" style="background-color: inherit;"><img src="https://cdn.jsdelivr.net/npm/simple-icons@3.13.0/icons/linkedin.svg"/></a>
                <a target="_blank" href="mailto:aidanl.webdev@gmail.com" style="background-color: inherit;"><i class="fa fa-envelope"></i></a>
                <a target="_blank" href="https://github.com/miegoer" style="background-color: inherit;"><img src="https://cdn.jsdelivr.net/npm/simple-icons@3.13.0/icons/github.svg"/></a>
                <a target="_blank" href="https://leetcode.com/u/miegoer/" style="background-color: inherit;"><img src="https://cdn.jsdelivr.net/npm/simple-icons@3.13.0/icons/leetcode.svg"></a>
              </div>
            </div>
            <h2 class="form-heading">Get in Touch</h2>
            <form id="form" method="POST" className="styled-form">
              <input type="hidden" name="access_key" value="d3155001-53a8-47dc-8657-36cdfa92c3a8" />
              
              <div className="form-row">
                <div className="input-data">
                  <input type="text" id="name" name="name" required />
                  <div className="underline"></div>
                  <label htmlFor="name">Name</label>
                </div>
              </div>

              <div className="form-row">
                <div className="input-data">
                  <input type="email" id="email" name="email" required />
                  <div className="underline"></div>
                  <label htmlFor="email">Email Address</label>
                </div>
              </div>

              <div className="form-row">
                <div className="input-data textarea">
                  <textarea id="message" name="message" required></textarea>
                  <div className="underline"></div>
                  <label htmlFor="message">Write your message</label>
                </div>
                <button className="submit" type="submit">Submit</button>
              </div>
              <div id="result"></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
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

<style>
.contact-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.form-section {
  width: 100%;
  height: 100%;
  position: relative;
}

.content-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
}

.contact-sun {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 80vw;
  max-width: 850px;
  min-width: 300px;
  height: clamp(400px, 90vh, 90vh);
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #a40606;
  background-image: linear-gradient(315deg, #a40606 0%, #d98324 74%);
  border-radius: 80vw 80vw 0 0;
  box-shadow: 0 0 105px 50px rgba(253, 142,54,0.6), 0 0 105px 100px rgba(251, 167,98,0.781);
  overflow: hidden;
  padding-top: 20px;
  padding-bottom: 10px;
}

.sun-content::-webkit-scrollbar {
  display: none;
}

.sun-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2vh 5% 5vh;
  overflow-y: auto;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;
}

.header-section {
  width: 100%;
  text-align: center;
  margin-bottom: 2vh;
}

.header-section h2 {
  margin-bottom: clamp(10px, 2vh, 20px);
  font-size: clamp(19px, 5vw, 50px);
  line-height: 1.2;
}

.iconSection {
  display: flex;
  gap: clamp(30px, 4vw, 60px);
  justify-content: center;
  margin-bottom: 2vh;
}

.iconSection img, 
.iconSection i {
  width: clamp(26px, 4vw, 40px);
  height: auto;
  cursor: pointer;
  font-size: clamp(26px, 4vw, 40px);
  color: black;
}

.styled-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2vh;
}

.form-row {
  display: flex;
  flex-direction: column;
  margin: 0;
}

.input-data {
  width: 100%;
  height: clamp(30px, 5vh, 40px);
  position: relative;
  text-align: left;
}

.input-data input,
.input-data textarea {
  display: block;
  width: 100%;
  height: 100%;
  border: none;
  font-size: clamp(14px, 2vh, 17px);
  border-bottom: 2px solid rgba(0,0,0, 0.12);
  background: none;
  outline: none;
}

.input-data label {
  position: absolute;
  pointer-events: none;
  bottom: 10px;
  font-size: clamp(14px, 1.8vh, 16px);
  left: 0;
  transition: all 0.3s ease;
  color: rgba(0, 0, 0, 0.8);
}

.input-data.textarea {
  height: clamp(60px, 10vh, 70px);
}

.input-data textarea {
  resize: none;
  height: 100%;
  padding-top: 10px;
}

.form-heading {
  font-size: clamp(19px, 4vw, 32px);
  margin-bottom: 2vh;
}

.form-row button[type="submit"] {
  margin-top: 2vh;
  padding: clamp(8px, 1.5vh, 10px) clamp(16px, 2vw, 20px);
  background: #a4508b;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
  font-size: clamp(14px, 1.8vh, 16px);
}

.form-row button[type="submit"]:hover {
  background: #c065a5;
}

/* Rest of your existing styles for underline effects remain the same */
.input-data .underline {
  position: absolute;
  bottom: 0;
  height: 2px;
  width: 100%;
  left: 0;
}

.input-data .underline:before {
  position: absolute;
  content: "";
  height: 2px;
  width: 100%;
  background: #3498db;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.input-data input:focus ~ .underline:before,
.input-data input:valid ~ .underline:before,
.input-data textarea:focus ~ .underline:before,
.input-data textarea:valid ~ .underline:before {
  transform: scale(1);
}

.input-data input:focus ~ label,
.input-data input:valid ~ label {
  transform: translateY(-20px);
  font-size: clamp(12px, 1.6vh, 14px);
}

.input-data textarea:focus ~ label,
.input-data textarea:valid ~ label {
  transform: translateY(-20px);
  font-size: clamp(12px, 1.6vh, 14px);
}
</style>