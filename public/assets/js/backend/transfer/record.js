define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'transfer/record/index' + location.search,
                    add_url: 'transfer/record/add',
                    edit_url: 'transfer/record/edit',
                    del_url: 'transfer/record/del',
                    multi_url: 'transfer/record/multi',
                    import_url: 'transfer/record/import',
                    table: 'transfer_record',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                fixedColumns: true,
                fixedRightNumber: 1,
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'txID', title: __('Txid'), table: table, events: Table.api.events.operate, formatter: function (value, row, index) {
                           var str = value.substring(value.length-5);
                           var str2 = value.substring(0,5);
                           return '<a href="https://tronscan.io/#/transaction/'+value+'" target="_black" style="color:#4397fd"  title="'+value+'">'+str2+'.......'+str+'<a>';
                            
                        }},
                        {field: 'trecord.txID', title: "中奖哈希", table: table, events: Table.api.events.operate, formatter: function (value, row, index) {
                           var str = value.substring(value.length-5);
                           var str2 = value.substring(0,5);
                           return '<a href="https://tronscan.io/#/transaction/'+value+'" target="_black" style="color:#4397fd"  title="'+value+'">'+str2+'.......'+str+'<a>';
                            
                        }},
                        // {field: 'grid', title: __('Grid')},
                        {field: 'amount',searchable:false, title: __('Amount'),table: table, events: Table.api.events.operate,searchable:false, formatter: function (value, row, index) {
                           
                           return '<span style="color:#4397fd">'+value+'<span>'+row.currency;
                            
                        }},
                        {field: 'owner_address', title: __('Owner_address'), table: table, events: Table.api.events.operate, formatter: function (value, row, index) {
                           var str = value.substring(value.length-5);
                           var str2 = value.substring(0,5);
                           return '<span  title="'+value+'">'+str2+'.......'+str+'<span>';
                            
                        }},
                        {field: 'to_address', title: __('To_address'), table: table, events: Table.api.events.operate, formatter: function (value, row, index) {
                           var str = value.substring(value.length-5);
                           var str2 = value.substring(0,5);
                           return '<span  title="'+value+'">'+str2+'.......'+str+'<span>';
                            
                        }},
                        {field: 'type', title: __('Type'), operate: 'LIKE',searchable:false},
                        {field: 'contractRet', title: __('Contractret'), operate: 'LIKE',searchable:false,formatter: function (value, row, index) {
                         if(value == 1){
                             return "SUCCESS"
                         }else{
                             return value;
                         }
                        }},
                        {field: 'createtime', title: __('Createtime'),formatter: Table.api.formatter.datetime,operate: 'RANGE', addclass: 'datetimerange', sortable: true},
                        {field: 'updatetime', title: __('Updatetime'),formatter: Table.api.formatter.datetime,operate: 'RANGE', addclass: 'datetimerange', sortable: true},
                        // {field: 'currency', title: __('Currency'), operate: 'LIKE'},
                        // {field: 'createtime', title: __('Createtime')},
                        // {field: 'updatetime', title: __('Updatetime')},
                        {field: 'remark', title: __('Remark'), operate: 'LIKE'},
                        // {field: 'trecord.id', title: __('Record.id')},
                        // {field: 'record.txID', title: __('Record.txid'), operate: 'LIKE'},
                        // {field: 'record.amount', title: __('Record.amount'), operate:'BETWEEN'},
                        // {field: 'record.owner_address', title: __('Record.owner_address'), operate: 'LIKE'},
                        // {field: 'record.to_address', title: __('Record.to_address'), operate: 'LIKE'},
                        // {field: 'record.type', title: __('Record.type'), operate: 'LIKE'},
                        // {field: 'record.contractRet', title: __('Record.contractret'), operate: 'LIKE'},
                        // {field: 'record.status', title: __('Record.status')},
                        // {field: 'record.wintype', title: __('Record.wintype'), operate: 'LIKE'},
                        // {field: 'record.winmoney', title: __('Record.winmoney'), operate:'BETWEEN'},
                        // {field: 'record.currency', title: __('Record.currency'), operate: 'LIKE'},
                        // {field: 'record.createtime', title: __('Record.createtime')},
                        // {field: 'record.updatetime', title: __('Record.updatetime')},
                        // {field: 'record.remark', title: __('Record.remark'), operate: 'LIKE'},
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
