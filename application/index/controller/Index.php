<?php

namespace app\index\controller;

use app\common\controller\Frontend;
use think\Db;
class Index extends Frontend
{

    protected $noNeedLogin = '*';
    protected $noNeedRight = '*';
    protected $layout = '';

    public function index()
    {
        $config = Db::name("config")->where("group","wallet")->where("name",'<>','payprivatekey')->column("value","name");
        // 大小游戏 0 单双游戏1
        // dump($config);
        $this->assign("config",$config);
        return $this->view->fetch();
    }

}
