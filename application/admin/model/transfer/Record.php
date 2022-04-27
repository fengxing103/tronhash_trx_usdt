<?php

namespace app\admin\model\transfer;

use think\Model;


class Record extends Model
{

    

    

    // 表名
    protected $name = 'transfer_record';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'int';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = 'updatetime';
    protected $deleteTime = false;

    // 追加属性
    protected $append = [

    ];
    

    







    public function trecord()
    {
        return $this->belongsTo('app\admin\model\game\Record', 'grid', 'id', [], 'LEFT')->setEagerlyType(0);
    }
}
