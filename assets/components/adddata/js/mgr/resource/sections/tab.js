Ext.ComponentMgr.onAvailable('modx-resource-tabs', function() {
    this.on('beforerender', function() {
        this.add({
            title: _('adddata'),
            id: 'adddata-tab-resource',
            layout: 'anchor',
            items: [{
                xtype: 'adddata-grid-res-characteristics',
                cls: 'main-wrapper'
            }]
        });
    });
});

