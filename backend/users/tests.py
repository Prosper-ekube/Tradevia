from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

User = get_user_model()


class RegisterViewTests(APITestCase):
    # ... unchanged from Phase 1 ...
    url = "/api/auth/register/"

    def register(self, **overrides):
        payload = {
            "fullName": "Jane Doe",
            "email": "jane@example.com",
            "password": "sUp3rSecure!pass",
        }
        payload.update(overrides)
        return self.client.post(self.url, payload)

    def test_register_creates_user_and_returns_token(self):
        response = self.register()
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("token", response.data)
        self.assertIn("user", response.data)

    # ...other register tests unchanged...


class LoginViewTests(APITestCase):
    url = "/api/auth/login/"

    def setUp(self):
        self.user = User.objects.create_user(
            username="jane@example.com",
            email="jane@example.com",
            first_name="Jane",
            password="sUp3rSecure!pass",
        )

    def test_login_returns_token_and_user(self):
        response = self.client.post(self.url, {
            "email": "jane@example.com",
            "password": "sUp3rSecure!pass",
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("token", response.data)
        self.assertIn("user", response.data)
        self.assertEqual(response.data["user"]["email"], "jane@example.com")
        self.assertEqual(response.data["user"]["first_name"], "Jane")

    def test_login_rejects_wrong_password(self):
        response = self.client.post(self.url, {
            "email": "jane@example.com",
            "password": "wrong-password",
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_rejects_unknown_email(self):
        response = self.client.post(self.url, {
            "email": "nobody@example.com",
            "password": "sUp3rSecure!pass",
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class LogoutViewTests(APITestCase):
    url = "/api/auth/logout/"

    def setUp(self):
        self.user = User.objects.create_user(
            username="jane@example.com",
            email="jane@example.com",
            password="sUp3rSecure!pass",
        )
        self.token = Token.objects.create(user=self.user)

    def test_logout_invalidates_token(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token.key}")
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Token.objects.filter(user=self.user).exists())

    def test_logout_requires_auth(self):
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)