document.addEventListener("DOMContentLoaded", function () {
    getAllBreeds();
});

async function getAllBreeds() {
    try {
        const response = await axios.get('https://dog.ceo/api/breeds/list/all');
        const getAllBr = response.data.message;
        showAllBreeds(getAllBr);
    } catch (error) {
        console.error('Error en la funcion getAllBreeds' + error);
    }
};

function showAllBreeds(getAllBr) {
    const breed = document.getElementById('breed');

    for (const allBreed in getAllBr) {

        const subBreeds = getAllBr[allBreed];

        if (subBreeds.length == 0) {
            const option = document.createElement('option');
            option.value = allBreed;
            option.textContent = allBreed;
            breed.appendChild(option);
        } else {
            const optgroup = document.createElement('optgroup');
            optgroup.label = allBreed;

            subBreeds.forEach(element => {
                const subLi = document.createElement('option');
                subLi.value = `${allBreed}/${element}`;
                subLi.textContent = `${allBreed}/${element}`;
                optgroup.appendChild(subLi);
            });
            breed.appendChild(optgroup);
        }
    }
};


breed.addEventListener('change', function() {
    const br = breed.value;
    getBreedsImg(br);
});

async function getBreedsImg(br) {
    try {
        const result = await axios.get(`https://dog.ceo/api/breed/${br}/images`);
        const dogBreed = result.data.message;
        show(dogBreed);
    } catch (error) {
        console.error('Error en la funcion getBreedsImg' + error);
    }
};

function show(dogBreed) {
    const imgContainer = document.getElementById('imgContainer');
    imgContainer.innerHTML = "";

    const cantContainer = document.getElementById('cantContainer');
    cantContainer.innerHTML = "";

    const cant = dogBreed.length;
    cantContainer.textContent = cant;

    dogBreed.forEach(element => {
        const img = document.createElement('img');
        img.src = element;
        imgContainer.appendChild(img);
    })
};