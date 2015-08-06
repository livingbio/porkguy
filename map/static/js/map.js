function initialize() {
    // Create an array of styles.
    var styles = [{
        stylers: [
            { visibility: "off" }
        ]
    }];
    // Create a new StyledMapType object, passing it the array of styles,
    // as well as the name to be displayed on the map type control.
    var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});
    // Create a map object, and include the MapTypeId to add
    // to the map type control.
    var mapOptions1 = {
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        },
        backgroundColor:'#ffe24d',
        zoom: 8,
        center: {lat: 23.73763123744288, lng: 119.52077989062502},
        scrollwheel: false,
        draggable: false,
        panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        overviewMapControl: false,
        disableDoubleClickZoom: true
    };

    var mapOptions2 = {
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        },
        backgroundColor:'#ffe24d',
        scrollwheel: false,
        draggable: false,
        panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        overviewMapControl: false,
        disableDoubleClickZoom: true
    };

    var mapOptions3 = {
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        },
        backgroundColor:'#ffe24d',
        scrollwheel: false,
        draggable: false,
        panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        overviewMapControl: false,
        disableDoubleClickZoom: true
    };
    
    mapOptions_detail = {
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        },
        backgroundColor:'#ffe24d',
        scrollwheel: true,
        draggable: true,
        disableDoubleClickZoom: false,
        panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        overviewMapControl: false
    };

    map1 = new google.maps.Map(document.getElementById('map-canvas-1'), mapOptions1);
    map2 = new google.maps.Map(document.getElementById('map-canvas-2'), mapOptions2);
    map3 = new google.maps.Map(document.getElementById('map-canvas-3'), mapOptions3);
    //Associate the styled map with the MapTypeId and set it to display.
    map1.mapTypes.set('map_style', styledMap);
    map1.setMapTypeId('map_style');
    map2.mapTypes.set('map_style', styledMap);
    map2.setMapTypeId('map_style');
    map3.mapTypes.set('map_style', styledMap);
    map3.setMapTypeId('map_style');

    var map2_sw = new google.maps.LatLng(county[21]['sw_latitude'], county[21]['sw_longitude']);
    var map2_ne = new google.maps.LatLng(county[21]['ne_latitude'], county[21]['ne_longitude']);
    var map2_bounds = new google.maps.LatLngBounds(map2_sw,map2_ne);
    map2.fitBounds(map2_bounds);

    var map3_sw = new google.maps.LatLng(county[20]['sw_latitude'], county[20]['sw_longitude']);
    var map3_ne = new google.maps.LatLng(county[20]['ne_latitude'], county[20]['ne_longitude']);
    var map3_bounds = new google.maps.LatLngBounds(map3_sw,map3_ne);
    map3.fitBounds(map3_bounds);
    map_detailed = false;
    yearshow1 = document.getElementById('demo-category').value;
    yearshow2 = document.getElementById('year').value;
    datashow = 0;

    document.getElementById('demo-category').addEventListener('change', function() {
        yearshow1 = document.getElementById('demo-category').value;
        dataVisual(yearshow1, datashow);
        // barchart();
    });

    document.getElementById('yearly').addEventListener('change', function() {
        yearshow2 = document.getElementById('yearly').value;
        if (document.getElementById('noapplied').checked) {
            for (var i = charity.length - 1; i >= 0; i--) {
                if (charity[i]['yearly'][yearshow2]['money'] == "未申請") {
                    charity[i]['marker']['object'].setVisible(true);
                }else{
                    charity[i]['marker']['object'].setVisible(false);
                };
            };
        }else if (document.getElementById('applied').checked) {
            for (var i = charity.length - 1; i >= 0; i--) {
                if (charity[i]['yearly'][yearshow2]['money'] != "未申請") {
                    charity[i]['marker']['object'].setVisible(true);
                }else{
                    charity[i]['marker']['object'].setVisible(false);
                };
            };
        };
    });

    $('input').on('click', function(){
        if (!map_detailed) {
            if(this.id == 'profit-distribut'){ 
                datashow = 0;
                $('#year').show();
            };
            if(this.id == 'charity'){ 
                datashow = 1;
                $('#year').hide();
            };
            if(this.id == 'prize'){ 
                datashow = 2;
                $('#year').hide();
            };
            dataVisual(yearshow1, datashow);
            // barchart();
        }else{
            $('#store_detail').hide();
            $('#org_detail').hide()
            if(this.id == 'organizations'){ 
                $('#application').show();
                for (var i = store_data.length - 1; i >= 0; i--) {
                    store_data[i]['marker']['object'].setVisible(false);
                };
                $('#noapplied').prop("checked", true);
                for (var i = charity.length - 1; i >= 0; i--) {
                    if (charity[i]['yearly'][yearshow2]['money'] == "未申請") {
                        charity[i]['marker']['object'].setVisible(true);
                    };
                };
            };
            if(this.id == 'store'){ 
                $('#application').hide();
                for (var i = charity.length - 1; i >= 0; i--) {
                    charity[i]['marker']['object'].setVisible(false);
                };
                for (var i = store_data.length - 1; i >= 0; i--) {
                    store_data[i]['marker']['object'].setVisible(true);
                };
            };
            if (this.id == 'noapplied') {
                for (var i = charity.length - 1; i >= 0; i--) {
                    if (charity[i]['yearly'][yearshow2]['money'] == "未申請") {
                        charity[i]['marker']['object'].setVisible(true);
                    }else{
                        charity[i]['marker']['object'].setVisible(false);
                    };
                };
            };
            if (this.id == 'applied') {
                for (var i = charity.length - 1; i >= 0; i--) {
                    if (charity[i]['yearly'][yearshow2]['money'] != "未申請") {
                        charity[i]['marker']['object'].setVisible(true);
                    }else{
                        charity[i]['marker']['object'].setVisible(false);
                    };
                };
            };
        };
    });

    countyData = {};
    chartdata=[];
    for (var i = county.length - 1; i >= 0; i--) {
        // (function (i){
        //     $.getJSON("static/json/county"+i+".json", function(data){
        //     geoJsonObject = topojson.feature(data, data.objects["1031225_big5"]);
        //     console.log(i, , geoJsonObject['features'][0]["properties"]["C_Name"], county[i-1]['name']);

        //     });
        // })(i);
        var id =  county[i]['id'];
        var money1, money2, money3, money4, money5, times, count1, count2;
        for (var j = 21; j >= 0; j--) {
            if (fund_103[j]['city'] == id) {
                money1 = fund_103[j]['money__sum'];
            };
            if (fund_102[j]['city'] == id) {
                money2 = fund_102[j]['money__sum'];
            };
            if (fund_101[j]['city'] == id) {
                money3 = fund_101[j]['money__sum'];
            };
            if (fund_100[j]['city'] == id) {
                money4 = fund_100[j]['money__sum'];
            };
            if (surp_103[j]['city'] == id) {
                money5 = surp_103[j]['surplus__sum'];
            };
            if (prizes[j]) {
                if (prizes[j]['city'] == id) {
                    times = prizes[j]['firstprize_times__sum'];
                };
            }else{
                times = 0;
            };
            if (store_count[j]) {
                if (store_count[j]['city'] == id) {
                    count1 = store_count[j]['address__count'];
                };
            }else{
                count1 = 0;
            };
            if (org_count[j]) {
                if (org_count[j]['city'] == id) {
                    count2 = org_count[j]['address__count'];
                };
            }else{
                count2 = 0;
            };
        }
        countyData[id] = {
            "name":county[i]['name'],
            "location":{
                "lat":county[i]['center_latitude'],
                "lng":county[i]['center_longitude']
            },
            "bounds":{
                "ne":{
                    "lat":county[i]['ne_latitude'],
                    "lng":county[i]['ne_longitude']
                },
                "sw":{
                    "lat":county[i]['sw_latitude'],
                    "lng":county[i]['sw_longitude']
                }
            },
            "money":{
                "fund":{
                    103:money1,
                    102:money2,
                    101:money3,
                    100:money4
                },
                "surp":money5
            },
            "count":{
                "prize":times,
                "stores":count1,
                "charity":count2
            },
            "area": {
                "shape": new google.maps.Data()                
            }
        };
    };
    for (var i = 22; i >= 1; i--) {
        importdata(i);
        addevent(i);
    };
    dataVisual(yearshow1, datashow);
    // barchart();
    
    document.getElementById('return').addEventListener('click', function() {
        var styles = [{
            stylers: [{ visibility: "off" }]
        }];
        var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});
        map1.setOptions(mapOptions1);
        map1.mapTypes.set('map_style', styledMap);
        map1.setMapTypeId('map_style');
        map1.setZoom(8);
        map1.setCenter({lat: 24.167622, lng: 119.391408});
        map_detailed = false;
        $('#outeroption').show();
        $('#inneroption').hide();
        $('#diagram').show();
        $('#return').hide();
        $('#county_detail').hide();
        $('#store_detail').hide();
        $('#org_detail').hide();
        $('#profit-distribut').prop("checked", true);
        $('#year').show();
        for (var i = 22; i >= 1; i--) {
            if (i == 22) {
                countyData[i]['area']['shape'].setMap(map2);
            }else if (i == 21) {
                countyData[i]['area']['shape'].setMap(map3);
            } else{
                countyData[i]['area']['shape'].setMap(map1);
            };
        };
        dataVisual(yearshow1, datashow);
        for (var i = store_data.length - 1; i >= 0; i--) {
            store_data[i]['marker']['object'].setVisible(false);
        };
        for (var i = charity.length - 1; i >= 0; i--) {
            charity[i]['marker']['object'].setVisible(false);
        };
        $('#map-canvas-2').show();
        $('#map-canvas-3').show();
        $('#blocker').show();
    });
    var image = {
        url: '/static/img/pigpin.png',
        // This marker is 20 pixels wide by 32 pixels tall.
        scaledSize : new google.maps.Size(20, 32),
        // The origin for this image is 0,0.
        origin: new google.maps.Point(0,0),
        // The anchor for this image is the base of the flagpole at 0,32.
        anchor: new google.maps.Point(10, 16)
    };
    store_data=[];
    for (var i = store.length - 1; i >= 0; i--) {
        store_data[i] = {
            'name': store[i]['name'],
            'address': store[i]['address'],
            'firstprize_times': store[i]['firstprize_times'],
            'marker': {
                'object': new google.maps.Marker({
                    map: map1,
                    position: new google.maps.LatLng(store[i]['latitude'], store[i]['longitude']),
                    icon: image,
                    visible: false
                })
            }
        }
        addevent_storemarker(i);
    };
    charity=[];
    for (var i = organization.length - 1; i >= 0; i--) {
        charity[i] = {
            'id': organization[i]['id'],
            'name': organization[i]['name'],
            'address': organization[i]['address'],
            'yearly': {
                103:{
                    'money': "未申請",
                    'rejected': ""
                },
                102:{
                    'money': "未申請",
                    'rejected': ""
                },
                101:{
                    'money':"未申請",
                    'rejected': ""
                },
                100:{
                    'money': "未申請",
                    'rejected': ""
                }
            },
            'marker': {
                'object': new google.maps.Marker({
                    map: map1,
                    position: new google.maps.LatLng(organization[i]['latitude'], organization[i]['longitude']),
                    icon: image,
                    visible: false
                })
            }
        }
        addyearlydata(i);
        addevent_charity(i);
    };
    google.maps.event.addListener(map1, 'click', function() {
        $('#store_detail').hide();
        $('#org_detail').hide();
    });
}
google.maps.event.addDomListener(window, 'load', initialize);

