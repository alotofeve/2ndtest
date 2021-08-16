$(document).ready(() => {
    $('select').on('change', function() {
        console.log($('#list').val());
        let searchText = $('#list').val();
        getCats(searchText);
        //e.preventDefault();
    });

});

function getBreeds() {
    fetch('https://api.thecatapi.com/v1/breeds', {
            headers: { 'x-api-key': '7edc2872-57d0-404a-a4cf-1d41809650f0' },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            $('#list')
                .append(
                    data.map(function(v) {
                        return $('<option/>', {
                            value: v.id,
                            text: v.name,
                        });
                    })
                )
                .change(function() {
                    console.log(this.value);
                });
        });
}

function getCats(searchText) {
    fetch('https://api.thecatapi.com/v1/images/search?breed_ids=' + searchText, {
            headers: { 'x-api-key': '7edc2872-57d0-404a-a4cf-1d41809650f0' },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data[0].breeds[0].wikipedia_url);
            let image_id = data[0].breeds[0].reference_image_id;
            let image_url = `https://cdn2.thecatapi.com/images/${image_id}.jpg`;
            let catsImgEl = document.createElement("img");
            catsImgEl.setAttribute('src', `${image_url}`);
            let catsImgDiv = document.querySelector(".catsImgDiv");
            catsImgDiv.appendChild(catsImgEl);
            $('#catsname').text(data[0].breeds[0].name);
            $('#description').text(data[0].breeds[0].description);
            $('#temperament').text(data[0].breeds[0].temperament);
        });
}
getBreeds();