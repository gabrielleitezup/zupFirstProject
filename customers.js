// Metodo GET para Customer

function getCustomers(url) {

    axios.get(url).then(function (response) {
        const resposta = response.data._embedded.customers;
        console.log(resposta);
        var text = document.getElementById("tabclientes");
        text.innerHTML = '';
        for (var i = 0; i < resposta.length; i++) {
            getCityCustomer(resposta[i]._links.city.href, function (nameCity, j) {
                html = '';
                html += '<tr class="alinha">';
                html += '<td>' + resposta[j].name + '</td>';
                html += '<td>' + nameCity.name + '</td>';
                html += '<td> <button type="button" class="btn btn-warning" onclick="cleanModalEdit(\'' + resposta[j].name + '\',\'' + nameCity._links.self.href + '\',\'' + resposta[j]._links.self.href + '\')" value=' + nameCity._links.self.href + '>Modificar</button> </td>';
                html += '<td> <button type="button" class="btn btn-danger" onclick="clienteDelete(\'' + resposta[j]._links.self.href + '\')">Deletar</button> </td>';
                html += '</tr>';
                text.innerHTML += html;
            }, i
            );
        };
    }).catch(function (error) {
        console.log(error);
    });
}

urlCustomers = 'https://customers-challenge.herokuapp.com/customers';
getCustomers(urlCustomers);

// Salva as modificações do Customer
function salvarEditar(urlCity) {

    document.getElementById('postc').onclick = function () {
        var dataCustomer = document.getElementById('inputCustomer').value;
        var dataCity = document.getElementById('city-dropdown').value;
        var dataJSON = JSON.stringify({
            name: (dataCustomer),
            city: (dataCity)
        });
        var customerJSON = JSON.parse(dataJSON);

        axios.patch(urlCity, customerJSON)
            .then(function (response) {
                console.log(response);
                alert("Cliente modificado com sucesso!");
                getCustomers('https://customers-challenge.herokuapp.com/customers');
            })
            .catch(function (error) {
                console.log(error);
            });
    };

}

//Limpa o Modal para Modificar
function cleanModalEdit(name, URLCidade, URLCustomer) {

    var inputCustomer = document.getElementById('inputCustomer')
    inputCustomer.value = name;
    getCitiesList(URLCidade);
    $('#customerModal').modal('show');
    salvarEditar(URLCustomer);
}



// Populando o <select> com as cidades

let lista = document.getElementById('city-dropdown');
lista.length = 0;

let optionPadrao = document.createElement('option');
optionPadrao.text = 'Escolha uma cidade';

lista.add(optionPadrao);
lista.selectedIndex = 0;

function getCitiesList(url) {

    axios.get('https://customers-challenge.herokuapp.com/cities').then(function (response) {
        lista.length = 0;
        const data = response.data._embedded.cities;
        let option;

        for (let i = 0; i < data.length; i++) {
            option = document.createElement('option');
            option.text = data[i].name;
            option.value = data[i]._links.self.href;
            console.log('Value: ' + option.value);
            console.log('URL: ' + url);
            if (url == option.value) {
                var achei = i;
            }

            lista.add(option);
        }
        lista.selectedIndex = achei;
    }).catch(function (error) {
        console.log(error);
    });
}
getCitiesList();

// Metodo POST para Customer

function postCustomer() {
    document.getElementById('postc').onclick = function () {
        var dataCustomer = document.getElementById('inputCustomer').value;
        var dataCity = document.getElementById('city-dropdown').value;
        var dataJSON = JSON.stringify({
            name: (dataCustomer),
            city: (dataCity)
        });
        var customerJSON = JSON.parse(dataJSON);

        axios.post('https://customers-challenge.herokuapp.com/customers', customerJSON)
            .then(function (response) {
                console.log(response);
                alert("Cliente cadastrado com sucesso!");
                getCustomers('https://customers-challenge.herokuapp.com/customers');
            })
            .catch(function (error) {
                console.log(error);
            });
    };
};

// Metodo DELETE para Customer

function clienteDelete(url) {

    document.getElementById('deleteCustomer').onclick = function () {
        axios.delete(url)
            .then(function (response) {
                console.log(response);
                $('#deleteCustomerModal').modal("hide")
                alert("Customer deletado com sucesso!");
                getCustomers('https://customers-challenge.herokuapp.com/customers');
            })
            .catch(function (error) {
                console.log(error);
                $('#deleteCustomerModal').modal("hide");
                alert('Não foi possível deletar o cliente!');
            });
    }
    $('#deleteCustomerModal').modal("show")
};

//Metodo de SEARCH

function searchCustomer() {

    var url = 'https://customers-challenge.herokuapp.com/customers/search/findByNameIgnoreCaseContaining?name=';
    var inputSearch = document.getElementById('inputSearch').value;
    url += inputSearch;
    // console.log(url);
    getCustomers(url);
};

//////////////////////////////////////////////

//Metodo para limpar a entrada do Modal

function cleanModalAdd() {

    var inputCustomer = document.getElementById('inputCustomer')
    inputCustomer.value = "";
    lista.selectedIndex = 0;
    postCustomer();
    $('#customerModal').modal('show');
}



// Metodo para Modificar o CUSTOMER

function changeCustomer(url) {

    axios.get(url)
        .then(function (response) {
            // console.log(response);
            customerName = response.data.name;
            document.getElementById('inputCustomer').value = customerName;

        })
        .catch(function (error) {
            console.log(error);
        });

    document.getElementById('postc').onclick = function () {
        var nome = document.getElementById('inputCustomer').value;
        var jsonData = JSON.stringify({})
    }
}

function getCityCustomer(url, callback, i) {
    
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.send();
    request.responseType = 'json';
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.response)
            callback(this.response, i);
        }
    }  

}
