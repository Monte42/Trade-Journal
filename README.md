![banner](https://user-images.githubusercontent.com/43256859/213949889-ca652f4f-8ac9-4542-b529-56d90e3bf831.png)

# :collision: Trade Journal :collision:
A place to track an organize trade plans and strategy and more! :smile:
> **Project Structure:** *Python/Django-Database Backend // Node/Express-Chat & s3 Comms // React-Frontend*

## API Features
- Look up current company information by its **TICKER**
- Look up recent news articles by a company's **TICKER**
- Get the last quarters income statements, balance sheets, cash flow
- Get last 12 quarters of **EPS** (Earnings Per Share)
- Get Candle Charts for an adjustable period by a company's **TICKER**

## User Features
- Create, Update, Delete users
- Get user portfolio data with charts :chart_with_upwards_trend::bar_chart:
- User images are uploaded to, and served from AWS s3
- User can create a portfolio ( or **Journal** )
- User can create, read, edit portfolio
- Users can create a purchase / which creates and equity
- Equities can be update / which updates equity value & total portfolio value
- When purchases marked sold **Deletes** the associated equity
- account balance (**Buying Power**) is updated and portfolio growth is tracked :heavy_dollar_sign::heavy_dollar_sign::partying_face:

## Strategy
It's a good idea to have a plan in mind when you take a stake in a new company. \
User can create notes tied to each purchase to document this strategy \
Some good things to consider are:
- Buy Time **OR** Price :moneybag:
- Sell Time **OR** Price :watch:
- Reasons for interest ( Technical **AND** Fundamental )