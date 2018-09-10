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
            })
            .catch(function (error) {
                console.log(error);
            });
    };
};
postCustomer();