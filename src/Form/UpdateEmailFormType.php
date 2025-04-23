<?php

namespace App\Form;

use App\Entity\User;
use Override;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UpdateEmailFormType extends AbstractType
{
    #[Override] public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('email', EmailType::class)
        ;
    }

    #[Override] public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
            'csrf_token_id' => 'update_email'
        ]);
    }

    #[Override] public function getBlockPrefix(): string
    {
        return '';
    }
}
