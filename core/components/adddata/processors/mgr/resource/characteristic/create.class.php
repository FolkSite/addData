<?php

class addDataResCharacteristicCreateProcessor extends modObjectCreateProcessor
{
    public $classKey = 'addDataValue';
    public $languageTopics = array('adddata');
    protected $resId = 0;


    /**
     * @return bool
     */
    public function initialize() {
        $properties = $this->getProperties();
        if ($properties) {
            $this->resId = (int)$properties['res_id'];
        }

        return parent::initialize();
    }


    /**
     * @return bool
     */
    public function beforeSet()
    {
        $name = trim($this->getProperty('name'));
        if (empty($name)) {
            $this->modx->error->addField('name', $this->modx->lexicon('adddata_characteristic_err_name'));
        } elseif ($this->modx->getCount($this->classKey, array('name' => $name, 'resource_id' => $this->resId))) {
            $this->modx->error->addField('name', $this->modx->lexicon('adddata_characteristic_err_ae'));
        }

        return parent::beforeSet();
    }

}

return 'addDataResCharacteristicCreateProcessor';