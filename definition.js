define([], function () {
    'use strict';
    return {

			type: "items",
			component: "accordion",
			items: {
				dimensions: {
					uses: "dimensions",
					min: 2,
					max: 3
				},
				measures: {
					uses: "measures",
					min: 1,
					max: 20
				},
				settings: {
					uses: "settings",
					items: {
						color: {
							label:"Color",
							component: "color-picker",
							ref: "color",
							type: "object",
							defaultValue: {
							  color: "#fecc00",
							  index: "-1"
							}
						},
						size: {
							type: "integer",
							label: "Point size",
							ref: "size",
							defaultValue: "10",
							expression: "always"
	
						},
						Amount: {
							type: "integer",
							label: "Amount of Points",
							ref: "amount",
							defaultValue: "500",
							expression: "always"
	
						},
						animation: {
							type: "boolean",
							component: "switch",
							label: "Enable Animation",
							ref: "animation",
							options: [{
								value: true,
								label: "On"
							}, {
								value: false,
								label: "Off"
							}],
							defaultValue: false
						},
						interactions: {
							type: "boolean",
							component: "switch",
							label: "Enable Mouse Interactions",
							ref: "interactions",
							options: [{
								value: true,
								label: "On"
							}, {
								value: false,
								label: "Off"
							}],
							defaultValue: true
						},
						chartTitle: {
							type: "string",
							label: "Chart Title",
							ref: "chartTitle",
							defaultValue: "",
							expression: "always"
						},
						yAxisSettings: {
							type: "items",
							ref: "yAxisSettings",
							label: "Y Axis",
							items: {
								yTitle: {
									type: "string",
									label: "Title",
									ref: "yTitle",
									defaultValue: "",
									expression: "always"
	
								}
							}
						},
						xAxisSettings: {
							type: "items",
							ref: "xAxisSettings",
							label: "X Axis",
							items: {
								yTitle: {
									type: "string",
									label: "Title",
									ref: "xTitle",
									defaultValue: "",
									expression: "always"
	
								},
							}
						},
						zAxisSettings: {
							type: "items",
							ref: "zAxisSettings",
							label: "Z Axis",
							items: {
								yTitle: {
									type: "string",
									label: "Title",
									ref: "zTitle",
									defaultValue: "",
									expression: "always"
	
								},
							}
						}
					}
				}
			}

        }
    }
)