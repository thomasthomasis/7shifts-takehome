<?php

namespace Tests\Unit;

use App\Role;
use PHPUnit\Framework\TestCase;

class RoleTest extends TestCase
{

    public function test_it_has_three_cases(): void
    {
        $this->assertCount(3, Role::cases());
    }

    public function test_it_resolves_from_its_string_value(): void
    {
        $this->assertSame(Role::Server, Role::from('server'));
        $this->assertSame(Role::Cook, Role::from('cook'));
        $this->assertSame(Role::Manager, Role::from('manager'));
    }
}
