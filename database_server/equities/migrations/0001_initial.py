# Generated by Django 4.1.4 on 2023-01-15 23:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('purchases', '0001_initial'),
        ('portfolios', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Equity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('symbol', models.CharField(max_length=10)),
                ('sector', models.CharField(choices=[('Energy', 'Energy'), ('Materials', 'Materials'), ('Industrials', 'Industrials'), ('Consumer Discretionary', 'Consumer Discretionary'), ('Consumer Staples', 'Consumer Staples'), ('Health Care', 'Health Care'), ('Financials', 'Financials'), ('Information Technology', 'Information Technology'), ('Telecommunication Services', 'Telecommunication Services'), ('Utilities', 'Utilities'), ('Real Estate', 'Real Estate')], default='Energy', max_length=50)),
                ('buy_price', models.DecimalField(decimal_places=2, max_digits=12)),
                ('quantity', models.IntegerField()),
                ('last_updated_price', models.DecimalField(decimal_places=2, max_digits=12)),
                ('price_difference', models.DecimalField(decimal_places=2, max_digits=12)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('portfolio', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='portfolios.portfolio')),
                ('purchase', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='purchases.purchase')),
            ],
        ),
    ]