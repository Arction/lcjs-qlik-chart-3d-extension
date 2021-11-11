define( [ "qlik", "./definition", "./chart", "./lib/lcjs.iife",],

function ( qlik, definition, chart) {

	let height = (el)=> el.clientHeight
	return {
		initialProperties: {
			refLineList: [],
			shapes: [],
			qHyperCubeDef: {
				qDimensions: [],
				qMeasures: [],
				qInitialDataFetch: [{
					qTop: 4,
          qLeft: 0,
					qWidth: 2,
					qHeight: 0
				}]
			},
			selectionMode: "CONFIRM"
		},
		definition : definition,
		support : {
			snapshot: true,
			export: true,
			exportData : false
		},
		controller: ['$scope', function ($scope) {
			console.log($scope, '$scope');
			$scope.selectedElements = new Map();

		}],
		paint: function ($element, layout) {

			const id = layout.qInfo.qId;

			$element.html(`<div id="3DlightningChart${id}" style="height:${height($element[0])}px"></div>`)

			chart.buildChart($element, layout, this).then(function() {
				return qlik.Promise.resolve();
			});



		
		},

		// resize: function($element, layout) {

		// 	height($element[0])
			
		// }
	};

} );
