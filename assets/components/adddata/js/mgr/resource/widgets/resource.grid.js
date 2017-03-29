addData.grid.ResCharacteristics = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'adddata-grid-res-characteristics';
    }
    Ext.applyIf(config, {
        url: addData.config.connector_url,
        fields: this.getFields(config),
        columns: this.getColumns(config),
        tbar: this.getTopBar(config),
        sm: new Ext.grid.CheckboxSelectionModel(),
        baseParams: {
            action: 'mgr/resource/characteristic/getlist',
            res_id: addData.config.res_id
        },
        listeners: {
            rowDblClick: function (grid, rowIndex, e) {
                var row = grid.store.getAt(rowIndex);
                this.updateResCharacteristic(grid, e, row);
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
    });
    addData.grid.ResCharacteristics.superclass.constructor.call(this, config);

    // Clear selection on grid refresh
    this.store.on('load', function () {
        if (this._getSelectedIds().length) {
            this.getSelectionModel().clearSelections();
        }
    }, this);
};
Ext.extend(addData.grid.ResCharacteristics, MODx.grid.Grid, {
    windows: {},

    getMenu: function (grid, rowIndex) {
        var ids = this._getSelectedIds();

        var row = grid.getStore().getAt(rowIndex);
        var menu = addData.utils.getMenu(row.data['actions'], this, ids);

        this.addContextMenuItem(menu);
    },

    createResCharacteristic: function (btn, e) {
        var w = MODx.load({
            xtype: 'adddata-res-characteristic-window-create',
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

    updateResCharacteristic: function (btn, e, row) {
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
                action: 'mgr/resource/characteristic/get',
                id: id
            },
            listeners: {
                success: {
                    fn: function (r) {
                        var w = MODx.load({
                            xtype: 'adddata-res-characteristic-window-update',
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

    removeResCharacteristic: function () {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.msg.confirm({
            title: ids.length > 1
                ? _('adddata_characteristics_remove')
                : _('adddata_characteristic_remove'),
            text: ids.length > 1
                ? _('adddata_characteristics_remove_confirm')
                : _('adddata_characteristic_remove_confirm'),
            url: this.config.url,
            params: {
                action: 'mgr/resource/characteristic/remove',
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
        return ['id', 'name', 'value', 'description', 'party', 'actions'];
    },

    getColumns: function () {
        return [{
            header: 'id',
            dataIndex: 'id',
            sortable: true,
            width: 70,
            hidden: true
        }, {
            header: _('adddata_name'),
            dataIndex: 'name',
            sortable: true,
            width: 200,
        }, {
            header: _('adddata_value'),
            dataIndex: 'value',
            sortable: true,
            width: 200,
        },{
            header: _('adddata_description'),
            dataIndex: 'description',
            sortable: false,
            width: 250,
        }, {
            header: _('adddata_party'),
            dataIndex: 'party',
            sortable: true,
            width: 250,
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
            text: '<i class="icon icon-plus"></i>&nbsp;' + _('adddata_characteristic_create'),
            handler: this.createResCharacteristic,
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
                }
            }
        }];
    },

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
Ext.reg('adddata-grid-res-characteristics', addData.grid.ResCharacteristics);