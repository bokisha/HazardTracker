# HazardTracker

<p align="center">
  <img width="300" height="300" src="/logo.png">
</p>

## Problem
COVID-19 pandemic caught the entire planet by surprise. Low awareness and high spreading speeds created chaos amongst the world's most enhanced healthcare systems. Lack of space, supplies, equipment and human resources contributed millions of infected and thousands of deaths, which is a significant mortality rate of this virus.

## Solution
The main purpose of this mobile application is to increase awareness of potential health risks during pandemic times by registering the presence of people in public places (supermarkets, restaurants, coffee shops, etc). Our application will hold information about people, such as their device's IMEI (unique identification number) and timelines of their movements. This information will be obtained simply by providing the users with an in-app QR scanner to scan the codes upon entering and leaving the location. Collecting this type of information is essential so that the users can later be informed in case they were exposed to potential contamination reported by an individual who visited the same place at the same time and marked themselves as infected.

## Solution Workflow

### Scanning process

1. The user arrives at a location.
2. Security checks the current status of the user on the application - the level of risk (check the reporting process for more information).
3. The user scans the location-unique entry QR code displayed at the entrance.  
The system records his location, timestamp, and IMEI and then pushes the information to the server.
4. The user scans the location-unique exit QR code displayed at the store exit.  
The system records his location, timestamp, and IMEI and then pushes the information to the server.

This way the user will have complete information about entering and exiting specific places under a dedicated tab in the application.

### Reporting process

When the user recognizes some symptoms of the pandemic and is tested positive, he is responsible to click the add hazard button in the application and report himself as being sick. All the other users who were at the same place at the same time as the user who reported himself as infected, receive a push notification and are placed in different risk levels of being sick that our algorithm calculates (low, medium, high). It is the user's responsibility to then take the appropriate actions to keep himself and others safe.

## Added Value
Prevention of the spread. Built-in application notifications will make sure that every contamination report is communicated to all potentially affected parties. Another benefit of this system is a real-time tracker of the number of registered users in public places. This feature ensures that the traffic is reduced in those places since users will hopefully choose the least populated areas to go to.

## Ultimate Challenge
Real-life implementation is THE ultimate challenge we are facing. HazardTracker will not be effective if not all or most of the public stores\places are included in the effort. Either government enforces our idea upon them, or we get enough places to collaborate with. People need to responsibly scan the code at every place they visit, thus ensuring the effectiveness of HazardTracker.

## HazardTracker Team
We are based in Belgrade, Serbia. The team consists of five developers and a quality assurance analyst, which all currently work for FIS, in the Belgrade office. Our goal is to make the world a better-prepared place in case of a similar situation we currently find ourselves in!
