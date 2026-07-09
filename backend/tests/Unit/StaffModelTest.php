<?php

namespace Tests\Unit;

use App\Models\Staff;
use App\Role;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Tests\TestCase;

class StaffModelTest extends TestCase
{
    public function test_role_attribute_is_cast_to_the_enum(): void
    {
        $staff = new Staff(['role' => 'server']);

        $this->assertSame(Role::Server, $staff->role);
    }

    public function test_it_defines_a_shifts_relationship(): void
    {
        $staff = new Staff();

        $this->assertInstanceOf(HasMany::class, $staff->shifts());
    }
}