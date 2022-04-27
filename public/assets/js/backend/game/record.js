define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'game/record/index' + location.search,
                    add_url: 'game/record/add',
                    edit_url: 'game/record/edit',
                    del_url: 'game/record/del',
                    multi_url: 'game/record/multi',
                    import_url: 'game/record/import',
                    table: 'game_record',
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
                        {field: 'amount',searchable:false, title: __('Amount'),table: table, events: Table.api.events.operate, formatter: function (value, row, index) {
                           
                           return '<span style="color:#4397fd">'+value+'<span>'+row.currency;
                            
                        }},
                        // {field: 'currency', title: __('Currency'), operate: 'LIKE'},
                        {field: 'owner_address', title: __('Owner_address'), operate: 'LIKE',templete:function(d){
                            return 1111;
                        }},
                        {field: 'to_address', title: __('To_address'), table: table, events: Table.api.events.operate, formatter: function (value, row, index) {
                           var str = value.substring(value.length-5);
                           var str2 = value.substring(0,5);
                           return '<span  title="'+value+'">'+str2+'.......'+str+'<span>';
                            
                        }},
                        // {field: 'type', title: __('Type'), operate: 'LIKE'},
                        {field: 'contractRet', title: __('Contractret'), operate: 'LIKE',searchable:false},
                        {field: 'status', title: __('Status'),searchList: {"0":"开奖中","1":"已中奖","2":"未中奖","3":"已发放奖金"}, formatter: Table.api.formatter.status, formatter: function (value, row, index) {
                            if(value == 0){
                                return '<span class="label label-primary"  >开奖中</span>';
                            }else if(value == 1){
                                 return '<span class="label label-warm" style="background:#1E90FF">已中奖</span>';
                            }else if(value == 2){
                                 return '<span class="label label-primary" style="background:#FF4500">未中奖</span>';
                            }else{
                                 return '<span class="label label-primary" style="background:#009688" >已发放奖金</span>';
                            }
                                
                            }},
                        {field: 'wintype', title: __('Wintype'), operate: 'LIKE',formatter: Table.api.formatter.label,searchList: {"牛牛游戏":"牛牛游戏","大小游戏":"大小游戏","双尾游戏":"双尾游戏","单双游戏":"单双游戏"},},
                        
                        {field: 'winmoney', title: __('Winmoney'),table: table, events: Table.api.events.operate,searchable:false, formatter: function (value, row, index) {
                           
                           return '<span style="color:#4397fd">'+value+'<span>'+row.currency;
                            
                        }},
                        {field: 'createtime', title: __('Createtime'),formatter: Table.api.formatter.datetime,operate: 'RANGE', addclass: 'datetimerange', sortable: true},
                        {field: 'updatetime', title: __('Updatetime'),formatter: Table.api.formatter.datetime,operate: 'RANGE', addclass: 'datetimerange', sortable: true},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
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
            },
           
        }
    };
    return Controller;
});