function importdata (id) {
    $.getJSON("/static/json/county"+id+".json", function(data){
        geoJsonObject = topojson.feature(data, data.objects["1031225_big5"]);
        countyData[id]['area']['shape'].addGeoJson(geoJsonObject);
        if (id == 22) {
            countyData[id]['area']['shape'].setMap(map2);
        }else if (id == 21) {
            countyData[id]['area']['shape'].setMap(map3);
        }else {
            countyData[id]['area']['shape'].setMap(map1);
        };
    });
}

function addyearlydata (id) {
    for (var i = fund_org_103.length - 1; i >= 0; i--) {
        if(fund_org_103[i]['org_name'] == charity[id]['name']){
            charity[id]['yearly'][103]['money'] = fund_org_103[i]['money'];
            if (charity[id]['yearly'][103]['money'] == 0) {
                charity[id]['yearly'][103]['rejected'] = fund_org_103[i]['content'];
            };
        }
    };
    for (var i = fund_org_102.length - 1; i >= 0; i--) {
        if(fund_org_102[i]['org_name'] == charity[id]['name']){
            charity[id]['yearly'][102]['money'] = fund_org_102[i]['money'];
            if (charity[id]['yearly'][102]['money'] == 0) {
                charity[id]['yearly'][102]['rejected'] = fund_org_102[i]['content'];
            };
        }
    };
    for (var i = fund_org_101.length - 1; i >= 0; i--) {
        if(fund_org_101[i]['org_name'] == charity[id]['name']){
            charity[id]['yearly'][101]['money'] = fund_org_101[i]['money'];
            if (charity[id]['yearly'][101]['money'] == 0) {
                charity[id]['yearly'][101]['rejected'] = fund_org_101[i]['content'];
            };
        }
    };
    for (var i = fund_org_100.length - 1; i >= 0; i--) {
        if(fund_org_100[i]['org_name'] == charity[id]['name']){
            charity[id]['yearly'][100]['money'] = fund_org_100[i]['money'];
            if (charity[id]['yearly'][100]['money'] == 0) {
                charity[id]['yearly'][100]['rejected'] = fund_org_100[i]['content'];
            };
        }
    };
}

