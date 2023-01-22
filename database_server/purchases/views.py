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
    errors = validate_form(request.data)
    if bool(errors): return Response(errors, status.HTTP_400_BAD_REQUEST)
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
        errors = validate_form(request.data)
        if bool(errors): return Response(errors, status.HTTP_400_BAD_REQUEST)
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
    purchases = Purchase.objects.all().order_by('is_sold').filter(portfolio=id)
    serializer = PurchaseSerializer(purchases, many=True)
    return Response(serializer.data)

def validate_form(form_data):
    err_dict = {}
    if len(form_data['symbol'])<2:
        err_dict['symbol'] = "Symbol must be at least 2 characters long"
    if int(form_data['quantity'])<1:
        err_dict['quantity'] = 'You must own at least one stake to create a journal log'
    if float(form_data['share_buy_price'])<=0:
        err_dict['share_buy_price'] = 'Share price must be greater than $0.00'
    if float(form_data['total_buy_price'])<=0:
        err_dict['total_buy_price'] = 'Total price must be greater than $0.00'
    return err_dict