document.addEventListener("DOMContentLoaded", function () {
  const billInput = document.getElementById("billTotal");
  const tipSlider = document.getElementById("tipRange");
  const tipPercentage = document.getElementById("tipPercentage");
  const tipAmount = document.getElementById("tipAmount");
  const totalWithTip = document.getElementById("totalWithTip");
  const totalWithTax = document.getElementById("totalWithTax");
  const grandTotal = document.getElementById("grandTotal");
  const errorMsg = document.getElementById("error");

  const currencySelect = document.getElementById("currency");
  const convertedTotal = document.getElementById("convertedTotal");

  function updateValues() {
    const bill = parseFloat(billInput.value);
    const tip = parseInt(tipSlider.value);

    if (isNaN(bill) || bill < 0) {
      errorMsg.textContent = "Please enter a valid, non-negative number.";
      tipPercentage.value = "";
      tipAmount.value = "";
      totalWithTip.value = "";
      totalWithTax.value = "";
      grandTotal.value = "";
      convertedTotal.value = "";
      return;
    } else {
      errorMsg.textContent = "";
    }

    tipPercentage.value = tip;
    const tipValue = bill * (tip / 100);
    const totalTip = bill + tipValue;
    const taxValue = bill * 0.11;
    const finalTotal = bill + taxValue + tipValue;

    tipAmount.value = tipValue.toFixed(2);
    totalWithTip.value = totalTip.toFixed(2);
    totalWithTax.value = (bill + taxValue).toFixed(2);
    grandTotal.value = finalTotal.toFixed(2);
    
    if (!currencySelect.value) {
      convertedTotal.value = "";
    } else {
      let converted = "";
      if (currencySelect.value === "inr") {
        converted = "₹" + (finalTotal * 83.28).toFixed(2);
      } else if (currencySelect.value === "eur") {
        converted = "€" + (finalTotal * 0.93).toFixed(2);
      }
      convertedTotal.value = converted;
    }
  }

  billInput.addEventListener("input", function () {
    if (billInput.value === "0") {
      billInput.value = "";
      tipPercentage.value = "";
      tipAmount.value = "";
      totalWithTip.value = "";
      totalWithTax.value = "";
      grandTotal.value = "";
      convertedTotal.value = "";
      errorMsg.textContent = "";
    } else {
      updateValues();
    }
  });

  tipSlider.addEventListener("input", updateValues);
  currencySelect.addEventListener("change", updateValues);
});
