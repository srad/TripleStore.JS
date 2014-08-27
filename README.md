MIT LICENSE
This JavaScript code is based on the Python implementation in the book "Programming The Semantic Web"
by Toby Segaran, Colin Evans, Jamie Taylor, O'Reilly Press.

Example:

````javascript
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
````

Yields to:

````text
All Actor from Blade Runner
---------------------------
M. Emmet Walsh
William Sanderson
Morgan Paull
Harrison Ford
Daryl Hannah
Edward James Olmos
Joanna Cassidy
Rutger Hauer
Joe Turkel
James Hong
Sean Young
Brion James

Movies played by Robin Williams (R.I.P)
---------------------------------------
Jumanji
One Hour Photo
The Best of Times
What Dreams May Come
Happy Feet
Aladdin
Everyone's Hero
Jack
Cadillac Man
Night at the Museum
Mrs. Doubtfire
The Birdcage
Being Human
The Big White
A.I.
Popeye
Club Paradise
Man of the Year
The Night Listener
Awakenings
August Rush
The Fisher King
Hook
Patch Adams
Good Will Hunting
Up
FernGully: The Last Rainforest
Noel
Toys
License to Wed
Death to Smoochy
The Aristocrats
Fathers' Day
RV
Flubber
Robin Williams: Live on Broadway
Moscow on the Hudson
Dead Poets Society
The World According to Garp
"Good Morning
The Final Cut
Aladdin and the King of Thieves
Insomnia
Bicentennial Man
Seize the Day
Robots
The Adventures of Baron Munchausen
Deconstructing Harry
House of D
Dead Again
Hamlet
The Survivors
Nine Months

Movies directed by Clint Eastwood
----------------------------------
Bronco Billy
The Eiger Sanction
Firefox
Heartbreak Ridge
Letters from Iwo Jima
Sudden Impact
Midnight in the Garden of Good and Evil
The Human Factor
Space Cowboys
Million Dollar Baby
Play Misty for Me
The Changeling
Pale Rider
The Outlaw Josey Wales
Blood Work
The Bridges of Madison County
"White Hunter
Honkytonk Man
Absolute Power
Bird
The Gauntlet
Flags of Our Fathers
Mystic River
The Rookie
High Plains Drifter
A Perfect World
True Crime
Unforgiven
Breezy
````
