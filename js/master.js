// Check If There's Local Storage  Color Option
let maincolor = localStorage.getItem("color_option");

if (maincolor !== null) {
  // console.log(localStorage.getItem("color_option"));
  document.documentElement.style.setProperty("--main-color", maincolor);
  // Remove Active Class From All Children
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");

    if (element.dataset.color === maincolor) {
      // Add Class On Self
      element.classList.add("active");
    }
  });
}
// Random Background Option
let backgroundOption = true;

let backgroundInterval;

// Remove Class Active From All Spans
document.querySelectorAll(".random-background span").forEach((element) => {
  element.classList.remove("active");
});

// Check If There's local storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background_option");
// Check If There's local storage Random Background Is Not Empty
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
    document.querySelector(".random-background .yes").classList.add("active");
  } else {
    backgroundOption = false;
    document.querySelector(".random-background .no").classList.add("active");
  }
}

// Toggle Spin Class On Icon
document.querySelector(".toggle-setting .fa-cog").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("open");
};

// Switch Colors
const colorLi = document.querySelectorAll(".colors-list li");

colorLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    // Set Color On Root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // Set Color On Local Storage
    localStorage.setItem("color_option", e.target.dataset.color);
    handleActive(e);
  });
});

// Switch Random Background Option
const randomBackEl = document.querySelectorAll(".random-background span");

randomBackEl.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("backdround_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});

// Select Langing Page
let landingPage = document.querySelector(".landing-page");

// Array Of Imgs
let imgsArray = ["1.jpg", "2.jpg", "3.jpg", "5.jpg"];

function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // Get Random Number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      // Change Background Imgs URL
      landingPage.style.backgroundImage =
        'url("imgs/' + imgsArray[randomNumber] + ' ")';
    }, 10000);
  }
}
randomizeImgs();

// Select Skills Selector
let ourSkills = document.querySelector(".skills");
let myButtonScroll = document.querySelector(".go-up");

window.onscroll = function () {
  if (window.pageYOffset >= 400) {
    myButtonScroll.style.display = "block";
  } else {
    myButtonScroll.style.display = "none";
  }
  // Skills Offset Top
  let skillsOffsetTOp = ourSkills.offsetTop;
  // Skills Outer Height
  let SkillsOuterHeight = ourSkills.offsetHeight;

  // window Height
  let windowHeight = this.innerHeight;

  //window ScrollTop
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOffsetTOp + SkillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }

  myButtonScroll.onclick = function () {
    document.documentElement.scrollTop = 0;
  };
};

// Create Popup With The Image

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create Overlay Element
    let overlay = document.createElement("div");
    // Add Class To Overlay
    overlay.className = "popup-overlay";
    // Append overlay To boy
    document.body.appendChild(overlay);

    // Create Popup Box
    let popupBox = document.createElement("div");
    // Add Class To Popup Box
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      // Create Heading
      let imgHeading = document.createElement("h3");
      // Create Text For Heading
      let imgText = document.createTextNode(img.alt);
      // Append Text To Heading
      imgHeading.appendChild(imgText);
      // Append Heading To popupBox
      popupBox.appendChild(imgHeading);
    }

    // Ceate The Image
    let popupImage = document.createElement("img");
    // Set Img Source
    popupImage.src = img.src;
    // Add Image To Popup Box
    popupBox.appendChild(popupImage);
    // Append The Popup Box To Body
    document.body.appendChild(popupBox);

    // Create The Close Button
    closeButton = document.createElement("span");
    // Create The Close Button Text
    closeButtonText = document.createTextNode("X");
    // Append The Text To Close Button
    closeButton.appendChild(closeButtonText);
    // Add Class To close Button
    closeButton.className = "close-button";
    // Append Close Button To popupBox
    popupBox.appendChild(closeButton);
  });
});

// Close Popup
document.addEventListener("click", (e) => {
  if (e.target.className == "close-button") {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

//  Select All Links
const allLinks = document.querySelectorAll(".links a");

function scrollTo(elemnt) {
  elemnt.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollTo(allBullets);
scrollTo(allLinks);

// Handle Active State
function handleActive(ev) {
  // Remove Active Class From All Children
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  // Add Class On Self
  ev.target.classList.add("active");
}

// The Bullet Setting
let bulletSpan = document.querySelectorAll(".bullets-option span");
let bulletContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
  bulletSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletLocalItem === "block") {
    bulletContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletContainer.style.display = "block";

      localStorage.setItem("bullets_option", "block");
    } else {
      bulletContainer.style.display = "none";

      localStorage.setItem("bullets_option", "none");
    }
    handleActive(e);
  });
});

// Reset Option
document.querySelector(".reset-options").onclick = function () {
  localStorage.clear();
  // localStorage.removeItem("color_option");
  // localStorage.removeItem("background_option");
  // localStorage.removeItem("bulltes_option");

  window.location.reload();
};

// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let tlinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  e.stopPropagation();

  this.classList.toggle("menu-active");
  tlinks.classList.toggle("open");
};

// Click Anywhere Outside Menu And toggle Button
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn) {
    // Check Menu Is Open
    if (tlinks.classList.contains("open")) {
      toggleBtn.classList.toggle("menu-active");
      tlinks.classList.toggle("open");
    }
  }
});
// Stop Propagation On Menu
tlinks.onclick = (e) => {
  e.stopPropagation();
};

// function goUp() {
//   let myButtonScroll = document.querySelector(".go-up");
//   window.onscroll = function () {
//     if (window.pageYOffset >= 400) {
//       myButtonScroll.style.display = "block";
//     } else {
//       myButtonScroll.style.display = "none";
//     }
//   };
//   myButtonScroll.onclick = function () {
//     document.documentElement.scrollTop = 0;
//   };
// }
// goUp();
