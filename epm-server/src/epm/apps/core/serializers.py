from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from epm.apps.core.constants import UserRole


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        token_data = super().validate(attrs)
        # refresh = self.get_token(self.user)

        if self.user.is_staff:
            role = UserRole.STAFF
            ability = [{
                'action': 'manage',
                'subject': 'all'
            }]
        else:
            role = UserRole.PATIENT
            ability = [
                {'action': 'read', 'subject': 'ACL'},
                {'action': 'read', 'subject': 'Auth'}
            ]

        data = {
            'success': True,
            'userData': {
                'role': role,
                'ability': ability,
                'firstName': self.user.first_name,
                'lastName': self.user.last_name,
                'email': self.user.username,
                'username': self.user.email,
                'fullName': f'{self.user.first_name} {self.user.last_name}'
            },
            'accessToken': token_data.get('access'),
            'refreshToken': token_data.get('refresh')
        }

        return data
