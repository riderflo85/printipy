from django import forms

class LoginForm(forms.Form):
    pseudo = forms.CharField(
        label='pseudo',
        max_length=100,
        widget=forms.TextInput(
            attrs={'placeholder': 'Pseudo', 'class': 'form-control'}
        ),
    )
    password = forms.CharField(
        label='password',
        widget=forms.PasswordInput(
            attrs={'placeholder': 'Mot de passe', 'class': 'form-control'}
        ),
    )

class SignupForm(forms.Form):
    last_name = forms.CharField(
        label='nom',
        max_length=30,
        widget=forms.TextInput(
            attrs={'placeholder': 'Nom', 'class': 'form-control'}
        ),
    )
    first_name = forms.CharField(
        label='prénom',
        max_length=30,
        widget=forms.TextInput(
            attrs={'placeholder': 'Prénom', 'class': 'form-control'}
        ),
    )
    pseudo = forms.CharField(
        label='pseudo',
        max_length=30,
        widget=forms.TextInput(
            attrs={'placeholder': 'Pseudo', 'class': 'form-control'}
        ),
    )
    email = forms.EmailField(
        label='email',
        widget=forms.EmailInput(
            attrs={'placeholder': 'Email', 'class': 'form-control'}
        ),
    )
    password = forms.CharField(
        label='password',
        min_length=8,
        widget=forms.PasswordInput(
            attrs={'placeholder': 'Mot de passe', 'class': 'form-control'}
        ),
    )


class CreatePrinter(forms.Form):
    name = forms.CharField(
        label='name',
        max_length=150,
        widget=forms.TextInput(
            attrs={'placeholder': "Nom de l'imprimante", 'class': 'form-control'}
        ),
    )
    model = forms.CharField(
        label='model',
        max_length=150,
        widget=forms.TextInput(
            attrs={'placeholder': "Model de l'imprimante", 'class': 'form-control'}
        ),
    )