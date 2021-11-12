define( [ "qlik", "./lib/lcjs.iife",],
 function (qlik) {
    'use strict';
   
    return {

        buildChart: async function ($element, layout, _self) {
            
        try {
            let lastrow = {
                row: 0
            }
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
                        qHeight: Math.min(Math.floor(1000 / colcount), _self.backendApi.getRowCount() - lastrow.row)
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
                PointStyle3D,
            } = lcjs
            
            const id = layout.qInfo.qId;

            const chart = lightningChart().Chart3D({
                container: '3DlightningChart' + id
            })
                .setAnimationsEnabled(false)
                .setTitle(layout.chartTitle)
                .setMouseInteractions(layout.interactions)
            
            chart.getDefaultAxisY()
                .setTitle(layout.yTitle)
            
            chart.getDefaultAxisX()
                .setTitle(layout.xTitle)
            
            chart.getDefaultAxisZ()
                .setTitle(layout.zTitle)
            
            const series = chart.addPointSeries()
            .setPointStyle(new PointStyle3D.Triangulated({
                fillStyle: new SolidFill({ color: ColorHEX(layout.color.color) }),
                size:  layout.size ,
                shape: 'sphere'
            }))

            self.backendApi.eachDataRow(function (rownum, row) {      

                series.add({ 
                    x: row[0].qNum,
                    z: row[2].qNum, 
                    y: row[1].qNum 
                })
            
            })

        }
    }
 }
)


