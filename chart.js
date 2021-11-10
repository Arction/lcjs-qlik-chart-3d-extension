define( [ "qlik", "./lib/lcjs.iife",],
 function (qlik) {
    'use strict';
   
    return {

        buildChart: async function ($element, layout, _self) {l
            
            try {
            let lastrow = {}
            lastrow.row = 0
            let columns = layout.qHyperCube.qDimensionInfo.length + layout.qHyperCube.qMeasureInfo.length;
            this.addMoreData(_self, lastrow)
            await this.getData(_self, lastrow, layout, columns);
            this.createChart($element, layout, _self);
        }
        catch (err) {
            console.info(err);
        }

        },

        addMoreData: function (_self, lastrow) {
            _self.backendApi.eachDataRow(function (rownum, row) {
                lastrow.row = rownum;
            });

        },

        
        getData: function(_self, lastrow, layout, colcount) {

            var _this = this;
            return new Promise(resolve => {


                if (_self.backendApi.getRowCount() > lastrow.row + 1 && lastrow.row <= layout.amount) {

                    var requestPage = [{
                        qTop: lastrow.row + 1,
                        qLeft: 0,
                        qWidth: colcount,
                        qHeight: Math.min(Math.floor(10000 / colcount), _self.backendApi.getRowCount() - lastrow.row)
                    }];
                    _self.backendApi.getData(requestPage).then(function (dataPages) {
                        _this.addMoreData(_self, lastrow);
                        resolve(_this.getData(_self, lastrow, layout, colcount));

                    });
                } else {
                    console.log( resolve(), 'resolve()');
                    resolve();
                }
            });
        }, 

        createChart: function($element, layout, self){
            
            const {
                lightningChart,
                ColorHEX,
                SolidFill,
                SolidLine,
                PointStyle3D,
            } = lcjs
            
            const chart = lightningChart().Chart3D({
                container: 'lightningChart2'
            })
                .setTitle(layout.chartTitle)
                .setAnimationsEnabled(layout.animation)
                .setMouseInteractions(layout.interactions)
            
            chart.getDefaultAxisY()
                .setTitle(layout.yTitle)
            
            chart.getDefaultAxisX()
                .setTitle(layout.xTitle)
            
            chart.getDefaultAxisZ()
                .setTitle(layout.zTitle)
            
            const series = chart.addBoxSeries()
            .setRoundedEdges( layout.size )
            
            self.backendApi.eachDataRow(function (rownum, row) {      

                series.invalidateData([{
                    xCenter: row[0].qNum,
                    yCenter: row[1].qNum,
                    zCenter: row[2].qNum,
                    xSize: layout.size,
                    ySize: layout.size,
                    zSize: layout.size,
                }])
            
            })

        }
    }
 }
)


