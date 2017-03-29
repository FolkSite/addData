<?php

class addDataPartyRemoveProcessor extends modObjectProcessor
{
    public $classKey = 'addDataParty';
    public $languageTopics = array('adddata');
    //public $permission = 'remove';


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
            return $this->failure($this->modx->lexicon('adddata_party_err_ns'));
        }

        foreach ($ids as $id) {
            /** @var addDataParty $object */
            if (!$object = $this->modx->getObject($this->classKey, $id)) {
                return $this->failure($this->modx->lexicon('adddata_party_err_nf'));
            }

            $groupName = $object->get('party');

            if ($characteristics = $this->modx->getIterator('addDataCharacteristics',
                array('party' => $groupName))) {

                foreach ($characteristics as $characteristic) {
                    $characteristic->set('party', '');
                    $characteristic->save();
                }
            }

            $object->remove();
        }

        return $this->success();
    }

}

return 'addDataPartyRemoveProcessor';