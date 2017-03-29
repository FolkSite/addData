<?php

/**
 * The home manager controller for addData.
 *
 */
class addDataHomeManagerController extends modExtraManagerController
{
    /** @var addData $addData */
    public $addData;


    /**
     *
     */
    public function initialize()
    {
        $path = $this->modx->getOption('adddata_core_path', null,
                $this->modx->getOption('core_path') . 'components/adddata/') . 'model/adddata/';
        $this->addData = $this->modx->getService('adddata', 'addData', $path);
        parent::initialize();
    }


    /**
     * @return array
     */
    public function getLanguageTopics()
    {
        return array('adddata:default');
    }


    /**
     * @return bool
     */
    public function checkPermissions()
    {
        return true;
    }


    /**
     * @return null|string
     */
    public function getPageTitle()
    {
        return $this->modx->lexicon('adddata');
    }


    /**
     * @return void
     */
    public function loadCustomCssJs()
    {
        $this->addCss($this->addData->config['cssUrl'] . 'mgr/main.css');
        $this->addCss($this->addData->config['cssUrl'] . 'mgr/bootstrap.buttons.css');

        $this->addJavascript($this->addData->config['jsUrl'] . 'mgr/adddata.js');
        $this->addJavascript($this->addData->config['jsUrl'] . 'mgr/misc/utils.js');
        $this->addJavascript($this->addData->config['jsUrl'] . 'mgr/misc/combo.js');

        $this->addJavascript($this->addData->config['jsUrl'] . 'mgr/control/sections/home.js');
        $this->addJavascript($this->addData->config['jsUrl'] . 'mgr/control/widgets/control.panel.js');
        $this->addJavascript($this->addData->config['jsUrl'] . 'mgr/control/widgets/control.grid.js');
        $this->addJavascript($this->addData->config['jsUrl'] . 'mgr/control/widgets/control.windows.js');
        $this->addJavascript($this->addData->config['jsUrl'] . 'mgr/control/combo.js');

        $this->addHtml('<script type="text/javascript">
        addData.config = ' . json_encode(array_merge($this->addData->config, $this->addData->getDescription())) . ';
        Ext.onReady(function() {
            MODx.load({ xtype: "adddata-page-home"});
        });
        </script>
        ');
    }


    /**
     * @return string
     */
    public function getTemplateFile()
    {
        return $this->addData->config['templatesPath'] . 'home.tpl';
    }
}