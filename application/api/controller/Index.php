<?php

namespace app\api\controller;

use app\common\controller\Api;
use IEXBase\TronAPI\Tron;
/**
 * 首页接口
 */
class Index extends Api
{
    protected $noNeedLogin = ['*'];
    protected $noNeedRight = ['*'];
    
   
    
    /**
     * 首页
     *
     */
     
    public function index()
    {
        $this->success(__('发送成功'));
            
    }
    
     
    
    
}
