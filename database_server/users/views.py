import bcrypt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer
from .models import User
import re

pwd_regex = r"^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$!%^&*.,;:=+-_<>?|/(){}])[\w\d@#$!%^&*]{6,18}$"
email_regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'

# Create your views here.
@api_view(['POST'])
def create_user(request, format=None):
    newUser = request.data.copy()
    errors = validateForm(newUser,True)
    if bool(errors): return Response(errors, status.HTTP_400_BAD_REQUEST)
    newUser.pop('confirmPassword', None)
    hashed = bcrypt.hashpw(
        bytes(newUser['password'],'utf-8'),
        bcrypt.gensalt()
    ).decode('utf-8')
    newUser['password'] = hashed
    serializer = UserSerializer(data=newUser)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def login(request, format=None):
    try:
        user = User.objects.get(username=request.data['username'])
    except User.DoesNotExist:
        return Response({"message":"Invalid Username/Password"},status.HTTP_400_BAD_REQUEST)
    serializer = UserSerializer(user)
    if not bcrypt.checkpw(bytes(request.data["password"],'utf-8'),bytes(user.password, 'utf-8')):
        return Response({"message":"Invalid Username/Password"},status.HTTP_400_BAD_REQUEST)
    request.session['user'] = serializer.data
    return Response(serializer.data)

@api_view(['GET'])
def fetch_all_users(request, format=None):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def fetch_user_by_username(request, username, format=None):
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = UserSerializer(user)
    return Response(serializer.data)



@api_view(['GET','PUT','DELETE'])
def get_edit_delete_user_by_id(request, id, format=None):
    newUser = request.data.copy()
    errors = validateForm(newUser)
    if bool(errors): return Response(errors, status.HTTP_400_BAD_REQUEST)
    try:
        user = User.objects.get(pk=id)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'PUT':
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    serializer = UserSerializer(user)
    return Response(serializer.data)


def validateForm(userData,newUser=False):
    err_dict = {}
    for k in userData:
        if k == 'password' and newUser:
            if not re.match(pwd_regex, userData[k]):
                err_dict[k] = "Password must have Numbers,Letters,Capitals, and a speacil character"
            if len(userData[k]) < 8:
                err_dict[k] = "Password must be atleast 8 characters long"
        else:
            if k == 'email':
                if not re.match(email_regex, userData[k]):
                    err_dict[k] = "Please enter a valid email"
                if User.objects.filter(email=userData[k]).exists() and newUser:
                    err_dict[k] = f"Sorry, but this {k} is in use"
            if k == 'username' and newUser:
                if User.objects.filter(username=userData[k]).exists():
                    err_dict[k] = f"Sorry, but this {k} is in use"
            if k!='user_image_url' and len(userData[k]) < 2:
                err_dict[k] = f"{k.capitalize().replace('_',' ')} must be at least 2 characters"
    if 'confirmPassword' in userData.keys():
        err_dict.pop('confirmPassword', None)
        if userData["password"] != userData["confirmPassword"]:
            err_dict['confirmPassword'] = "Please ensure you passwords match"
    return err_dict