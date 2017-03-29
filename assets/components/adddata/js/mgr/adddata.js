var addData = function (config) {
    config = config || {};
    addData.superclass.constructor.call(this, config);
};
Ext.extend(addData, Ext.Component, {
    page: {}, window: {}, grid: {}, tree: {}, panel: {}, combo: {}, config: {}, view: {}, utils: {}
});
Ext.reg('adddata', addData);

addData = new addData();