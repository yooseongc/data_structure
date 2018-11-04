
// initialization START

var workspace = document.getElementById("workspace");
var q = new Queue('c', 10);
var viz = new QViz(workspace, q);
console.log('init queue ...');
// q.enqueue("1");
// q.enqueue("2");
// q.enqueue("3");
// q.enqueue("4");

q.show();


// initialization END

function run() {
    //viz.clearQ();
    workspace.childNodes.forEach(n => {
        workspace.removeChild(n);
    });
    d3.selectAll('svg').remove();
    
    var codes = document.getElementById("code");
    var script = document.createElement("script");
    script.text = codes.value;
    workspace.appendChild(script);
    viz.render();
}


/**
 * Queue Visualizer
 * @param parent : parent DOM which is parent of VIZ section.
 * @param q : Queue Object to Visualize.
 */
function QViz(parent, q) {

    this.width = parent.width;
    this.height = parent.height;
    this.q = q;

    this.clearQ = function() {
        this.q.clear();
    }

    /**
     * draw queue using d3.
     */
    this.render = function() {
        var qu = this.q;
        var maxLength = qu.maxSize;
        var qContainer = d3.select(workspace).append("svg")
                                               .attr("width", 50 * maxLength)
                                               .attr("height", 100);
        qContainer.append("rect").attr("width", "100%")
                                 .attr("height", 50)
                                 .attr("fill", d3.rgb(12, 67, 199));
        var items = qu._dataStore.slice();
        for (var i = 0; i < items.length; i++) {
            var value = items[i];
            if (value == null) continue;
            var rect = qContainer.append("rect")
                                 .attr("x", 5 + i * 50)
                                 .attr("y", 5)
                                 .attr("width", 40)
                                 .attr("height", 40)
                                 .attr("stroke", "black")
                                 .attr("fill", "teal");
            var text = qContainer.append("text");
            var tlabel = text.attr("x", 5 + i * 50 + 17)
                             .attr("y", 30)
                             .text(value)
                             .attr("fill", "white");
        }
        var front = qu.front;
        var end   = qu.end;
        qContainer.append("rect")
                    .attr("x", 5 + front * 50)
                    .attr("y", 60)
                    .attr("width", 40)
                    .attr("height", 20)
                    .attr("fill", "red");
        qContainer.append("text")
                    .attr("font-size", "10px")
                    .attr("x", 5 + front * 50 + 15)
                    .attr("y", 72)
                    .text("front")
                    .attr("fill", "white");
        qContainer.append("rect")
                    .attr("x", 5 + end * 50)
                    .attr("y", 80)
                    .attr("width", 40)
                    .attr("height", 20)
                    .attr("fill", "blue");
        qContainer.append("text")
                    .attr("font-size", "10px")
                    .attr("x", 5 + end * 50 + 15)
                    .attr("y", 92)
                    .text("end")
                    .attr("fill", "white");

    }
}