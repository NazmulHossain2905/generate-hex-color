const initialApp = () => {
  const HEXHeading = document.querySelector("#HEXHeading");

  const HEXColorObj = {};

  const convertToHex = (color) => {
    return parseInt(color).toString(16).padStart(2, "0");
  };

  const showHEXColor = () => {
    const { red, green, blue } = HEXColorObj;

    const generateHEXColor = `#${convertToHex(red)}${convertToHex(
      green
    )}${convertToHex(blue)}`;

    HEXHeading.style.backgroundColor = generateHEXColor;
    HEXHeading.textContent = generateHEXColor;

    determineTextColor();
  };

  const renderScreen = () => {
    const controllerParents = document.querySelectorAll(".controllers > div");

    controllerParents.forEach((controller, index) => {
      const inputRange = controller.querySelector(`input[type="range"]`);
      const inputRangeValue = controller.querySelector("p:last-child");

      inputRangeValue.textContent = convertToHex(inputRange.value);
      HEXColorObj[inputRange.name] = inputRange.value;
      showHEXColor();

      inputRange.addEventListener("input", (e) => {
        const target = e.target;

        inputRangeValue.textContent = convertToHex(target.value);
        HEXColorObj[target.name] = target.value;
        showHEXColor();
      });
    });
  };

  // ===========================
  /*
    To dynamically change the text color of an <h1> element based on the background color, you can use JavaScript. 
    You'll need to determine the background color of the <h1> element and set the text color accordingly. 
    Here's a simple example of how you can achieve this using JavaScript:
  */

  function determineTextColor() {
    const computedStyles = getComputedStyle(HEXHeading);
    const backgroundColor = computedStyles.backgroundColor;

    const rgb = backgroundColor.match(/\d+/g);

    const luminance = 0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2];

    if (luminance > 128) {
      HEXHeading.style.color = "black";
    } else {
      HEXHeading.style.color = "white";
    }
  }

  determineTextColor();
  // ===========================

  renderScreen();
};

window.onload = initialApp;
