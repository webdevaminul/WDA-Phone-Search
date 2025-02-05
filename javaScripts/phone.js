let currentPage = 1;
const itemsPerPage = 6;
let allPhones = [];

const loadPhone = async (inputSearchText = "samsung") => {
  try {
    document.getElementById(
      "phone-container"
    ).innerHTML = `<p class="text-center text-xl font-semibold text-gray-600">Loading...</p>`;

    const res = await fetch(
      `https://openapi.programming-hero.com/api/phones?search=${inputSearchText}`
    );
    const data = await res.json();
    allPhones = data.data;

    currentPage = 1;
    displayPhone();
  } catch (error) {
    console.error("Error fetching phones:", error);
    document.getElementById("phone-container").innerHTML =
      "<p class='text-red-500 text-center'>Failed to load phones. Please try again.</p>";
  }
};

const displayPhone = () => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPhones = allPhones.slice(startIndex, startIndex + itemsPerPage);

  if (paginatedPhones.length === 0) {
    phoneContainer.innerHTML = `<p class="text-center text-red-500 text-lg">No phones found. Try another search.</p>`;
    return;
  }

  paginatedPhones.forEach((phone) => {
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-white rounded-lg p-4 hover:shadow-xl transition duration-300`;
    phoneCard.innerHTML = `
      <figure class="flex justify-center h-48">
          <img src="${phone.image}" alt="${phone.phone_name}" class="h-full object-cover rounded-md"/>
      </figure>
      <div class="card-body text-center p-4">
          <h2 class="card-title text-lg font-bold">${phone.phone_name}</h2>
          <p class="text-gray-500 text-sm">A high-performance phone with cutting-edge technology.</p>
          <div class="card-actions justify-center mt-3">
              <button class="btn btn-ghost px-4 py-2 rounded-full">View Details</button>
          </div>
      </div>
    `;
    phoneContainer.appendChild(phoneCard);
  });

  updatePaginationButtons();
};

const searchHandler = () => {
  const inputField = document.getElementById("input-field");
  const inputSearchText = inputField.value.trim();

  if (inputSearchText === "") {
    alert("Please enter a search term!");
    loadPhone();
  } else {
    loadPhone(inputSearchText);
  }
};

const nextPage = () => {
  if (currentPage * itemsPerPage < allPhones.length) {
    currentPage++;
    displayPhone();
  }
};

const prevPage = () => {
  if (currentPage > 1) {
    currentPage--;
    displayPhone();
  }
};

const updatePaginationButtons = () => {
  document.getElementById("prev-btn").disabled = currentPage === 1;
  document.getElementById("next-btn").disabled = currentPage * itemsPerPage >= allPhones.length;
};

// Load default phones
loadPhone();
