from .models import Portfolio
from .serializers import PortfolioSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET','POST'])
def get_or_add_portfolio_list(request, format=None):
    portfolios = Portfolio.objects.all()
    if request.method == 'GET':
        serializer = PortfolioSerializer(portfolios, many=True)
        return Response(serializer.data)
    newData = request.data.copy()
    errors = validate_form(newData)
    if bool(errors): return Response(errors, status.HTTP_400_BAD_REQUEST)
    newData['account_number'] = Portfolio.genAccountNumber()
    serializer = PortfolioSerializer(data=newData)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET','PUT','DELETE'])
def get_edit_delete_portfolio_by_id(request,id,format=None):
    try:
        portfolio = Portfolio.objects.get(pk=id)
    except Portfolio.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'PUT':
        serializer = PortfolioSerializer(portfolio, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        portfolio.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    serializer = PortfolioSerializer(portfolio)
    return Response(serializer.data)

@api_view(['GET'])
def get_portfolio_buy_user_id(request,id,format=None):
    try:
        portfolio = Portfolio.objects.get(user=id)
    except Portfolio.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = PortfolioSerializer(portfolio)
    return Response(serializer.data)

def validate_form(formData):
    if formData['balance']<1.0: return {'balance':'You can not start a journal with a balance less than $1'}