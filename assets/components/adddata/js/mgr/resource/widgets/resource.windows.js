addData.window.CreateResCharacteristic = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'adddata-res-characteristic-window-create';
    }
    Ext.applyIf(config, {
        title: _('adddata_characteristic_create'),
        width: 550,
        autoHeight: true,
        url: addData.config.connector_url,
        action: 'mgr/resource/characteristic/create',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    addData.window.CreateResCharacteristic.superclass.constructor.call(this, config);
};
Ext.extend(addData.window.CreateResCharacteristic, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'hidden',
            name: 'resource_id',
            id: config.id + '-resource_id',
            originalValue: addData.config.res_id
        }, {
            xtype: 'adddata-combo-value-characteristic',
            fieldLabel: _('adddata_name'),
            name: 'name',
            id: config.id + '-name',
            anchor: '99%',
            allowBlank: false,
        }, {
            xtype: 'textfield',
            fieldLabel: _('adddata_value'),
            name: 'value',
            id: config.id + '-value',
            anchor: '99%',
            allowBlank: false,
        }];
    },

});
Ext.reg('adddata-res-characteristic-window-create', addData.window.CreateResCharacteristic);


addData.window.UpdateResCharacteristic = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'adddata-res-characteristic-window-update';
    }
    Ext.applyIf(config, {
        title: _('adddata_characteristic_update'),
        width: 550,
        autoHeight: true,
        url: addData.config.connector_url,
        action: 'mgr/resource/characteristic/update',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    addData.window.UpdateResCharacteristic.superclass.constructor.call(this, config);
};
Ext.extend(addData.window.UpdateResCharacteristic, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'hidden',
            name: 'id',
            id: config.id + '-id',
        }, {
            xtype: 'hidden',
            name: 'resource_id',
            id: config.id + '-resource_id',
            originalValue: addData.config.res_id
        }, {
            xtype: 'adddata-combo-value-characteristic',
            fieldLabel: _('adddata_name'),
            name: 'name',
            id: config.id + '-name',
            anchor: '99%',
            allowBlank: false,
        }, {
            xtype: 'textfield',
            fieldLabel: _('adddata_value'),
            name: 'value',
            id: config.id + '-value',
            anchor: '99%',
            allowBlank: false,
        }];
    },

});
Ext.reg('adddata-res-characteristic-window-update', addData.window.UpdateResCharacteristic);
