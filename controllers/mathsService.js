var maths = {
    addminChallenge: (count) => {
        var sums = [];
        for(i=0;i<count;i++) {
            var operator = "+";
            if (Math.random() < .5) {
              operator = "&#8722;";
            }
            var a = Math.floor(Math.random()*70 + 30);
            var b = Math.floor(Math.random()*(a-10) + 10);
            var c = a - b;
            if (operator == "+") {
                sums.push({id: i, operator: operator, top: b, bottom: c });
//              var top = b;
//              var bottom = c;
            } else {
                sums.push({id: i, operator: operator, top: a, bottom: b });
              //var top = a;
              //var bottom = b;
            }
        }
        return sums;
    },
    multdivChallenge: (count) => {
        var sums = [];
        for(i=0;i<count;i++) {
            var operator = "&#215;";    // multiplication sign
            if (Math.random() < .5) {
              operator = "&#247;";      // division sign
            }
            var a = Math.floor(Math.random()*8 + 2);
            var b = Math.floor(Math.random()*8 + 2);
            var c = a * b;
            if (operator == "&#215;") {
                sums.push({id: i, operator: operator, top: a, bottom: b });
            } else {
                sums.push({id: i, operator: operator, top: c, bottom: b });
            }
        }
        return sums;
    }
}


module.exports = maths;