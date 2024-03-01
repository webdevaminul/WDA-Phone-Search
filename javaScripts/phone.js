const loadPhone = async (inputSearchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${inputSearchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhone(phones);
};

const displayPhone = (phones) => {
  //   console.log(phones); shob gula phone dekhano

  //01. where to append
  const phoneContainer = document.getElementById("phone-container");

  //clear page before search phone
  phoneContainer.textContent = "";

  phones.forEach((phone) => {
    /*prottek array phone element k kisu korte forEach use kora hoise.*/

    console.log(phone.image);
    //02. create a div
    const phoneCard = document.createElement("div");

    //03. set innerHTML or innerText
    phoneCard.classList = `card bg-base-100 shadow-xl`;
    phoneCard.innerHTML = `
    <figure>
        <img
        src="${phone.image}"
        alt="Shoes"
        />
    </figure>
    <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
        </div>
    </div>
    `;
    // 04. append child
    phoneContainer.appendChild(phoneCard);
  });
};

// loadPhone();

//Search Button Handler
const searchHandler = () => {
  // 01. get data from input field
  const inputField = document.getElementById("input-field");
  const inputSearchText = inputField.value;
  console.log(inputSearchText);
  loadPhone(inputSearchText);
};
