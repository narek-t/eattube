function reScale(){
	var scale = $(window).innerWidth() / 1920;
	$(".scaleable-wrapper__inner").css({
		transform: "scale(" + scale + ")"
	});
}

$(document).ready(function () {
	reScale();
	$(window).on('resizeend', 1, function() {
		reScale();
	});
	$('.toggle-menu').click(function(event) {
		event.preventDefault();
		$(this).toggleClass('active');
		$('.main-nav').toggleClass('visible');
	});
	var header = $(".site-header");
	$(window).scroll(function() {
		var scroll = $(window).scrollTop();
		if (scroll >= 140) {
			header.addClass("dark__header");
		} else {
			header.removeClass("dark__header");
		}
	});
	$('.tastes__input').iLightInputNumber({
		mobile: false
	});

	var myVideo = document.getElementById("video_p");
	if(myVideo) {
			$(".play__video").addClass("active_btn");
	    function playPause() {
	        if (myVideo.paused){
	            myVideo.play();
	            $(".play__video").addClass("active_btn");
	        } else {
	            myVideo.pause();
	            $(".play__video").removeClass("active_btn");
	        }
	    }
	    myVideo.onended = function() {
	    	$(".play__video").removeClass("active_btn op_btn");
		};
	    $(".play__video").on('click', function(){
	        $(this).toggleClass("op_btn");
	        playPause();
	        return false
	    });
	}
    

    
});






var condition = document.getElementById('map-canvas');
if(condition) {
	var map;
	var style = [
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "-100"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 65
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": "50"
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "-100"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "all",
        "stylers": [
            {
                "lightness": "30"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "all",
        "stylers": [
            {
                "lightness": "40"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#ffff00"
            },
            {
                "lightness": -25
            },
            {
                "saturation": -97
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
            {
                "lightness": -25
            },
            {
                "saturation": -100
            }
        ]
    }
]
	var markerData = [
		{
			cityCoords: {
				lat: 55.75069009,
				lng: 37.62130737
			},
			cityName: "Москва",
			addresses: [
				{
					singleAddressContent: 'asdasdasdasd1',
					singleAddressLat: 55.69848571,
					singleAddressLng: 37.46612549,
					singleAddressImg: 'img/singleAddressLogo.png',
					singleAddressText: 'Ленинский проспект, 158'
				},
				{
					singleAddressContent: 'asdasdasdasd2',
					singleAddressLat: 55.80899899,
					singleAddressLng: 37.80670166,
					singleAddressImg: 'img/singleAddressLogo.png',
					singleAddressText: 'Ленинский проспект, 1581'
				},
			],

		},

		{
			cityCoords: {
				lat: 56.31463259,
				lng: 44.01638031
			},
			cityName: "Нижний Новгород",
			addresses: [
				{
					singleAddressContent: 'dsadsadsadsa1',
					singleAddressLat: 56.3297678,
					singleAddressLng: 43.85004044,
					singleAddressImg: 'img/singleAddressLogo.png',
					singleAddressText: 'Ленинский проспект, 1582'
				},
				{
					singleAddressContent: 'dsadsadsadsadsa2',
					singleAddressLat: 56.25727382,
					singleAddressLng: 44.02702332,
					singleAddressImg: 'img/singleAddressLogo.png',
					singleAddressText: 'Ленинский проспект, 1583'
				},
			],
		},
	];
	var infowindow = new google.maps.InfoWindow();
	var allmarkers = [];
	 
	function initialize() {
	 	map = new google.maps.Map(document.getElementById('map-canvas'), {
			zoom: 10,
			center: {lat: 55.75069009, lng: 37.62130737},
			styles: style,
		});
		var cID = 0;
		var aID = 0;
		markerData.forEach(function(data) {
			data.addresses.forEach(function(innerData) {
				var newmarker= new google.maps.Marker({
					map:map,
					position:{lat:innerData.singleAddressLat, lng:innerData.singleAddressLng},
					icon: 'img/loc.png',
					cID: cID,
					aID: aID,
				});
				google.maps.event.addListener(newmarker, 'click', function(){
			        infowindow.close();
			        map.panTo(newmarker.getPosition());
			        infowindow.setContent( "<div class='infowindow' style='background-image: url("+innerData.singleAddressImg+")'>"+innerData.singleAddressContent+"</div>");
			        infowindow.open(map, newmarker);
			    });
			    allmarkers.push(newmarker);
			    aID++;
			});

			jQuery("#select-location").append('<option value="'+[data.cityCoords.lat, data.cityCoords.lng].join('|')+'">'+data.cityName+'</option>');
			cID++;
		});
	}
	google.maps.event.addDomListener(window, 'load', initialize);
	jQuery(document).on('change','#select-location',function() {
		var i = jQuery(this).prop('selectedIndex');
		var latlng = jQuery(this).val().split('|');
		var newlat = 1*latlng[0],
		newlng = 1*latlng[1];
		map.setCenter({lat:newlat, lng:newlng});
		map.setZoom(10);
		jQuery("#addresses__list").empty();
		markerData[i].addresses.forEach(function(data) {
			jQuery("#addresses__list").append('<li data-cityID="'+i+'" data-lat="'+data.singleAddressLat+'" data-lng="'+data.singleAddressLng+'"><span class="city">'+markerData[i].cityName+',</span><span class="address">'+data.singleAddressText+'</span></li>');
		})
	});
	jQuery('#addresses__list').on('click', 'li', function(event) {
		event.preventDefault();
		var cityID = jQuery(this).data('cityid');
		var addressID = jQuery(this).index();
		function findById(source, id) {
		    return source.filter(function( obj ) {
		        return +obj.cID === +id;
		    })
		}
		var result = findById( allmarkers, cityID );
		google.maps.event.trigger(result[addressID], 'click');


		var lat = jQuery(this).data('lat');
		var lng = jQuery(this).data('lng');
		var latLng = new google.maps.LatLng(lat,lng)
		map.panTo(latLng);
		map.setZoom(15);
	});
}
