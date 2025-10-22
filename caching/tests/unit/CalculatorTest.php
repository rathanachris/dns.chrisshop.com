<?php
// tests/unit/CalculatorTest.php

use PHPUnit\Framework\TestCase;
use App\Calculator;  // សន្មត់ថាអ្នកមានថ្នាក់ Calculator

class CalculatorTest extends TestCase
{
    public function testAdd()
    {
        $calc = new Calculator();
        $this->assertEquals(8, $calc->add(5, 3));
    }
}
