# GraphQL CRM

## Description

Welcome to the CRM (Customer Relationship Management) system designed to streamline customer management, sales tracking, and financial monitoring for your business. This comprehensive CRM solution is tailored to efficiently handle various aspects of customer interactions and sales operations.

### Key Features

- *Customer Management*
    - Organize and maintain customer profiles with detailed information.
    - Track customer interactions and communication history.
    - Update customer statuses to reflect their current engagement level.

- *Sales Agent Activity Logging*
    - Monitor sales agent activities and interactions with customers.
    - Record updates on customer statuses and relevant comments.
    - Maintain a comprehensive history of sales agent-customer interactions.

- *Financial Tracking*
    - Manage installment payments from customers.
    - Track payment schedules and overdue installments.
    - Monitor financial transactions related to customer purchases and payments.

- *Product Purchase Recording*
    - Record purchases made by customers for products offered by the company.
    - Track product ownership and customer preferences.

## Technologies used

1. Apollo Server
2. TypeORM with PostgresQL
3. Dataloader
3. Docker 

## Docs

### ERD

![ERD](/docs/GraphQL%20CRM%20ERD.png "ERD")

### Demo

> To be Added

## Setup

`docker compose up -d --build`

> This command will build the image as specified in the Dockerfile, spin up a graphql-crm container, pull the postgres image from docker hub if it doesn't exist on your machine, and spin up a postgresdb container

