addData.panel.Home = function (config) {
    config = config || {};
    Ext.apply(config, {
        baseCls: 'modx-formpanel',
        layout: 'anchor',

         stateful: true,
         stateId: 'adddata-panel-home',
         stateEvents: ['tabchange'],
         getState:function() {return {activeTab:this.items.indexOf(this.getActiveTab())};},

        hideMode: 'offsets',
        items: [{
            //xtype: 'modx-tabs',
            //defaults: {border: false, autoHeight: true},
            //border: true,
            //hideMode: 'offsets',
            //items: [{
                title: _('adddata_characteristics'),
                layout: 'anchor',
                items: [/*{
                 html: _('adddata_intro_msg'),
                 cls: 'panel-desc',
                 },*/ {
                    xtype: 'adddata-grid-res-characteristics',
                    cls: 'main-wrapper',
                }]
            //}]
        }]
    });
    addData.panel.Home.superclass.constructor.call(this, config);
};
Ext.extend(addData.panel.Home, MODx.Panel, {

});
Ext.reg('adddata-panel-home', addData.panel.Home);
