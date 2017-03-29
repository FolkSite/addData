<?php

class addDataPartyCreateProcessor extends modObjectCreateProcessor
{
    public $classKey = 'addDataParty';
    public $languageTopics = array('adddata');


    /**
     * @return bool
     */
    public function beforeSet()
    {
        $name = trim($this->getProperty('party'));
        if (empty($name)) {
            $this->modx->error->addField('party', $this->modx->lexicon('adddata_party_err_name'));
        } elseif ($this->modx->getCount($this->classKey, array('party' => $name))) {
            $this->modx->error->addField('party', $this->modx->lexicon('adddata_party_err_ae'));
        }

        return parent::beforeSet();
    }

}

return 'addDataPartyCreateProcessor';