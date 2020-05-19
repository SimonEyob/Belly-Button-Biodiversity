function getData(id){
    d3.json("samples.json").then(data=>{
        console.log(data);
        var ids= data.samples[0].otu_ids.slice(0,10);
        var otuIds=ids.map(d=>"OTU "+d);
        console.log(otuIds)

        var sampleValues=data.samples[0].sample_values.slice(0,10);
        console.log(sampleValues);
        
        var otuLabels =data.samples[0].otu_labels.slice(0,10);
        console.log(otuLabels);
        var trace = {
            x: sampleValues.reverse(),
            y: otuIds.reverse(),
            text: otuLabels.reverse(),
            marker: {
            color: 'blue'},
            type:"bar",
            orientation: "h",
        };
        // create data variable
        var datainfo = [trace];

        // create layout variable to set plots layout
        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };

    // create the bar plot
    Plotly.newPlot("bar", datainfo, layout);

    // create the buble chart
    var trace1 = {
        x: data.samples[0].otu_ids,
        y: data.samples[0].sample_values,
        mode: "markers",
        marker: {
            size: data.samples[0].sample_values,
            color: data.samples[0].otu_ids
        },
        text: data.samples[0].otu_labels

    };

    // set the layout for the bubble plot
    var layout_2 = {
        xaxis:{title: "OTU ID"},
        height: 600,
        width: 1000
    };

    // creating data variable 
    var data1 = [trace1];

// create the bubble plot
Plotly.newPlot("bubble", data1, layout_2); 

    });
};

function getDataInfo(id){
    d3.json("samples.json").then((data)=>{
        // get the metadata info for the demographic panel
        var nameInfo=data.metadata;
        console.log(nameInfo[0]);
        // filter by id for info
        var nameInfoResult= nameInfo.filter(info=>info.id.toString()===id)[0];
       
        // grab demographics tab in html
        var demographicInfo = d3.select("#sample-metadata");
        
        // empty the demographic info panel each time before getting new id info
        demographicInfo.html("");

        // grab key value pairs and enter in tab
        Object.entries(nameInfoResult).forEach((key)=>{
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        
        });
    });
}
// create function to make the bouns graph


// create the function for the change event
function optionChanged(id) {
    getData(id);
    getDataInfo(id);
}

// create the function for the initial data rendering
function init() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");

    // read the data 
    d3.json("samples.json").then((data)=> {
        console.log(data)

        // get the id data to the dropdwown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // call the functions to display the data and the plots to the page
        getData(data.names[0]);
        getDataInfo(data.names[0]);
    });
}
init();

