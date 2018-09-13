// Metodo GET para Customer

function getCustomers(url) {
    axios.get(url).then(function (response) {
        const data = response.data._embedded.customers;
        console.log(data);
        document.getElementById("tabclientes").innerHTML = data.map(function (cliente) {
            return (
                '<tr class="alinha">' +
                '<td>' + cliente.name + '</td>' +
                '<td>' + getCityCustomer(cliente._links.city.href) + '</td>' +
                '<td> <button type="button" class="btn btn-warning">Modificar</button> </td>' +
                '<td> <button type="button" class="btn btn-danger" onclick="clienteDelete(\'' + cliente._links.self.href + '\')">Deletar</button> </td>' +
                '</tr>'
            );
        }).join('')
    }).catch(function (error) {
        console.log(error);
    });
}
urlCustomers = 'https://customers-challenge.herokuapp.com/customers';
getCustomers(urlCustomers);

// Populando o <select> com as cidades

let lista = document.getElementById('city-dropdown');
lista.length = 0;

let optionPadrao = document.createElement('option');
optionPadrao.text = 'Escolha uma cidade';

lista.add(optionPadrao);
lista.selectedIndex = 0;

function getCitiesList() {
    axios.get('https://customers-challenge.herokuapp.com/cities').then(function (response) {
        const data = response.data._embedded.cities;
        let option;

        for (let i = 0; i < data.length; i++) {
            option = document.createElement('option');
            option.text = data[i].name;
            option.value = data[i]._links.self.href;
            lista.add(option);
        }
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
    postCustomer();
    $('#customerModal').modal('show');
}

// Metodo para Modificar o CUSTOMER

function changeCustomer(url) {
    axios.get(url)
    .then(function(response){
        console.log(response);
        customerName = response.data.name;
        document.getElementById('inputCustomer').value = customerName;
    })
}
console.log(lista);

// Metodo para exibir cidade do CUSTOMER na tabela(BUGADO)
function getCityCustomer(url) {
    return axios.get(url)
        .then(function (response) {
            console.log(response);
            var cityName = JSON.stringify(response.data.name);
            return cityName;
        })
        .catch(function (error) {
            console.log(error);
        });

}
