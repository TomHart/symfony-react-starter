<?php

declare(strict_types=1);

namespace App\Form\InputType;

use Symfony\Component\Form\Extension\Core\Type\SubmitType as BaseSubmitType;
use Symfony\Component\OptionsResolver\OptionsResolver;

class SubmitType extends BaseSubmitType
{
    public function configureOptions(OptionsResolver $resolver): void
    {
        parent::configureOptions($resolver);
        $resolver->setDefaults([
            'submittingText' => 'Saving...',
        ]);
    }

}