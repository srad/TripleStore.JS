var SimpleGraph = require('./SimpleGraph').SimpleGraph;

var placeGraph = new SimpleGraph();

placeGraph.load('place_triples.txt', function () {
    placeGraph.triples(undefined, 'name', 'San Francisco').forEach(function (triple) {
        var nameId = triple[0];
        console.log(nameId);

        var cityData = placeGraph.triples(nameId, undefined, undefined);
        console.log(cityData);
    });

    var mayors = placeGraph.triples(undefined, 'mayor', undefined);

    mayors.forEach(function (triple) {
        var mayor = triple[2],
            cityId = triple[0],
            city = placeGraph.value(cityId, 'name', undefined);

        console.log(mayor, 'is the mayor of', city);
    });

    console.log('\nCities with their population\n---------------------------------')
    var populations = placeGraph.triples(undefined, 'population', undefined);

    populations
        .sort(function (a, b) {
            return b[2] - a[2];
        })
        .forEach(function (triple) {
            var cityId = triple[0],
                population = triple[2],
                city = placeGraph.value(cityId, 'name', undefined);

            console.log(city, 'has a population of', population);
        });
});