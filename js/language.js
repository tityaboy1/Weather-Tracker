const languageSelect = document.getElementById("languageSelect");
const translation = {
  en: {
    h1: "Check the weather in your local or anywhere",
    humidity: "humidity",
    chainofrain: "chance of rain",

    wind: "wind",
    visibility: "visibility",
    pressure: "pressure",
    Search: "Search",
    message: "Please enter the city you want to search!",
    placeholder: "Enter a city...",
  },
  kh: {
    h1: "ពិនិត្យមើលអាកាសធាតុនៅក្នុងតំបន់របស់អ្នក ឬទីកន្លែងណាក៏បាន",
    chainofrain: "ឱកាសភ្លៀង",
    humidity: "សំណើម",
    wind: "ខ្យល់",
    visibility: "ភាពអាចមើលឃើញ",
    pressure: "សម្ពាធ",
    Search: "ស្វែងរក",
    message: "សូមបញ្ចូលទីក្រុងដែលអ្នកចង់ពិនិត្យ!",
    placeholder: "បញ្ចូលទីក្រុង...",
  },
};

languageSelect.addEventListener("change", function () {
  changeLanguage(languageSelect.value);
});

function changeLanguage(language) {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    const text = translation[language][key];

    if (element.hasAttribute("placeholder")) {
      element.setAttribute("placeholder", text);
    } else {
      element.textContent = text;
    }
  });
  document.documentElement.lang = language;
  localStorage.setItem("language", language);
}

const savedLanguage = localStorage.getItem("language");
let initialLanguage;

if (savedLanguage && translation[savedLanguage]) {
  initialLanguage = savedLanguage;
} else {
  initialLanguage = languageSelect.value;
}

languageSelect.value = initialLanguage;
changeLanguage(initialLanguage);