function addevent (id) {
    var map = countyData[id]['area']["shape"].getMap();
    countyData[id]['area']["event"] = {
        "mouseover":
            google.maps.event.addListener(countyData[id]['area']["shape"], 'mouseover', function(event) {
                var content = county_detail_content (countyData[id]);
                $('#county_detail').html(content);
                if ($('#county_detail').is(':hidden')) {
                       $('#county_detail').show();
                };
            }),
        "mouseout":
            google.maps.event.addListener(countyData[id]['area']["shape"], 'mouseout', function(event) {
                if (!map_detailed) {
                    $('#county_detail').hide();
                };
            }),
        "click":
            google.maps.event.addListener(countyData[id]['area']["shape"], 'click', function(event) {
                $('#outeroption').hide();
                $('#inneroption').show();
                $('#map-canvas-2').hide();
                $('#map-canvas-3').hide();
                $('#blocker').hide();
                var map1_sw = new google.maps.LatLng(countyData[id]['bounds']['sw']['lat'], countyData[id]['bounds']['sw']['lng']);
                var map1_ne = new google.maps.LatLng(countyData[id]['bounds']['ne']['lat'], countyData[id]['bounds']['ne']['lng']);
                var map1_bounds = new google.maps.LatLngBounds(map1_sw,map1_ne);;
                map1.fitBounds(map1_bounds);
                map_detailed = true;
                if (datashow == 2) {
                    $('#store').prop("checked", true);
                    for (var i = store_data.length - 1; i >= 0; i--) {
                        store_data[i]['marker']['object'].setVisible(true);
                    };
                }else{
                    $('#organizations').prop("checked", true);
                    $('#application').show();
                    $("#year select").val(yearshow1);
                    yearshow2 = yearshow1;
                    $('#noapplied').prop("checked", true);
                    for (var i = charity.length - 1; i >= 0; i--) {
                        if (charity[i]['yearly'][yearshow1]['money'] == "未申請") {
                            charity[i]['marker']['object'].setVisible(true);
                        };
                    };
                };
                var detail_style = [{
                    "featureType":"administrative",
                    "elementType":"geometry",
                    "stylers":[{
                        "visibility":"off"
                    }]
                },{
                    "featureType":"landscape.man_made",
                        "stylers":[{
                        "visibility":"simplified"},
                        {"color":"#ffe24d"
                    }]
                },{
                    "featureType":"road",
                    "stylers":[{
                        "visibility":"simplified"},
                        {"color":"#158c28"
                    }]
                },{
                    "featureType":"landscape.natural",
                    "stylers":[{
                        "visibility":"simplified"},
                        {"color":"#37b34a"
                    }]
                },{
                    "featureType":"water",
                    "stylers":[{
                        "color":"#ffe24d"
                        }]
                },{
                    "featureType":"poi",
                    "stylers":[{
                        "visibility":"simplified"
                    },{
                        "color":"#8bc53f"
                    }]
                },{
                    "elementType":"labels.text.stroke",
                    "stylers":[{
                        "color":"#808080"
                    },{
                        "gamma":9.91
                    },{
                        "visibility":"off"
                    }]
                },{
                    "elementType":"labels.text.fill",
                    "stylers":[{
                        "color":"#ffffff"
                    },{
                        "lightness":100
                    },{
                        "visibility":"on"
                    }]
                },{
                    "elementType":"labels.icon",
                    "stylers":[{
                        "visibility":"off"
                    }]
                }]
                var styledMap = new google.maps.StyledMapType(detail_style, {name: "Styled Map"});
                map1.setOptions(mapOptions_detail);
                map1.mapTypes.set('map_style', styledMap);
                map1.setMapTypeId('map_style');
                for (var i = 1; i < 23; i++){
                    countyData[i]['area']["shape"].setMap(null);
                };
                $('#return').show();
                $('#diagram').hide();
                $('#county_detail').show();
            })
    }
}

