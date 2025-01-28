<template>
  <div class="contact-container">
    <div class="form-section">
      <div class="content-wrapper">
        <div class="contact-sun">
          <div class="sun-content">
            <div class="header-section">
              <h2>How can I<br>get in touch?</h2>
              <div class="iconSection">
                <a target="_blank" href="https://www.linkedin.com/in/aidanlamb/" style="background-color: inherit;"><img src="https://cdn.jsdelivr.net/npm/simple-icons@3.13.0/icons/linkedin.svg"/></a>
                <a target="_blank" href="https://github.com/miegoer" style="background-color: inherit;"><img src="https://cdn.jsdelivr.net/npm/simple-icons@3.13.0/icons/github.svg"/></a>
                <a target="_blank" href="https://leetcode.com/u/miegoer/" style="background-color: inherit;"><img src="https://cdn.jsdelivr.net/npm/simple-icons@3.13.0/icons/leetcode.svg"></a>
                <a target="_blank" href="mailto:aidanl.webdev@gmail.com" style="background-color: inherit;"><i class="fa fa-envelope" style="font-size:36px"></i></a>
              </div>
            </div>
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
  justify-content: flex-end;
  width: 80vw;
  max-width: 850px;
  min-width: 300px;
  max-height: 90vh;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #a40606;
  background-image: linear-gradient(315deg, #a40606 0%, #d98324 74%);
  border-radius: 80vw 80vw 0 0;
  box-shadow: 0 0 105px 50px rgba(253, 142,54,0.6), 0 0 105px 100px rgba(251, 167,98,0.781);
  padding-top: 150px;
}

.sun-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
}

.header-section {
  width: 100%;
  text-align: center;
  margin-top: -150px;
}

.header-section h2 {
  margin-bottom: 50px;
}

.iconSection {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 5%;
}

.iconSection img, 
.iconSection i {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.styled-form {
  width: 100%;
  padding-bottom: 5%;
  padding-left: 5%;
  padding-right: 5%;
  border-radius: 8px;
  margin-top: 2%;
}

.form-row {
  display: flex;
  flex-direction: column;
  margin: 32px 0;
}

.input-data {
  width: 90%;
  height: 40px;
  margin: 0 20px;
  position: relative;
  text-align: left;
}

.input-data input,
.input-data textarea {
  display: block;
  width: 100%;
  height: 100%;
  border: none;
  font-size: 17px;
  border-bottom: 2px solid rgba(0,0,0, 0.12);
  background: none;
  outline: none;
}

.input-data label {
  position: absolute;
  pointer-events: none;
  bottom: 10px;
  font-size: 16px;
  left: 0;
  transition: all 0.3s ease;
  color: rgba(0, 0, 0, 0.8);
}

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
.input-data input:valid ~ label,
.input-data textarea:focus ~ label,
.input-data textarea:valid ~ label {
  transform: translateY(-20px);
  font-size: 14px;
}

.input-data.textarea {
  height: auto;
}

.input-data textarea {
  resize: none;
  height: 70px;
  padding-top: 10px;
}

.form-row button[type="submit"] {
  margin-top: 20px;
  margin-left: 20px;
  align-self: flex-start;
  padding: 10px 20px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.form-row button[type="submit"]:hover {
  background: #2980b9;
}
</style>