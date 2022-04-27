define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'game/commission/index' + location.search,
                    add_url: 'game/commission/add',
                    edit_url: 'game/commission/edit',
                    del_url: 'game/commission/del',
                    multi_url: 'game/commission/multi',
                    import_url: 'game/commission/import',
                    table: 'game_commission',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'txID', title: __('Txid'), table: table, events: Table.api.events.operate, formatter: function (value, row, index) {
                           var str = value.substring(value.length-5);
                           var str2 = value.substring(0,5);
                           return '<a href="https://tronscan.io/#/transaction/'+value+'" target="_black" style="color:#4397fd"  title="'+value+'">'+str2+'.......'+str+'<a>';
                            
                        }},
                        {field: 'amount',searchable:false, title: __('Amount'),table: table, events: Table.api.events.operate, formatter: function (value, row, index) {
                           
                           return '<span style="color:#4397fd">'+value+'<span>'+row.currency;
                            
                        }},
                        {field: 'to_address', title: __('To_address'), operate: 'LIKE'},
                        {field: 'currency', title: __('Currency'), operate: 'LIKE',searchable:false},
                        {field: 'createtime', title: __('Createtime'),formatter: Table.api.formatter.datetime,operate: 'RANGE', addclass: 'datetimerange', sortable: true},
                        {field: 'remark', title: __('Remark'), operate: 'LIKE'},
                        // {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        add: function () {
            Controller.api.bindevent();
        },
        edit: function () {
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});
