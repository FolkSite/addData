addData.combo.ValueCharacteristic = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        name: 'name'
        ,hiddenName: 'name'
        ,displayField: 'name'
        ,valueField: 'name'
        ,fields: ['id','name']
        ,pageSize: 20
        ,url: addData.config.connector_url
        ,baseParams: {
            action: 'mgr/resource/characteristic/getname',
            res_id: addData.config.res_id
        }
        ,typeAhead: true
        ,editable: true
    });
    addData.combo.ValueCharacteristic.superclass.constructor.call(this,config);
};
Ext.extend(addData.combo.ValueCharacteristic, MODx.combo.ComboBox);
Ext.reg('adddata-combo-value-characteristic', addData.combo.ValueCharacteristic);
