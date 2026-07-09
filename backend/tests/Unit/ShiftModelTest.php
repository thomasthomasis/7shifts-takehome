<?php

namespace Tests\Unit;

use App\Models\Shift;
use App\Role;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Tests\TestCase;

class ShiftModelTest extends TestCase
{
    public function test_role_attribute_is_cast_to_the_enum(): void
    {
        $shift = new Shift(['role' => 'cook']);

        $this->assertSame(Role::Cook, $shift->role);
    }

    public function test_day_attribute_is_cast_to_a_date(): void
    {
        $shift = new Shift(['day' => '2026-07-20']);

        $this->assertInstanceOf(Carbon::class, $shift->day);
    }

    public function test_it_defines_a_staff_relationship(): void
    {
        $shift = new Shift();

        $this->assertInstanceOf(BelongsTo::class, $shift->staff());
    }
}