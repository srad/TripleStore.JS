/**
 * MIT LICENSE
 * This JavaScript code is based on the Python implementation in the book "Programming The Semantic Web"
 * by Toby Segaran, Colin Evans, Jamie Taylor, O'Reilly Press.
 * @type {exports}
 */

var fs = require('fs'),
    ReadLine = require('readline'),
    Stream = require('stream');

function SimpleGraph() {
    // subject-predicate-object
    this._spo = {};
    // predicate-object-subject
    this._pos = {};
    // object-subject-predicate
    this._osp = {};
}

SimpleGraph.prototype.add = function (sub, pred, obj) {
    this._addToIndex(this._spo, sub, pred, obj);
    this._addToIndex(this._pos, pred, obj, sub);
    this._addToIndex(this._osp, obj, sub, pred);
};

SimpleGraph.prototype._addToIndex = function (index, a, b, c) {
    if (index[a] === undefined) {
        index[a] = {};
        index[a][b] = {};
        index[a][b][c] = true;
    }
    else {
        if (index[a][b] === undefined) {
            index[a][b] = {};
            index[a][b][c] = true;
        }
        else {
            index[a][b][c] = true;
        }
    }
};

SimpleGraph.prototype.removeFromIndex = function (sub, pred, obj) {
    var triples = this.triples(sub, pred, obj);

    triples.forEach(function (triple) {
        this._removeFromIndex(this._spo, triple.sub, triple.pred, triple.obj);
        this._removeFromIndex(this._pos, triple.pred, triple.obj, triple.sub);
        this._removeFromIndex(this._osp, triple.obj, triple.sub, triple.pred);
    }.bind(this));
};

SimpleGraph.prototype._removeFromIndex = function (index, a, b, c) {
    try {
        var bs = index[a] ,
            cset = bs[b];

        delete cset[c];

        if (Object.keys(cset).length === 0) {
            delete bs[b];
        }
        if (Object.keys((bs)).length === 0) {
            delete index[a];
        }
    }
    catch (e) {
        // Index wasn't anyway set
    }
};

SimpleGraph.prototype.load = function (filename, callback) {
    var instream = fs.createReadStream(filename, {
            flags:     'r',
            encoding:  'utf8',
            fd:        null,
            mode:      0666,
            autoClose: true
        }),
        outstream = new Stream(),
        that = this;

    outstream.readable = true;
    outstream.writable = true;

    var readLine = ReadLine.createInterface({
        input:    instream,
        output:   outstream,
        terminal: false
    });

    readLine.on('line', function (line) {
        var triple = line.split(',');
        that.add(triple[0], triple[1], triple[2]);
    });

    readLine.on('error', function (err) {
        console.log(err);
    });

    readLine.on('close', callback);
};

/**
 * Pretty much all three indexes and their permutations must be traversed
 * @param sub
 * @param pred
 * @param obj
 * @returns {*}
 */
SimpleGraph.prototype.triples = function (sub, pred, obj) {
    try {
        var result = [];

        if (sub !== undefined) {
            if (pred !== undefined) {
                if (obj !== undefined) {
                    // sub pre obj
                    if (this._spo[sub][pred][obj] !== undefined) {
                        return [sub, pred, obj];
                    }
                }
                // sub pred undefined
                else {
                    for (var retObj in this._spo[sub][pred]) {
                        result.push([sub, pred, retObj]);
                    }
                    return result;
                }
            }
            else {
                // sub undefined obj
                if (obj !== undefined) {
                    for (var retPred in this._osp[obj][sub]) {
                        result.push([sub, retPred, obj]);
                    }
                    return result;
                }
                // sub undefined undefined
                else {
                    for (var retPred in this._spo[sub]) {
                        for (var retObj in this._spo[sub][retPred]) {
                            result.push([sub, retPred, retObj]);
                        }
                    }
                    return result;
                }
            }
        }
        else {
            if (pred !== undefined) {
                // undefined pred obj
                if (obj !== undefined) {
                    for (var retSub in this._pos[pred][obj]) {
                        result.push([retSub, pred, obj]);
                    }
                    return result;
                }
                // undefined pred undefined
                else {
                    for (var retObj in this._pos[pred]) {
                        for (var retSub in this._pos[pred][retObj]) {
                            result.push([retSub, pred, retObj]);
                        }
                    }
                    return result;
                }
            }
            // undefined undefined obj
            else {
                if (obj !== undefined) {
                    for (var retSub in this._osp[obj]) {
                        for (var retPred in this._osp[obj][retSub]) {
                            result.push([retSub, retPred, obj]);
                        }
                    }
                    return result;
                }
                // undefined, undefined, undefined
                else {
                    for (var retSub in this._spo) {
                        for (var retPred in this._spo[retSub]) {
                            for (var retObj in this._spo[retSub][retPred]) {
                                result.push([retSub, retPred, retObj]);
                            }
                        }
                    }
                    return result;
                }
            }
        }
    }
    catch (e) {
        return; // Wasn't index
    }
};

/**
 * Convenience function.
 * @param sub
 * @param pred
 * @param obj
 * @returns {*}
 */
SimpleGraph.prototype.value = function (sub, pred, obj) {
    var triples = this.triples(sub, pred, obj);

    for (var i = 0; i < triples.length; i += 1) {
        if (sub === undefined) {
            return triples[i][0];
        }
        if (pred === undefined) {
            return triples[i][1];
        }
        if (obj === undefined) {
            return triples[i][2];
        }
    }
};

module.exports.SimpleGraph = SimpleGraph;