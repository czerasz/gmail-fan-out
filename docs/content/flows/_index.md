---
title: Flows
weight: 3
---

{{< lead >}}Learn how subscribing, unsubscribing and sending out emails work{{< /lead >}}

## Fan Out Process

Find the flow diagram below:

![process](../img/gmail-fan-out-process.svg)

Every hour the cron job triggers the `forwardEmails` function which checks for new emails.
If new emails from `PRODUCER_EMAIL` are available they are forwarded to all subscribers and maked as "consumed" by an label.

## Subscribe

The subscribe flow diagram is presented below:

![subscribe](../img/gmail-fan-out-subscribe.svg)

## Unsubscribe

The unsubscribe flow diagram is presented below:

![unsubscribe](../img/gmail-fan-out-unsubscribe.svg)
