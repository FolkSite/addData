<?php

class addData
{
    /** @var modX $modx */
    public $modx;


    /**
     * @param modX $modx
     * @param array $config
     */
    function __construct(modX &$modx, array $config = array())
    {
        $this->modx =& $modx;

        $corePath = $this->modx->getOption('adddata_core_path', $config,
            $this->modx->getOption('core_path') . 'components/adddata/'
        );
        $assetsUrl = $this->modx->getOption('adddata_assets_url', $config,
            $this->modx->getOption('assets_url') . 'components/adddata/'
        );
        $connectorUrl = $assetsUrl . 'connector.php';
        $actionUrl = $assetsUrl . 'action.php';

        $this->config = array_merge(array(
            'assetsUrl' => $assetsUrl,
            'cssUrl' => $assetsUrl . 'css/',
            'jsUrl' => $assetsUrl . 'js/',
            //'imagesUrl' => $assetsUrl . 'images/',
            'connectorUrl' => $connectorUrl,
            'actionUrl' => $actionUrl,

            'corePath' => $corePath,
            'modelPath' => $corePath . 'model/',
            'chunksPath' => $corePath . 'elements/chunks/',
            'templatesPath' => $corePath . 'elements/templates/',
            'snippetsPath' => $corePath . 'elements/snippets/',
            'processorsPath' => $corePath . 'processors/',
        ), $config);

        $this->modx->addPackage('adddata', $this->config['modelPath']);
        $this->modx->lexicon->load('adddata:default');
    }


    public function getDescription($desc = array())
    {
        $q = $this->modx->newQuery('addDataDesc');
        $tmp = $this->getGroups('addDataDesc', $q);
        foreach ($tmp as $d) {
            $desc[$d->get('name')] = $d->get('description');
        }
        return $desc;
    }

    // Список всех групп
    public function getGroups($class, $property)
    {
        $object = $this->modx->getIterator($class, $property);
        $object->rewind();
        if ($object->valid()) {
            return $object;
        }

    }


    public function getOption($key)
    {
        return str_replace(' ', '', $this->modx->getOption($key));
    }


    public function loadJsCssMgr(modManagerController $controller, $id)
    {
        $controller->addLexiconTopic('adddata:default');

        $controller->addCss($this->config['cssUrl'] . 'mgr/main.css');

        $controller->addJavascript($this->config['jsUrl'] . 'mgr/adddata.js');
        $controller->addJavascript($this->config['jsUrl'] . 'mgr/misc/utils.js');
        $controller->addJavascript($this->config['jsUrl'] . 'mgr/misc/combo.js');
        if ($this->modx->getCount('addDataCharacteristics')) {
            $controller->addJavascript($this->config['jsUrl'] . 'mgr/resource/sections/tab.js');
        }
        $controller->addJavascript($this->config['jsUrl'] . 'mgr/resource/widgets/resource.panel.js');
        $controller->addJavascript($this->config['jsUrl'] . 'mgr/resource/widgets/resource.grid.js');
        $controller->addJavascript($this->config['jsUrl'] . 'mgr/resource/widgets/resource.windows.js');
        $controller->addJavascript($this->config['jsUrl'] . 'mgr/resource/combo.js');

        $controller->addHtml('<script type="text/javascript">
            addData.config = {
                connector_url : "' . $this->config['connectorUrl'] . '",
                 "res_id":"' . $id . '"
             }
            </script>
        ');


        return;
    }

}