addData.panel.Home = function (config) {
    config = config || {};
    Ext.apply(config, {
        baseCls: 'modx-formpanel',
        layout: 'anchor',
        hideMode: 'offsets',
        //listeners: {
        //    'setup': {fn: this.setup, scope: this}
        //},
        items: [{
            html: '<h2>' + _('adddata') + '</h2>',
            cls: '',
            style: {margin: '15px 0'}
        }, {
            xtype: 'modx-tabs',
            defaults: {border: false, autoHeight: true},
            border: true,
            hideMode: 'offsets',
            items: [{
                title: _('adddata_characteristics'),
                layout: 'anchor',
                items: [{
                    xtype: 'modx-tabs',
                    defaults: {border: false, autoHeight: true},
                    border: true,
                    hideMode: 'offsets',
                    items: [{
                        title: _('adddata_characteristics'),
                        layout: 'anchor',
                        items: [{
                            html: _('adddata_characteristics_msg'),
                            cls: 'panel-desc'
                        }, {
                            xtype: 'adddata-grid-characteristics',
                            cls: 'main-wrapper'
                        }]
                    }, {
                        title: _('adddata_partyes'),
                        layout: 'anchor',
                        items: [{
                            //html: _('adddata_intro_msg'),
                            //cls: 'panel-desc'
                        }, {
                            xtype: 'adddata-grid-party',
                            cls: 'main-wrapper'
                        }]
                    }]
                }]
            }]
        }]
    });
    addData.panel.Home.superclass.constructor.call(this, config);
};
Ext.extend(addData.panel.Home, MODx.Panel);
Ext.reg('adddata-panel-home', addData.panel.Home);
