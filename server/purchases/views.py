from .models import Purchase
from .serializers import PurchaseSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET','POST'])
def add_or_get_purchases(request,format=None):
    purchases = Purchase.objects.all()
    if request.method == 'GET':
        serializer = PurchaseSerializer(purchases, many=True)
        return Response(serializer.data)
    serializer = PurchaseSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET','PUT','DELETE'])
def get_edit_delete_purchase_by_id(request,id,format=None):
    try:
        purchase = Purchase.objects.get(pk=id)
    except Purchase.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'PUT':
        serializer = PurchaseSerializer(purchase, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        purchase.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    serializer = PurchaseSerializer(purchase)
    return Response(serializer.data)

@api_view(['GET'])
def get_purchases_by_portfolio_id(request,id,format=None):
    purchases = Purchase.objects.all().filter(portfolio=id)
    serializer = PurchaseSerializer(purchases, many=True)
    return Response(serializer.data)