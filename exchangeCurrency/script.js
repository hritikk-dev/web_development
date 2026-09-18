const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amount = document.getElementById("amount");
const result = document.getElementById("result");
const convertBtn = document.getElementById("convertBtn");
const swapBtn = document.getElementById("swapBtn");

//  Function to fetch JSON data
async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Network response was not ok");
  return await res.json();
}

//  Load currency list
async function loadCurrencies() {
  try {
    const data = await fetchJSON(
      "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json",
    );
    console.log(data);
    for (const code in data) {
      const option1 = document.createElement("option");
      const option2 = document.createElement("option");
      option1.value = option2.value = code;
      option1.textContent = option2.textContent = code.toUpperCase();
      fromCurrency.appendChild(option1);
      toCurrency.appendChild(option2);
    }
    fromCurrency.value = "usd";
    toCurrency.value = "inr";
  } catch (error) {
    result.textContent = " Failed to load currency list.";
  }
}

//  Convert currency using async/await
async function convertCurrency() {
  const base = fromCurrency.value;
  const target = toCurrency.value;
  const amt = parseFloat(amount.value);

  if (isNaN(amt) || amt <= 0) {
    result.textContent = "Please enter a valid amount.";
    return;
  }

  try {
    const data = await fetchJSON(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${base}.json`,
    );
    const rate = data[base][target];
    if (!rate) {
      result.textContent = "Conversion rate not available.";
      return;
    }
    const converted = (amt * rate).toFixed(2);
    result.textContent = `${amt} ${base.toUpperCase()} = ${converted} ${target.toUpperCase()}`;
  } catch (error) {
    result.textContent = " Error fetching conversion rate.";
  }
}

// ✅ Swap function
function swapCurrencies() {
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;
}

// Event listeners
convertBtn.addEventListener("click", convertCurrency);
swapBtn.addEventListener("click", swapCurrencies);

// Initialize app
loadCurrencies();
