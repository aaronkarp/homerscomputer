gsap.registerPlugin(MotionPathPlugin);

document.addEventListener("DOMContentLoaded", () => {
  // Create array of valid inputs
  const commands = ["BLINKY", "BBBQ", "FISHBULB", "IT'S STILL GOOD"];

  // Select Mr. Sparkle elements
  const mrSparkleMain = document.getElementById("mrSparkle__main");
  const mrSparkleBackground = document.getElementById("mrSparkle__background");
  const mrSparkleContainer = document.getElementById("mrSparkle__container");
  const mrSparkleNameContainer = document.getElementById(
    "mrSparkle__name__container"
  );
  const mrSparkleTaglineContainer = document.getElementById(
    "mrSparkle__tagline__container"
  );

  // Function to close all Mr. Sparkle elements after animation
  const closeMrSparkle = () => {
    gsap.to(mrSparkleBackground, { opacity: 0, duration: 0.25, delay: 2 });
    gsap.to(mrSparkleContainer, { opacity: 0, duration: 0.25, delay: 2 });
    gsap.to(mrSparkleNameContainer, { opacity: 0, duration: 0.25, delay: 2 });
    gsap.to(mrSparkleTaglineContainer, {
      opacity: 0,
      duration: 0.25,
      delay: 2
    });
    setTimeout(() => {
      mrSparkleMain.style.visibility = "hidden";
    }, 4000);
  };

  // Function to animate Mr. Sparkle elements
  const openMrSparkle = () => {
    mrSparkleMain.style.visibility = "visible";
    mrSparkleContainer.style.opacity = 1;
    gsap.fromTo(
      mrSparkleBackground,
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    );
    gsap.fromTo(
      mrSparkleContainer,
      { scale: 0, rotation: 0 },
      { scale: 1, rotation: 1440, duration: 2, delay: 0.5 }
    );
    gsap.fromTo(
      mrSparkleNameContainer,
      { opacity: 0 },
      { opacity: 1, duration: 1, delay: 2.5 }
    );
    gsap.fromTo(
      mrSparkleTaglineContainer,
      { opacity: 0 },
      { opacity: 1, duration: 1, delay: 3, onComplete: closeMrSparkle }
    );
  };

  // Set up variables for pig animation
  const fps = 25;
  let lastFrame = new Date().getTime();
  let pigAnimating = true;
  const pigContainer = document.getElementById("simpsons__pig__container");
  const frame1 = document.getElementById("simpsons__frame__1");
  const frame2 = document.getElementById("simpsons__frame__2");
  const frame3 = document.getElementById("simpsons__frame__3");
  const frame4 = document.getElementById("simpsons__frame__4");
  frame1.style.display = "block";
  frame2.style.display = "none";
  frame3.style.display = "none";
  frame4.style.display = "none";

  // Function to close pig animation
  const closePig = () => {
    pigAnimating = false;
    pigContainer.style.visibility = "hidden";
  };

  // Function to animate pig frame by frame
  const animate = () => {
    let now = new Date().getTime();
    if (now - lastFrame > 1000 / fps) {
      if (frame1.style.display === "block") {
        frame1.style.display = "none";
        frame2.style.display = "block";
        frame3.style.display = "none";
        frame4.style.display = "none";
      } else if (frame2.style.display === "block") {
        frame1.style.display = "none";
        frame2.style.display = "none";
        frame3.style.display = "block";
        frame4.style.display = "none";
      } else if (frame3.style.display === "block") {
        frame1.style.display = "none";
        frame2.style.display = "none";
        frame3.style.display = "none";
        frame4.style.display = "block";
      } else if (frame4.style.display === "block") {
        frame1.style.display = "block";
        frame2.style.display = "none";
        frame3.style.display = "none";
        frame4.style.display = "none";
      }
      lastFrame = new Date().getTime();
    }
    if (pigAnimating) {
      requestAnimationFrame(animate);
    }
  };

  // Function to handle pig's motion path animation and trigger frame by frame animation
  const animatePig = () => {
    pigAnimating = true;
    pigContainer.style.visibility = "visible";
    animate();
    gsap.to("#simpsons__pig", {
      duration: 2.5,
      repeat: 0,
      yoyo: false,
      ease: CustomEase.create(
        "custom",
        "M0,0 C0.126,0.382 0.25,0.444 0.4,0.5 0.462,0.523 0.866,0.588 1,1 "
      ),
      motionPath: {
        path: "#pig__motionPath",
        align: "#pig__motionPath",
        autoRotate: 180,
        start: 1,
        end: 0,
        alignOrigin: [0.5, 0.5]
      },
      onComplete: closePig
    });
  };

  // Select Blinky elements
  const simpsonsBlinkyContainer = document.getElementById('simpsons__blinky__container');
  const simpsonsBlinkyFill = document.getElementById('simpsons__blinky__fill');
  const simpsonsBlinkySvg = document.getElementById('simpsons__blinky__svg');
  const simpsonsBlinkyWater = document.getElementById('simpsons__blinky__water');
  const simpsonsBlinkyWaveShape = document.getElementById('simpsons__blinky__waveShape');

  // Function to animate Blinky
  const animateBlinky = () => {
    simpsonsBlinkyContainer.style.visibility = 'visible';
    simpsonsBlinkyContainer.style.opacity = '1';
    simpsonsBlinkyFill.classList.add('animate');
    simpsonsBlinkyFill.classList.remove('hide');
    simpsonsBlinkySvg.classList.add('animate');
    simpsonsBlinkyWater.classList.add('animate');
    simpsonsBlinkyWaveShape.classList.add('animate');

    // End animation after 1 cycle and hide elements
    setTimeout(() => {
      simpsonsBlinkyContainer.style.opacity = '0';
      setTimeout(() => {
        simpsonsBlinkyContainer.style.visibility = 'hidden';
        simpsonsBlinkyFill.classList.add('hide');
        simpsonsBlinkyFill.classList.remove('animate');
        simpsonsBlinkySvg.classList.remove('animate');
        simpsonsBlinkyWater.classList.remove('animate');
        simpsonsBlinkyWaveShape.classList.remove('animate');
      }, 100);
    }, 13000)
  }

  // Select computer screen areas
  const screenOutput = document.getElementById(
    "simpsons__computerScreen__output"
  );
  const terminalPrompt = document.getElementById(
    "simpsons__computerScreen__terminalPrompt"
  );

  // Add blinking cursor to "terminal prompt"
  setInterval(() => {
    terminalPrompt.classList.toggle("on");
  }, 1000);

  // Prevent the enter key from adding new lines on the terminal
  terminalPrompt.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  });

  // Detect user input from the terminal when enter is pressed
  terminalPrompt.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      processInput(terminalPrompt.textContent);
    }
  });

  // Handle the user input
  const processInput = (command) => {
    let input = command.toUpperCase();
    let response = "COMMAND NOT FOUND";
    if (commands.includes(input)) {
      switch (input) {
        case "BLINKY":
          animateBlinky();
          break;
        case "BBBQ":
        case "IT'S STILL GOOD":
          animatePig();
          break;
        case "FISHBULB":
          openMrSparkle();
          break;
      }
      response = "OK";
    }
    terminalPrompt.textContent = "";
    screenOutput.textContent = response;
  };
});