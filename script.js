//Metodo GET para City

function getCities() {
    axios.get('https://customers-challenge.herokuapp.com/cities').then(function (response) {
        const data = response.data._embedded.cities;
        console.log(data);
        document.getElementById("tabela").innerHTML = data.map(function (city) {
            return (
                '<tr class="alinha">' +
                '<td>' + city.name + '</td>' +
                '<td> <button type="button" class="btn btn-warning" onclick="showModalChange(\'' + city._links.self.href + '\');">Modificar</button> </td>' +
                '<td> <button type="button" class="btn btn-danger" onclick="cityDelete(\'' + city._links.self.href + '\');">Deletar</button>' +
                '</tr>'
            );
        }).join('');
    }).catch(function (error) {
        console.log(error);
    });
}
getCities();

// Metodo POST para City

function postCity() {
    document.getElementById('save').onclick = function () {
        var data = document.getElementById('city').value;
        var jsonData = JSON.stringify({ name: (data) });
        var cityJSON = JSON.parse(jsonData);

        axios.post('https://customers-challenge.herokuapp.com/cities', cityJSON)
            .then(function (response) {
                console.log(response);
                alert("Cidade cadastrada com sucesso!");
                getCities();
            })
            .catch(function (error) {
                console.log(error);
            });
    };
};

//Limpa o Modal antes de adicionar uma cidade

function showModalAdd() {
    var entradaCity = document.getElementById('city');
    entradaCity.value = "";
    postCity();
    $('#cityModal').modal("show");
};

//Altera a cidade

function showModalChange(url) {
    axios.get(url).then(function (response) {
        cityName = response.data.name;
        document.getElementById('city').value = cityName;
    })
        .catch(function (error) {
            console.log(error)
        });

    document.getElementById('save').onclick = function () {
        var data = document.getElementById('city').value;
        var jsonData = JSON.stringify({ name: (data) });
        var cityJSON = JSON.parse(jsonData);

        axios.put(url, cityJSON)
            .then(function (response) {
                console.log(response);
                alert("Cidade alterada com sucesso!");
                getCities();
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    $('#cityModal').modal("show");
};

//Metodo modifica elemento

function modifyContent(url){
    axios.get(url).then(function (response) {
        cityName = response.data.name;
        document.getElementById('nameCity').innerText = cityName;
    })
        .catch(function (error) {
            console.log(error);
        });
}

//Metodo DELETE para City

function cityDelete(url) {   
    modifyContent(url);
    document.getElementById('delete').onclick = function () {
        axios.delete(url)
            .then(function (response) {
                console.log(response);
                $('#deleteCityModal').modal("hide")
                alert("Cidade deletada com sucesso!");                
                getCities();
            })
            .catch(function (error) {
                console.log(error);
                $('#deleteCityModal').modal("hide")
                alert("Essa cidada possui clientes, não é possivel deleta-la")                
            });
    }
    $('#deleteCityModal').modal("show")
};

