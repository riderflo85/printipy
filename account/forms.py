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
