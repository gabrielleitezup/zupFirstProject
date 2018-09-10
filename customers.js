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

        for(let i=0;i< data.length;i++){
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