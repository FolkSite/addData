addData.page.Home = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        components: [{
            xtype: 'adddata-panel-home',
            renderTo: 'adddata-panel-home-div'
        }]
    });
    addData.page.Home.superclass.constructor.call(this, config);
};
Ext.extend(addData.page.Home, MODx.Component);
Ext.reg('adddata-page-home', addData.page.Home);