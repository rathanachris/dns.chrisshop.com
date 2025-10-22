<?php
// tests/acceptance/SigninCest.php

class SigninCest
{
    // សាកល្បងការចូលដោយជោគជ័យ
    public function signInSuccessfully(AcceptanceTester $I)
    {
        $I->amOnPage('/login');  // ចូលទំព័រ login
        $I->fillField('Username', 'davert');  // បំពេញ username
        $I->fillField('Password', 'qwerty');  // បំពេញ password
        $I->click('Login');  // ចុចប៊ូតុង login
        $I->see('Hello, davert');  // ពិនិត្យថាឃើញសារស្វាគមន៍
        $I->amOnPage('/dashboard');  // ពិនិត្យថាចូល dashboard បាន
    }

    // សាកល្បងការចូលបរាជ័យ (password ខុស)
    public function signInWithWrongPassword(AcceptanceTester $I)
    {
        $I->amOnPage('/login');
        $I->fillField('Username', 'davert');
        $I->fillField('Password', 'wrongpass');
        $I->click('Login');
        $I->see('Invalid credentials');  // ពិនិត្យថាឃើញសារកំហុស
    }
}
