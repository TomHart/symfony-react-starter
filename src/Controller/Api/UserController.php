<?php

namespace App\Controller\Api;

use App\Entity\User;
use App\Form\UpdateEmailFormType;
use App\Form\UpdatePasswordFormType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use SymfonyCasts\Bundle\ResetPassword\Controller\ResetPasswordControllerTrait;

class UserController extends AbstractController
{
    use ResetPasswordControllerTrait;

    #[Route('/user', name: 'api_user', methods: ['GET'])]
    public function getUserAction(): Response
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json([], Response::HTTP_NOT_FOUND);
        }

        return $this->json($user, Response::HTTP_OK, [], ['groups' => ['api']]);
    }

//    #[Route('/users', name: 'user_list')]
//    public function index(EntityManagerInterface $em, SerializerInterface $serializer): Response
//    {
//        $users = $em->getRepository(User::class)->findAll();
//
//        return new JsonResponse(json_decode($serializer->serialize($users, 'json')));
//    }

    #[Route('/user/{id}/email', name: 'api_user_email_update', methods: ['POST'])]
    public function updateUserEmailAction(int $id, Request $request, EntityManagerInterface $em): Response
    {
        /** @var User $user */
        $user = $this->getUser();
        if (null === $user || $user->getId() !== $id) {
            return $this->json([], Response::HTTP_NOT_FOUND);
        }

        $form = $this->createForm(UpdateEmailFormType::class, $user);
        $form->handleRequest($request);
        if (!$form->isSubmitted() || !$form->isValid()) {
            $errors = [];
            foreach ($form->getErrors(true) as $error) {
                $formField = $error->getOrigin()->getName() ?: 'general';
                $errors[$formField][] = $error->getMessage();
            }
            return $this->json(['errors' => $errors], Response::HTTP_BAD_REQUEST);
        }

        $em->persist($user);
        $em->flush();

        return $this->json($user, Response::HTTP_OK, [], ['groups' => ['api']]);
    }

    #[Route('/user/{id}/password', name: 'api_user_password_update', methods: ['POST'])]
    public function updateUserPasswordAction(
        int $id,
        Request $request,
        UserPasswordHasherInterface $passwordHasher,
        EntityManagerInterface $em
    ): Response {
        /** @var User $user */
        $user = $this->getUser();
        if (null === $user || $user->getId() !== $id) {
            return $this->json([], Response::HTTP_NOT_FOUND);
        }

        $form = $this->createForm(UpdatePasswordFormType::class, $user);
        $form->handleRequest($request);
        if (!$form->isSubmitted() || !$form->isValid()) {
            $errors = [];
            foreach ($form->getErrors(true) as $error) {
                $formField = $error->getOrigin()->getName() ?: 'general';
                $errors[$formField][] = $error->getMessage();
            }
            return $this->json(['errors' => $errors], Response::HTTP_BAD_REQUEST);
        }

        // Encode the plain password, and set it.
        $encodedPassword = $passwordHasher->hashPassword(
            $user,
            $form->get('plainPassword')->getData()
        );

        $user->setPassword($encodedPassword);
        $em->flush();

        // The session is cleaned up after the password has been changed.
        $this->cleanSessionAfterReset();

        return $this->json($user, Response::HTTP_OK, [], ['groups' => ['api']]);
    }
}
