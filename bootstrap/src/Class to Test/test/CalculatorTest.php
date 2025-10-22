<?php
namespace Tests;

use App\Calculator;
use PHPUnit\Framework\TestCase;

class CalculatorTest extends TestCase
{
    private $calculator;

    // រៀបចំមុនពេលរត់ test នីមួយៗ
    protected function setUp(): void
    {
        $this->calculator = new Calculator();
    }

    // សាកល្បងមុខងារ add
    public function testAdd()
    {
        $result = $this->calculator->add(5, 3);
        $this->assertEquals(8, $result, "5 + 3 should equal 8");
    }

    // សាកល្បងមុខងារ subtract
    public function testSubtract()
    {
        $result = $this->calculator->subtract(5, 3);
        $this->assertEquals(2, $result, "5 - 3 should equal 2");
    }

    // សាកល្បងមុខងារ divide
    public function testDivide()
    {
        $result = $this->calculator->divide(6, 2);
        $this->assertEquals(3, $result, "6 / 2 should equal 3");
    }

    // សាកល្បងករណី divide នឹងសូន្យ
    public function testDivideByZeroThrowsException()
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage("Cannot divide by zero");
        $this->calculator->divide(10, 0);
    }
}
