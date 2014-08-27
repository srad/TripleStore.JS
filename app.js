var SimpleGraph = require('./SimpleGraph').SimpleGraph;

var movieGraph = new SimpleGraph();

/*
 movieGraph.add('blade_runner', 'name', 'Blade Runner');
 movieGraph.add('blade_runner', 'directed_by', 'ridley_scott');
 movieGraph.add('ridley_scott', 'name', 'Ridley Scott');

 console.log(movieGraph.triples('blade_runner', 'directed_by', undefined));
 console.log();
 console.log(movieGraph.triples(undefined, 'name', undefined));
 console.log();
 console.log(movieGraph.value('blade_runner', 'directed_by', undefined));
 console.log();
 console.log(movieGraph.triples(undefined, undefined, undefined));
 */

var graph = new SimpleGraph();

graph.load('movies.csv', function () {
    console.log('All Actor from Blade Runner');
    console.log('---------------------------');
    var bladeRunnerId = graph.value(undefined, 'name', 'Blade Runner');
    graph.triples(bladeRunnerId, 'starring', undefined).forEach(function (triple) {
        var actorId = triple[2];
        graph.triples(actorId, 'name', undefined).forEach(function (triple) {
            console.log(triple[2]);
        });
    });

    console.log('\nMovies played by Robin Williams (R.I.P)');
    console.log('---------------------------------------');
    var actorId = graph.value(undefined, 'name', 'Robin Williams');

    graph.triples(undefined, 'starring', actorId).forEach(function (triple) {
        var movieId = triple[0];
        var movie = graph.value(movieId, 'name', undefined);
        console.log(movie);
    });

    console.log('\nMovies directed by Clint Eastwood');
    console.log('----------------------------------');

    var clintId = graph.value(undefined, 'name', 'Clint Eastwood');

    graph.triples(undefined, 'directed_by', clintId).forEach(function (triple) {
        var movieId = triple[0];
        var movie = graph.value(movieId, 'name', undefined);
        console.log(movie);
    });
});