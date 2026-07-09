<?php

namespace App;

enum Role : string
{
    case Server = 'server';
    case Cook = 'cook';
    case Manager = 'manager';
}
