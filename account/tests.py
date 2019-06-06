from django.test import TestCase, Client
from .forms import LoginForm, SignupForm

# Create your tests here.
class StatusCodePageTestCase(TestCase):
    def setUp(self):
        self.cli = Client()

    def test_index_page(self):
        rep = self.cli.get('/')
        self.assertEqual(rep.status_code, 200)

    def test_mini_dashboard_page(self):
        rep = self.cli.get('/minidashboard')
        self.assertEqual(rep.status_code, 200)

    def test_sign_up_page(self):
        rep = self.cli.get('/signup')
        self.assertEqual(rep.status_code, 200)

    def test_sign_out_page(self):
        rep = self.cli.get('/signout')
        self.assertEqual(rep.status_code, 200)

class FormTestCase(TestCase):
    def test_form_login(self):
        data = {'pseudo': 'testUser', 'password': 'longpasswordtest'}
        form = LoginForm(data=data)
        self.assertTrue(form.is_valid())
    
    def test_form_sign_up(self):
        data = {
            'pseudo': 'testUser',
            'first_name': 'USERTEST',
            'last_name': 'Tester',
            'email': 'test@fournisseur.com',
            'password': 'longpasswordtest'
        }
        form = SignupForm(data=data)
        self.assertTrue(form.is_valid())