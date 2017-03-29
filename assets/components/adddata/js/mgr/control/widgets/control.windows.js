addData.window.CreateCharacteristics = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'adddata-characteristics-window-create';
    }
    Ext.applyIf(config, {
        title: _('adddata_characteristics_create'),
        width: 550,
        autoHeight: true,
        url: addData.config.connectorUrl,
        action: 'mgr/control/characteristics/create',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    addData.window.CreateCharacteristics.superclass.constructor.call(this, config);
};
Ext.extend(addData.window.CreateCharacteristics, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'textfield',
            fieldLabel: _('adddata_name'),
            name: 'name',
            id: config.id + '-name',
            anchor: '99%',
            allowBlank: false
        }, {
            xtype: 'adddata-combo-party',
            fieldLabel: _('adddata_party'),
            name: 'party',
            hiddenName: 'party',
            anchor: '99%'
        }, {
            xtype: 'textarea',
            fieldLabel: _('adddata_description'),
            name: 'description',
            id: config.id + '-description',
            height: 150,
            anchor: '99%'
        }];
    }
});
Ext.reg('adddata-characteristics-window-create', addData.window.CreateCharacteristics);


addData.window.UpdateCharacteristics = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'adddata-characteristics-window-update';
    }
    Ext.applyIf(config, {
        title: _('adddata_characteristics_update'),
        width: 550,
        autoHeight: true,
        url: addData.config.connectorUrl,
        action: 'mgr/control/characteristics/update',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    addData.window.UpdateCharacteristics.superclass.constructor.call(this, config);
};
Ext.extend(addData.window.UpdateCharacteristics, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'hidden',
            name: 'id',
            id: config.id + '-id',
        }, {
            xtype: 'textfield',
            fieldLabel: _('adddata_name'),
            name: 'name',
            id: config.id + '-name',
            anchor: '99%',
            allowBlank: false
        }, {
            xtype: 'adddata-combo-party',
            fieldLabel: _('adddata_party'),
            name: 'party',
            hiddenName: 'party',
            anchor: '99%'
        }, {
            xtype: 'textarea',
            fieldLabel: _('adddata_description'),
            name: 'description',
            id: config.id + '-description',
            height: 150,
            anchor: '99%'
        }];
    }
});
Ext.reg('adddata-characteristics-window-update', addData.window.UpdateCharacteristics);


addData.window.CreateParty = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'adddata-party-window-create';
    }
    Ext.applyIf(config, {
        title: _('adddata_party_create'),
        width: 550,
        autoHeight: true,
        url: addData.config.connectorUrl,
        action: 'mgr/control/party/create',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    addData.window.CreateParty.superclass.constructor.call(this, config);
};
Ext.extend(addData.window.CreateParty, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'textfield',
            fieldLabel: _('adddata_name'),
            name: 'party',
            id: config.id + '-party',
            anchor: '99%',
            allowBlank: false
        }];
    },
});
Ext.reg('adddata-party-window-create', addData.window.CreateParty);


addData.window.UpdateParty = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'adddata-party-window-update';
    }
    Ext.applyIf(config, {
        title: _('adddata_party_update'),
        width: 550,
        autoHeight: true,
        url: addData.config.connectorUrl,
        action: 'mgr/control/party/update',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    addData.window.UpdateParty.superclass.constructor.call(this, config);
};
Ext.extend(addData.window.UpdateParty, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'hidden',
            name: 'id',
            id: config.id + '-id',
        }, {
            xtype: 'textfield',
            fieldLabel: _('adddata_name'),
            name: 'party',
            id: config.id + '-party',
            anchor: '99%',
            allowBlank: false
        }];
    },
});
Ext.reg('adddata-party-window-update', addData.window.UpdateParty);
