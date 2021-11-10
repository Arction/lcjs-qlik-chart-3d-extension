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
					qWidth: 20,
					qHeight: 100
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

			$element.html(`<div id="lightningChart2" style="height:${height($element[0])}px"></div>`)

			chart.buildChart($element, layout, this).then(function() {

				console.log('ddddddd');

				return qlik.Promise.resolve();
			});



			// console.log($element[0].clientHeight, '$element[0].clientHeight');
			// console.log(layout, 'layout');
			// console.log($element, 'element');
			// const {
            //     lightningChart,
            //     ColorHEX,
            //     SolidFill,
            //     SolidLine,
            // } = lcjs
   
            // const chart = lightningChart().ChartXY({
            //     container: 'lightningChart'
            // })
			// 	.setTitle(layout.chartTitle)
			// 	.setAnimationsEnabled(layout.animation)

			// chart.getDefaultAxisY()
            // 	.setMouseInteractions(layout.yAnimation)
            // 	.setTitle(layout.yTitle)
			// chart.getDefaultAxisX()
            // 	.setMouseInteractions(layout.XAnimation)
            // 	.setTitle(layout.xTitle)


			// const series = chart.addLineSeries()
            // series.setStrokeStyle(new SolidLine({ fillStyle: new SolidFill({ color: ColorHEX(layout.color.color) }), thickness: 2 }))

            // const arr = layout.qHyperCube.qDataPages[0].qMatrix.map(el=>{
            //     return {
            //         x: el[0].qNum,
            //         y: el[1].qNum
            //     }
            // })
            
            // series.add(arr)
 
			// return qlik.Promise.resolve();
		},

		// resize: function($element, layout) {

		// 	height($element[0])
			
		// }
	};

} );
