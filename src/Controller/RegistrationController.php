<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationFormType;
use App\Security\EmailVerifier;
use Doctrine\ORM\EntityManagerInterface;
use ReflectionClass;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mime\Address;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\String\UnicodeString;
use SymfonyCasts\Bundle\VerifyEmail\Exception\VerifyEmailExceptionInterface;

class RegistrationController extends AbstractController
{
    private EmailVerifier $emailVerifier;

    public function __construct(EmailVerifier $emailVerifier)
    {
        $this->emailVerifier = $emailVerifier;
    }

    #[Route('/register', name: 'app_register')]
    public function register(
        Request $request,
        UserPasswordHasherInterface $passwordHasher, // Updated to UserPasswordHasherInterface
        EntityManagerInterface $entityManager, // Injected directly
        AuthenticationUtils $authenticationUtils, // For login functionality
        TokenStorageInterface $tokenStorage
    ): Response {
        $user = new User();
        $form = $this->createForm(RegistrationFormType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // hash the plain password using the updated interface
            $user->setPassword(
                $passwordHasher->hashPassword(
                    $user,
                    $form->get('plainPassword')->getData()
                )
            );

            // Persist the user using EntityManagerInterface
            $entityManager->persist($user);
            $entityManager->flush();

            // Generate a signed url and email it to the user
            $this->emailVerifier->sendEmailConfirmation(
                'app_verify_email',
                $user,
                (new TemplatedEmail())
                    ->from(
                        new Address(
                            $this->getParameter('notification_email'),
                            $this->getParameter('notification_email_name')
                        )
                    )
                    ->to($user->getEmail())
                    ->subject('Please Confirm your Email')
                    ->htmlTemplate('email/registration/confirmation_email.html.twig')
            );

            // Automatically log the user in by generating a valid session after registration
            $tokenStorage->setToken(
                new UsernamePasswordToken($user, 'main', $user->getRoles()),
            );

            return new JsonResponse(['success' => true]);
        }

        if ($form->isSubmitted()) {
            $errors = [];
            foreach ($form->getErrors(true) as $error) {
                $formField = $error->getOrigin()->getName();
                $errors[$formField][] = $error->getMessage();
            }

            return new JsonResponse([
                'success' => false,
                'errors' => $errors
            ], 400);
        }

        return new JsonResponse([
            'success' => false,
            'message' => 'Form not submitted'
        ], 400);
    }

    #[Route('/register/render', name: 'app_register_render')]
    public function getRegistrationFormConfig(): JsonResponse
    {
        $form = $this->createForm(RegistrationFormType::class);

        // Extract fields and constraints from the form
        $formFields = [];

        foreach ($form->all() as $fieldName => $field) {
            $fieldConfig = [
                'name' => $fieldName,
                'type' => $this->getFieldType($field),
                'constraints' => $this->getFieldConstraints($field),
                'label' => $field->getConfig()->getOption('label'),
            ];

            $formFields[] = $fieldConfig;
        }

        return new JsonResponse([
            'formId' => 'registration',
            'fields' => $formFields,
            'csrf_namespace' =>
                $form->getConfig()->getOption('csrf_token_id')
                ?? (new UnicodeString(substr((new ReflectionClass(RegistrationFormType::class))->getShortName(), 0, -4)))->snake()
        ]);
    }

    #[Route('/verify/email', name: 'app_verify_email')]
    public function verifyUserEmail(Request $request): Response
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

        try {
            // Verify email confirmation and set the user as verified
            $this->emailVerifier->handleEmailConfirmation($request, $this->getUser());
        } catch (VerifyEmailExceptionInterface $exception) {
            $this->addFlash('verify_email_error', $exception->getReason());

            return $this->redirectToRoute('app_register');
        }

        $this->addFlash('success', 'Your email address has been verified.');

        return $this->redirectToRoute('app_admin');
    }

    private function getFieldType($field): string
    {
        $type = $field->getConfig()->getType()->getInnerType();
        return substr(strtolower((new ReflectionClass($type))->getShortName()), 0, -4);
    }

    private function getFieldConstraints($field): array
    {
        $constraints = $field->getConfig()->getOption('constraints');

        if (!$constraints) {
            return [];
        }

        $constraintData = [];

        foreach ($constraints as $constraint) {
            // Reflection to get the constraint properties
            $reflection = new ReflectionClass($constraint);
            $properties = $reflection->getProperties();

            $constraintDetails = [
                'type' => $reflection->getShortName(), // Get the full class name
                'message' => $constraint->message ?? null, // Default to null if no message is set
            ];

            // Iterate over the properties and add them to the constraint data
            foreach ($properties as $property) {
                $property->setAccessible(true); // Make private/protected properties accessible
                $value = $property->getValue($constraint);

                // Only add the property if it has a non-null value
                if ($value !== null) {
                    $constraintDetails[$property->getName()] = $value;
                }
            }

            $constraintData[] = $constraintDetails;
        }

        return $constraintData;
    }
}
