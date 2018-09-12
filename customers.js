// Metodo GET para Customer

function getCustomers() {
    axios.get('https://customers-challenge.herokuapp.com/customers').then(function (response) {
        const data = response.data._embedded.customers;
        console.log(data);
        document.getElementById("tabclientes").innerHTML = data.map(function (cliente) {
            return (
                '<tr>' +
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

getCustomers();

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
        var dataCustomer = document.getElementById('customer').value;
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
                getCustomers();
            })
            .catch(function (error) {
                console.log(error);
            });
    };
};
postCustomer();

// Metodo DELETE para Customer

function clienteDelete(url) {
    document.getElementById('deleteCustomer').onclick = function () {
        axios.delete(url)
            .then(function (response) {
                console.log(response);
                $('#deleteCustomerModal').modal("hide")
                alert("Customer deletado com sucesso!");
                getCustomers();
            })
            .catch(function (error) {
                console.log(error);
                $('#deleteCustomerModal').modal("hide");
                alert('Não foi possível deletar o cliente!');
            });
    }
    $('#deleteCustomerModal').modal("show")
};

// Metodo para exibir CUSTOMER na tabela(BUGADO)
function getCityCustomer(url) {
    axios.get(url)
        .then(function (response) {
            console.log(response);
            cityName = JSON.stringify(response.data.name);
        })
        .catch(function (error) {
            console.log(error);
        });

}