function addevent_storemarker (id) {
    store_data[id]['marker']['event'] = google.maps.event.addListener(store_data[id]['marker']['object'], 'click', function(event) {
        var content = '<div>店家名稱: '+store_data[id]['name']+'</div>'+
        '<div>地址: '+store_data[id]['address']+'</div>'+
        '<div>中頭獎次數: '+store_data[id]['firstprize_times']+'</div>';
        $('#store_detail').html(content);
        if ($('#org_detail').is(':visible')) {
            $('#org_detail').hide();
        };
        if ($('#store_detail').is(':hidden')) {
            $('#store_detail').show();
        };
    })
}

function addevent_charity (id) {
    charity[id]['marker']['event'] = google.maps.event.addListener(charity[id]['marker']['object'], 'click', function() {
        var money = charity[id]['yearly'][yearshow2]['money'];
        var org_id = charity[id]['id'];
        var rejected = charity[id]['yearly'][yearshow2]['rejected'];
        var content = '<div>機構名稱: '+charity[id]['name']+'</div>'+
        '<div>機構地址: '+charity[id]['address']+'</div>';
        content += '<div>'+yearshow2+'年獲得補助: '+thousandComma(money)+'</div>';          
        if (money == 0) {
            content += '<div>申請內容: '+rejected+'</div>'
        };
        content += '<div class="project_detail"><a href="/org/' + org_id +'">詳細資訊</a></div>';
        $('#org_detail').html(content);
        if ($('#store_detail').is(':visible')) {
            $('#store_detail').hide();
        };
        if ($('#org_detail').is(':hidden')) {
            $('#org_detail').show();
        };
    });
}

