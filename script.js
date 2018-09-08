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

function getCustomers() {
    axios.get('https://customers-challenge.herokuapp.com/customers').then(function (response) {
        const data = response.data._embedded.customers;
        document.getElementById("tabclientes").innerHTML = data.map(function (cliente) {
            return (
                '<tr>' +
                '<td>' + cliente.name + '</td>' +
                '</tr>'
            );
        }).join('')
    }).catch(function (error) {
        console.log(error);
    });
}

getCustomers();