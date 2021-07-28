$(function () {
    const api_key = "at_eB0vJJIbmk03RU4PpNzE9ZFoUCIhL";
    getIp();

    function getData(ip) {
        $.ajax({
            url: "https://geo.ipify.org/api/v1",
            data: {
                apiKey: api_key,
                ipAddress: ip
            },
            success: function (data) {
                const fullData = JSON.parse(JSON.stringify(data, "", 2));
                const ipAddress = fullData.ip;
                const country = fullData.location.country;
                const city = fullData.location.city;
                const postalCode = fullData.location.postalCode;
                const timeZone = fullData.location.timezone;
                const isp = fullData.isp;
                const x = fullData.location.lat;
                const y = fullData.location.lng;
                console.log(fullData);
                const dataPresent = [...document.querySelectorAll('.element-data')];
                dataPresent[0].textContent = ipAddress;
                dataPresent[1].textContent = `${city}, ${country} ${postalCode}`;
                dataPresent[2].textContent = timeZone;
                dataPresent[3].textContent = isp;
                generateMap(x, y);
            }
        });
    };

    function getIp() {
        console.log("Getting ip");
        const ip = document.querySelector('input[type=text]').value;
        if (ip == '') {
            getData('');
        } else {
            const regEx = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
            if (regEx.test(ip)) {
                getData(ip);
            } else {
                alert("Wrong ip address!");
            }
        }
    }

    function generateMap(x, y) {
        document.querySelector('.map').innerHTML = `<div id="mapid"></div>`;
        let mymap = L.map('mapid').setView([x, y], 13);
        const pin = L.icon({
            iconUrl: '/images/icon-location.svg',
            iconSize: [46, 56],
            iconAnchor: [23, 55]
        });
        let marker = L.marker([x, y], {
            icon: pin
        }).addTo(mymap);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/outdoors-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoicDFlcnV0IiwiYSI6ImNra3N0aThvZzNzdHcyb3F0Y2pmZjR0Mm4ifQ.2iiyQqnxYxgN-r5q_xMXpg'
        }).addTo(mymap);
    };
    document.querySelector('button').addEventListener('click', () => getIp());

    console.log("Here i am");
});

/*
    JEST W PEŁNI ZROBIONA:
        -MAPA
        -ZNACZNIK
        -POBRANIE IP GEOLOCATION
        -ZMIANA POŁOŻENIA NA MAPIE
    DO ZROBIENIA:
        -SEKCJA Z PREZENTACJĄ DANYCH
        -WPISANIE DANYCH DO SEKCJI (Zamysł jak to zrobić jest, tylko ubrać w ładnego diva)
        -RWD
*/