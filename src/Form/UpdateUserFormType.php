<?php

namespace App\Form;

use App\Entity\User;
use Override;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UpdateUserFormType extends AbstractType
{
    #[Override] public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('email');
    }

    #[Override] public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
            'allow_extra_fields' => true,
        ]);
    }

    #[Override] public function getBlockPrefix(): string
    {
        return '';
    }
}
