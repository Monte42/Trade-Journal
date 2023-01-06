from .models import Equity
from .serializers import EquitySerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

@api_view(['GET','POST'])
def add_or_get_equities(request, format=None):
    equities = Equity.objects.all()
    if request.method == 'GET':
        serializer = EquitySerializer(equities, many=True)
        return Response(serializer.data)
    serializer = EquitySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET','PUT','DELETE'])
def get_edit_delete_equity_by_id(request, id,  format=None):
    try:
        equity = Equity.objects.get(pk=id)
    except Equity.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'PUT':
        serializer = EquitySerializer(equity, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        equity.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    serializer = EquitySerializer(equity)
    return Response(serializer.data)

@api_view(['GET'])
def get_equity_by_purchase_id(request,id,format=None):
    equities = Equity.objects.all().filter(purchase=id)
    serializer = EquitySerializer(equities, many=True)
    return Response(serializer.data)
@api_view(['GET'])
def get_equity_by_portfolio_id(request,id,format=None):
    equities = Equity.objects.all().filter(portfolio=id)
    serializer = EquitySerializer(equities, many=True)
    return Response(serializer.data)