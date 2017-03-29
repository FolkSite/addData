addData.combo.Party = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        name: 'party'
        ,hiddenName: 'party'
        ,displayField: 'party'
        ,valueField: 'party'
        ,fields: ['id','party']
        ,pageSize: 20
        ,url: addData.config.connectorUrl
        ,baseParams: {
            action: 'mgr/control/party/getlist'
        }
        ,typeAhead: true
        ,editable: true
    });
    addData.combo.Party.superclass.constructor.call(this,config);
};
Ext.extend(addData.combo.Party, MODx.combo.ComboBox);
Ext.reg('adddata-combo-party', addData.combo.Party);