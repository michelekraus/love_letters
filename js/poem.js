    var terminals = {};
    var startwords = [];
    var wordstats = {};
    var poems = CORPUS;


    for (var i = 0; i < poems.length; i++) {
        var words = poems[i].split(' ');
        terminals[words[words.length-1]] = true;
        startwords.push(words[0]);
        for (var j = 0; j < words.length - 1; j++) {
            if (wordstats.hasOwnProperty(words[j])) {
                wordstats[words[j]].push(words[j+1]);
            } else {
                wordstats[words[j]] = [words[j+1]];
            }
        }
    }

    var choice = function (a) {
        var i = Math.floor(a.length * Math.random());
        return a[i];
    };

    var make_poem = function (min_length) {
        word = choice(startwords);
        var poem = [word];
        while (wordstats.hasOwnProperty(word)) {
            var next_words = wordstats[word];
            word = choice(next_words);
            poem.push(word);
            if (poem.length > min_length && terminals.hasOwnProperty(word)) break;
        }
        if (poem.length < min_length) return make_poem(min_length);
        return poem.join(' ');
    };

$(document).ready(function(){
    $('#generate').on('click', function () {
    var poem = make_poem(2 + Math.floor(2 * Math.random()));
    $('#generated_poem').html(poem);
    });
});
