addData.grid.Groups = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'adddata-grid-group';
    }
    Ext.applyIf(config, {
        url: addData.config.connectorUrl,
        fields: this.getFields(config),
        columns: this.getColumns(config),
        tbar: this.getTopBar(config),
        sm: new Ext.grid.CheckboxSelectionModel(),
        baseParams: {
            action: 'mgr/group/getlist'
        },
        listeners: {
            rowDblClick: function (grid, rowIndex, e) {
                var row = grid.store.getAt(rowIndex);
                this.updateGroup(grid, e, row);
            }
        },
        viewConfig: {
            forceFit: true,
            enableRowBody: true,
            autoFill: true,
            showPreview: true,
            scrollOffset: 0
        },
        paging: true,
        remoteSort: true,
        autoHeight: true,
        width: 700
    });
    addData.grid.Groups.superclass.constructor.call(this, config);

    // Clear selection on grid refresh
    this.store.on('load', function () {
        if (this._getSelectedIds().length) {
            this.getSelectionModel().clearSelections();
        }
    }, this);
};
Ext.extend(addData.grid.Groups, MODx.grid.Grid, {
    windows: {},

    getMenu: function (grid, rowIndex) {
        var ids = this._getSelectedIds();

        var row = grid.getStore().getAt(rowIndex);
        var menu = addData.utils.getMenu(row.data['actions'], this, ids);

        this.addContextMenuItem(menu);
    },

    createGroup: function (btn, e) {

        console.log(btn, e);


        var w = MODx.load({
            xtype: 'adddata-group-window-create',
            id: Ext.id(),
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    }, scope: this
                }
            }
        });
        w.reset();
        w.setValues({active: true});
        w.show(e.target);
    },

    updateGroup: function (btn, e, row) {
        if (typeof(row) != 'undefined') {
            this.menu.record = row.data;
        }
        else if (!this.menu.record) {
            return false;
        }
        var id = this.menu.record.id;

        MODx.Ajax.request({
            url: this.config.url,
            params: {
                action: 'mgr/group/get',
                id: id
            },
            listeners: {
                success: {
                    fn: function (r) {
                        var w = MODx.load({
                            xtype: 'adddata-group-window-update',
                            id: Ext.id(),
                            record: r,
                            listeners: {
                                success: {
                                    fn: function () {
                                        this.refresh();
                                    }, scope: this
                                }
                            }
                        });
                        w.reset();
                        w.setValues(r.object);
                        w.show(e.target);
                    }, scope: this
                }
            }
        });
    },

    removeGroup: function () {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.msg.confirm({
            title: ids.length > 1
                ? _('adddata_groups_remove')
                : _('adddata_group_remove'),
            text: ids.length > 1
                ? _('adddata_groups_remove_confirm')
                : _('adddata_group_remove_confirm'),
            url: this.config.url,
            params: {
                action: 'mgr/group/remove',
                ids: Ext.util.JSON.encode(ids),
            },
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    }, scope: this
                }
            }
        });
        return true;
    },

    getFields: function () {
        return ['id', 'res_group', 'actions'];
    },

    getColumns: function () {
        return [{
            header: 'id',
            dataIndex: 'id',
            sortable: true,
            width: 70,
            hidden: true
        }, {
            header: _('adddata_group_name'),
            dataIndex: 'res_group',
            sortable: true,
            width: 200,
        }, {
            header: _('adddata_grid_actions'),
            dataIndex: 'actions',
            renderer: addData.utils.renderActions,
            sortable: false,
            width: 100,
            id: 'actions'
        }];
    },

    getTopBar: function () {
        return [{
            text: '<i class="icon icon-plus"></i>&nbsp;' + _('adddata_group_create'),
            handler: this.createGroup,
            scope: this
        }, '->', {
            xtype: 'adddata-field-search',
            width: 250,
            listeners: {
                search: {
                    fn: function (field) {
                        this._doSearch(field);
                    }, scope: this
                },
                clear: {
                    fn: function (field) {
                        field.setValue('');
                        this._clearSearch();
                    }, scope: this
                },
            }
        }/*, {
            text: '<i class="icon icon-chevron-up"></i> ' + _('modExtra_items_export'),
            handler: this.importCSV, // функция-обработчик кнопки
            scope: this
        }*/];
    },

    importCSV: function (btn, e) {
        if (!this.windows.ImportCSV) {
            this.windows.ImportCSV = MODx.load({
                xtype: 'modextra-window-import-csv'
                ,listeners: {
                    'success': {fn:function(){this.refresh();},scope:this}
                    ,'failure': {fn:function(){console.log("error")}}
                }
            });
        }
        this.windows.ImportCSV.fp.getForm().reset();
        this.windows.ImportCSV.show(e.target);

        console.log(btn, e);
    },

    /*createGroup: function (btn, e) {
        var w = MODx.load({
            xtype: 'adddata-group-window-create',
            id: Ext.id(),
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    }, scope: this
                }
            }
        });
        w.reset();
        w.setValues({active: true});
        w.show(e.target);
    },*/

    onClick: function (e) {
        var elem = e.getTarget();
        if (elem.nodeName == 'BUTTON') {
            var row = this.getSelectionModel().getSelected();
            if (typeof(row) != 'undefined') {
                var action = elem.getAttribute('action');
                if (action == 'showMenu') {
                    var ri = this.getStore().find('id', row.id);
                    return this._showMenu(this, ri, e);
                }
                else if (typeof this[action] === 'function') {
                    this.menu.record = row.data;
                    return this[action](this, e);
                }
            }
        }
        return this.processEvent('click', e);
    },

    _getSelectedIds: function () {
        var ids = [];
        var selected = this.getSelectionModel().getSelections();

        for (var i in selected) {
            if (!selected.hasOwnProperty(i)) {
                continue;
            }
            ids.push(selected[i]['id']);
        }

        return ids;
    },

    _doSearch: function (tf) {
        this.getStore().baseParams.query = tf.getValue();
        this.getBottomToolbar().changePage(1);
    },

    _clearSearch: function () {
        this.getStore().baseParams.query = '';
        this.getBottomToolbar().changePage(1);
    }
});
Ext.reg('adddata-grid-group', addData.grid.Groups);



addData.window.ImportCSV = function(config) {
    config = config || {};
    this.ident = config.ident || 'modextra'+Ext.id();
    Ext.applyIf(config,{
        title: _('modextra_items_import')
        ,id: this.ident
        ,fileUpload: true
        ,autoHeight: true
        ,width: 650
        ,url: addData.config.connector_url
        ,action: 'mgr/item/import'
        ,fields: [
            {
                xtype: 'fileuploadfield',
                fieldLabel: _('modextra_window_import_file'),
                allowBlank: false
            }
        ]
        ,keys: [
            {
                key: Ext.EventObject.ENTER
                ,shift: true
                ,fn: function() {this.submit() }
                ,scope: this
            }
        ]
    });
    addData.window.ImportCSV.superclass.constructor.call(this,config);
};
Ext.extend(addData.window.ImportCSV, MODx.Window);
Ext.reg('modextra-window-import-csv', addData.window.ImportCSV);
