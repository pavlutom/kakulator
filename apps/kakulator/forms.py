from django import forms


class BasicKakulatorForm(forms.Form):
    query = forms.CharField(max_length=255)