function dataVisual (year, show) {
    var maxdata = 0;
    var mindata = 9999999999999999999;
    for (var i = 22; i >= 1; i--) {
        if (show == 0) {
            if (year == 103) {
                chartdata[i - 1] = {
                    'id':i,
                    'num':countyData[i]['money']['fund'][103]
                };
                if (countyData[i]['money']['fund'][103] > maxdata) {
                    maxdata = countyData[i]['money']['fund'][103];
                } else if (countyData[i]['money']['fund'][103] < mindata) {
                    mindata = countyData[i]['money']['fund'][103];
                };
            }else if (year == 102) {
                chartdata[i - 1] = {
                    'id':i,
                    'num':countyData[i]['money']['fund'][102]
                };
                if (countyData[i]['money']['fund'][102] > maxdata) {
                    maxdata = countyData[i]['money']['fund'][102];
                } else if (countyData[i]['money']['fund'][102] < mindata) {
                    mindata = countyData[i]['money']['fund'][102];
                };
            }else if (year == 101) {
                chartdata[i - 1] = {
                    'id':i,
                    'num':countyData[i]['money']['fund'][101]
                };
                if (countyData[i]['money']['fund'][101] > maxdata) {
                    maxdata = countyData[i]['money']['fund'][101];
                } else if (countyData[i]['money']['fund'][101] < mindata) {
                    mindata = countyData[i]['money']['fund'][101];
                };
            }else {
                chartdata[i - 1] = {
                    'id':i,
                    'num':countyData[i]['money']['fund'][100]
                };
                if (countyData[i]['money']['fund'][100] > maxdata) {
                    maxdata = countyData[i]['money']['fund'][100];
                } else if (countyData[i]['money']['fund'][100] < mindata) {
                    mindata = countyData[i]['money']['fund'][100];
                };
            };
        }else if (show == 1) {
            chartdata[i - 1] = {
                'id':i,
                'num':countyData[i]['money']['surp']
            };
            if (countyData[i]['money']['surp'] > maxdata) {
                maxdata = countyData[i]['money']['surp'];
            } else if (countyData[i]['money']['surp'] < mindata) {
                mindata = countyData[i]['money']['surp'];
            };
        }else if (show == 2) {
            chartdata[i - 1] = {
                'id':i,
                'num':countyData[i]['count']['prize']
            };
            if (countyData[i]['count']['prize'] > maxdata) {
                maxdata = countyData[i]['count']['prize'];
            } else if (countyData[i]['count']['prize'] < mindata) {
                mindata = countyData[i]['count']['prize'];
            };
        };
    }
    for (var i = 22; i >= 1; i--) {
        var opacity;
        if (show == 0) {
            if (year == 103) {
                opacity = range(countyData[i]['money']['fund'][103], maxdata, mindata);
            }else if (year == 102) {
                opacity = range(countyData[i]['money']['fund'][102], maxdata, mindata);
            }else if (year == 101) {
                opacity = range(countyData[i]['money']['fund'][101], maxdata, mindata);
            }else {
                opacity = range(countyData[i]['money']['fund'][100], maxdata, mindata);
            };
        }else if (show == 1) {
            opacity = range(countyData[i]['money']['surp'], maxdata, mindata);
        }else if (show == 2) {
            opacity = range(countyData[i]['count']['prize'], maxdata, mindata);
        };
        // console.log(maxdata, mindata, opacity);
        if (i == 22 || i == 21 || i == 17) {
            countyData[i]['area']['shape'].setStyle({
                fillColor: '#158c28',
                fillOpacity: opacity,
                strokeColor: '#ffe24d',
                strokeWeight: 0
            });
        }else{
            countyData[i]['area']['shape'].setStyle({
                fillColor: '#158c28',
                fillOpacity: opacity,
                strokeColor: '#ffe24d',
                strokeWeight: 3
            });
        };
    }
}

