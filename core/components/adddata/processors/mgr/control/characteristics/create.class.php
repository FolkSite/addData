<?php

class addDataCharacteristicsCreateProcessor extends modObjectCreateProcessor
{
    public $objectType = 'addDataCharacteristics';
    public $classKey = 'addDataCharacteristics';
    public $languageTopics = array('adddata');


    /**
     * @return bool
     */
    public function beforeSet()
    {
        $name = trim($this->getProperty('name'));
        if (empty($name)) {
            $this->modx->error->addField('name', $this->modx->lexicon('adddata_characteristic_err_name'));
        } elseif ($this->modx->getCount($this->classKey, array('name' => $name))) {
            $this->modx->error->addField('name', $this->modx->lexicon('adddata_characteristic_err_ae'));
        }

        return parent::beforeSet();
    }

}

return 'addDataCharacteristicsCreateProcessor';