// write your code here
document.addEventListener("DOMContentLoaded", () => {

    const menu = document.querySelector('#ramen-menu');
    const r = [];
    const form = document.querySelector('#new-ramen');
    

    const getMenu = () => {
        fetch('http://localhost:3000/ramens')
            .then(response => response.json())
            .then(ramen => {
                ramen.forEach(element => {
                    const img = document.createElement('img');
                    img.id = element.id;
                    img.name = element.name;
                    img.src = element.image;
                    r.push({
                        restaurant: element.restaurant,
                        rating: element.rating,
                        comment: element.comment
                    });

                    menu.append(img);
                });
            })
    }
    getMenu();

    menu.addEventListener('click', (e) => {
        const detail = document.querySelector('.detail-image');
        const nameMenu = document.querySelector('.name');
        const restaurantName = document.querySelector('.restaurant');
        const rating = document.querySelector('#rating-display');
        const comment = document.querySelector('#comment-display');

        detail.src = e.target.src;
        nameMenu.textContent = e.target.name;
        restaurantName.textContent = r[e.target.id - 1].restaurant;
        rating.textContent = r[e.target.id - 1].rating;
        comment.textContent = r[e.target.id - 1].comment;
    })





    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const newRamen = {
            name: e.target['name'].value,
            restaurant: e.target['restaurant'].value,
            image: e.target['image'].value,
            rating: e.target['rating'].value,
            comment: e.target['new-comment'].value
        };

        fetch('http://localhost:3000/ramens', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newRamen)
        })
    })


});