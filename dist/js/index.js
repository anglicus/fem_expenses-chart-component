const MAX_HEIGHT = 150; // max height of graph bar

// make sure DOM content loaded before getting data and 
// using it to style elements
window.addEventListener('DOMContentLoaded', (e) => {
  fetch("data/data.json")
    .then(response => {
      if (response.status >= 200 && response.status <=299) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(data => parseData(data))
  .catch((error) => {
      displayError();
      console.log("There was an error loading data.");
  })
});

// function to style the graph based on the data
function parseData(data) {
  let max = 0;
  const graphSections = document.getElementsByClassName("spending__graph-section");
  // calculate total amount and
  // determine the maximum so as to scale
  for (let i = 0; i < data.length; i++) {
    if (data[i].amount > max) {
      max = data[i].amount;
    }
  }

  // add labeling to each element and
  // scale bar heights based on max found in previous loop
  // also mark highest bar(s) for highlighting
  for (let i = 0; i < data.length; i++) {
    const graphBar = graphSections[i].querySelector(".spending__graph-bar");
    const dayLabel = graphSections[i].querySelector(".spending__day-label");
    const amountLabel = graphSections[i].querySelector(".spending__graph-amount-label");
    const heightAmount = ((data[i].amount / max) * 150).toFixed(2);
    const heightValue = heightAmount.toString() + "px";
    graphBar.style.height = heightValue;
    // allow for close amounts to both be highlighted with > 0.99
    if (data[i].amount / max > 0.99) {
      graphBar.classList.add("max-bar");
    }
    dayLabel.textContent = data[i].day;
    amountLabel.textContent = "$" + data[i].amount.toString();
  }
}

// function to make error message visible if data fails to load
function displayError() {
  document.querySelector(".spending__error-message").setAttribute('style','display: block');
}