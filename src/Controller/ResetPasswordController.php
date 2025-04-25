<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\ChangePasswordFormType;
use App\Form\ResetPasswordRequestFormType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use SymfonyCasts\Bundle\ResetPassword\Controller\ResetPasswordControllerTrait;
use SymfonyCasts\Bundle\ResetPassword\Exception\ResetPasswordExceptionInterface;
use SymfonyCasts\Bundle\ResetPassword\ResetPasswordHelperInterface;

class ResetPasswordController extends AbstractController
{
    use ResetPasswordControllerTrait;

    private ResetPasswordHelperInterface $resetPasswordHelper;

    private EntityManagerInterface $entityManager;

    public function __construct(
        ResetPasswordHelperInterface $resetPasswordHelper,
        EntityManagerInterface $entityManager
    ) {
        $this->resetPasswordHelper = $resetPasswordHelper;
        $this->entityManager = $entityManager;
    }

    /**
     * @throws TransportExceptionInterface
     */
    #[Route('/reset-password', name: 'app_forgot_password_request')]
    public function request(Request $request, MailerInterface $mailer): Response
    {
        $form = $this->createForm(ResetPasswordRequestFormType::class);
        $form->handleRequest($request);

        if (!$form->isSubmitted() || !$form->isValid()) {
            $errors = [];
            foreach ($form->getErrors(true) as $error) {
                $formField = $error->getOrigin()->getName() ?: 'general';
                $errors[$formField][] = $error->getMessage();
            }
            return $this->json(['errors' => $errors], Response::HTTP_BAD_REQUEST);
        }

        return $this->processSendingPasswordResetEmail(
            $form->get('email')->getData(),
            $mailer
        );
    }

    #[Route('/reset-password/check-email', name: 'app_check_email')]
    public function checkEmail(): Response
    {
        // We prevent users from directly accessing this page
        if (!$this->getTokenObjectFromSession()) {
            return $this->redirectToRoute('app_forgot_password_request');
        }

        return $this->render('email/reset_password/check_email.html.twig', [
            'tokenLifetime' => $this->resetPasswordHelper->getTokenLifetime(),
        ]);
    }

    #[Route('/reset-password/reset/{token}', name: 'app_reset_password')]
    public function reset(Request $request, UserPasswordHasherInterface $passwordHasher, string $token = null): Response
    {
        if ($token) {
            // we store the token in session and remove it from the url, to avoid the url being
            // loaded in a browser and potentially leaking the token to 3rd party javascript.
            $this->storetokeninsession($token);

            return $this->redirect('/#reset-password/reset');
        }

        $token = $this->gettokenfromsession();
        if (null === $token) {
            throw $this->createnotfoundexception('no reset password token found in the url or in the session.');
        }

        try {
            $user = $this->resetpasswordhelper->validatetokenandfetchuser($token);
            assert($user instanceof passwordauthenticateduserinterface);
        } catch (resetpasswordexceptioninterface $e) {
            return $this->json([
                'errors' => [
                    'general' => [
                        sprintf(
                            'there was a problem validating your reset request - %s',
                            $e->getreason()
                        )
                    ],
                ],
            ], response::http_bad_request);
        }

        // the token is valid; allow the user to change their password.
        $form = $this->createform(changepasswordformtype::class);
        $form->handlerequest($request);

        if (!$form->issubmitted() || !$form->isvalid()) {
            $errors = [];
            foreach ($form->geterrors(true) as $error) {
                $formfield = $error->getorigin()->getname() ?: 'general';
                $errors[$formfield][] = $error->getmessage();
            }
            return $this->json(['errors' => $errors], response::http_bad_request);
        }

        // a password reset token should be used only once, remove it.
        $this->resetpasswordhelper->removeresetrequest($token);

        // encode the plain password, and set it.
        $encodedpassword = $passwordhasher->hashpassword(
            $user,
            $form->get('plainpassword')->getdata()
        );

        $user->setpassword($encodedpassword);
        $this->entitymanager->flush();

        // the session is cleaned up after the password has been changed.
        $this->cleansessionafterreset();

        return $this->json(['success' => true]);
    }

    /**
     * @throws TransportExceptionInterface
     */
    private function processSendingPasswordResetEmail(string $emailFormData, MailerInterface $mailer): JsonResponse
    {
        $user = $this->entityManager->getRepository(User::class)->findOneBy([
            'email' => $emailFormData,
        ]);

        $lifetime = $this->resetPasswordHelper->getTokenLifetime();
        $goodResponse = $this->json([
            'success' => true,
            'tokenLifetime' => date('g', $lifetime)
        ]);

        // Do not reveal whether a user account was found or not.
        if (!$user) {
            return $goodResponse;
        }

        try {
            $resetToken = $this->resetPasswordHelper->generateResetToken($user);
        } catch (ResetPasswordExceptionInterface) {
            return $goodResponse;
        }

        $email = (new TemplatedEmail())
            ->from(
                new Address(
                    $this->getParameter('notification_email'),
                    $this->getParameter('notification_email_name')
                )
            )
            ->to($user->getEmail())
            ->subject('Your password reset request')
            ->htmlTemplate('email/reset_password/email.html.twig')
            ->context([
                'resetToken' => $resetToken,
                'tokenLifetime' => $this->resetPasswordHelper->getTokenLifetime(),
            ]);

        $mailer->send($email);

        $goodResponse = $this->json([
            'success' => true,
            'tokenLifetime' => date('g', $lifetime),
            'token' => $resetToken,
            'a' => $resetToken->getToken()
        ]);

        // Marks that you are allowed to see the app_check_email page.
        $this->setTokenObjectInSession($resetToken);

        return $goodResponse;
    }
}