function range (data, max, min) {
    var range = (max - min)/4;
    var range1 = min + range;
    var range2 = range1 + range;
    var range3 = range2 + range;
    // console.log(data, max, min);
    if (data == min){
        return 0.1
    }else if(data<range1){
        return 0.2
    }else if(data<range2){
        return 0.4
    }else if(data<range3){
        return 0.6
    }else if(data<max){
        return 0.8
    }else{
        return 1
    };
}

// function barchart () {
    // chartdata.sort(function(a, b){return a['num']-b['num']});
    // console.log(chartdata);
    // var canvas = document.getElementById('chart');
    // if (canvas.getContext){
        // var ctx = canvas.getContext('2d');
        // canvas.width = 500;
        // canvas.height = 350;
        // ctx.clearRect(0,0,canvas.width,canvas.height);
        // ctx.fillStyle = "#ffe24d";
        // for (var i = chartdata.length - 1; i >= 0; i--) {
            // var height = 10 + chartdata[i]['num']/chartdata[21]['num']*300
            // ctx.fillRect (8+22*i, 300-height, 20, height);
        // };
    // }
// }

function county_detail_content (data) {
    var content = '<div id="content"> '+data['name']+'</div>';
    if (datashow == 0) {
        content += '<div>'+yearshow1+'年社福機構獲得補助回饋金: '+thousandComma(data['money']['fund'][yearshow1])+'</div>';
    } else if (datashow == 1) {
        content += '<div>103年彩券盈餘分配金: '+thousandComma(data['money']['surp'])+'</div>';
    } else if (datashow == 2){
        content += '<div>103年起中頭獎次數: '+data['count']['prize']+'</div>'
    };
    content += '<div>彩券行: '+data['count']['stores']+' 家</div>'+ '<div>社福機構: '+data['count']['charity']+' 家</div>';
    return content
}

function thousandComma (number){
    if (number != "未申請") {
        var num = number.toString();
        var pattern = /(-?\d+)(\d{3})/;
  
        while(pattern.test(num)){
            num = num.replace(pattern, "$1,$2");
        }
        return '$'+num
    }else {
        return  number;    
    };
}