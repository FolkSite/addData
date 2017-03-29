<?php

class addDataCharacteristicsDisableProcessor extends modObjectProcessor
{
    public $classKey = 'addDataCharacteristics';
    public $languageTopics = array('adddata');


    /**
     * @return array|string
     */
    public function process()
    {
        if (!$this->checkPermissions()) {
            return $this->failure($this->modx->lexicon('access_denied'));
        }

        $ids = $this->modx->fromJSON($this->getProperty('ids'));
        if (empty($ids)) {
            return $this->failure($this->modx->lexicon('adddata_characteristics_err_ns'));
        }

        foreach ($ids as $id) {
            /** @var addDataCharacteristics $object */
            if (!$object = $this->modx->getObject($this->classKey, $id)) {
                return $this->failure($this->modx->lexicon('adddata_characteristics_err_nf'));
            }

            $object->set('active', false);
            $object->save();
        }

        return $this->success();
    }

}

return 'addDataCharacteristicsDisableProcessor';
