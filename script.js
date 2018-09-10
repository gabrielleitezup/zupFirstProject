function getCities() {
    axios.get('https://customers-challenge.herokuapp.com/cities').then(function (response) {
        const data = response.data._embedded.cities;
        console.log(data);
        document.getElementById("tabela").innerHTML = data.map(function (city) {
            return (
                '<tr>' +
                '<td>' + city.name + '</td>' +
                '</tr>'
            );
        }).join('');
    }).catch(function (error) {
        console.log(error);
    });
}
getCities();


function postCity() {
    document.getElementById('post').onclick = function() {
        var data = document.getElementById('city').value;
        var jsonData = JSON.stringify({ name: (data) });
        var cityJSON = JSON.parse(jsonData);

            axios.post('https://customers-challenge.herokuapp.com/cities', cityJSON)
                .then(function(response) {
                    console.log(response);
                    alert("Cidade cadastrada com sucesso!");
                    getCities();
                })
                .catch(function(error) {
                    console.log(error);
                });
    };
};

postCity();
