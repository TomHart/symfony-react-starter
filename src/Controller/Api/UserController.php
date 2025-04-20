<?php

namespace App\Controller\Api;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;
use App\Form\UpdateUserFormType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class UserController extends AbstractController
{
    #[Route('/user', name: 'api_user', methods: ['GET'])]
    public function getUserAction(): Response
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json([], Response::HTTP_NOT_FOUND);
        }

        return $this->json($user, Response::HTTP_OK, [], ['groups' => ['api']]);
    }

    #[Route('/users', name: 'user_list')]
    public function index(EntityManagerInterface $em): Response
    {
        $users = $em->getRepository(User::class)->findAll();

        return new JsonResponse($users);
    }

    #[Route('/user/{id}', name: 'api_user_update', methods: ['POST'])]
    public function updateUserAction(int $id, Request $request, EntityManagerInterface $em): Response
    {
        /** @var User $user */
        $user = $this->getUser();
        if (null === $user || $user->getId() !== $id) {
            return $this->json([], Response::HTTP_NOT_FOUND);
        }

        $form = $this->createForm(UpdateUserFormType::class, $user);
        $form->handleRequest($request);
        if (!$form->isSubmitted() || !$form->isValid()) {
            $errors = $form->getErrors(true);
            return $this->json(['errors' => $errors], Response::HTTP_BAD_REQUEST);
        }

        $em->persist($user);
        $em->flush();

        return $this->json($user, Response::HTTP_OK, [], ['groups' => ['api']]);
    }
}
