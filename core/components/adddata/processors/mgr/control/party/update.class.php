<?php

class addDataPartyUpdateProcessor extends modObjectUpdateProcessor
{
    public $classKey = 'addDataParty';
    public $languageTopics = array('adddata');


    /**
     * We doing special check of permission
     * because of our objects is not an instances of modAccessibleObject
     *
     * @return bool|string
     */
    public function beforeSave()
    {
        if (!$this->checkPermissions()) {
            return $this->modx->lexicon('access_denied');
        }

        return true;
    }


    /**
     * @return bool
     */
    public function beforeSet()
    {
        $id = (int)$this->getProperty('id');
        $name = trim($this->getProperty('party'));
        if (empty($id)) {
            return $this->modx->lexicon('adddata_party_err_ns');
        }

        if (empty($name)) {
            $this->modx->error->addField('party', $this->modx->lexicon('adddata_party_err_name'));
        } elseif ($this->modx->getCount($this->classKey, array('party' => $name, 'id:!=' => $id))) {
            $this->modx->error->addField('party', $this->modx->lexicon('adddata_party_err_ae'));
        }

        return parent::beforeSet();
    }
}

return 'addDataPartyUpdateProcessor';
