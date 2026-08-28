PRELAUNCH SECURITY REVIEW MEMO
 
To
Integration lead and cloud engineer
From
Security reviewer
Subject
Pre-launch security review
Date
27th August 2026
 
PURPOSE
​The purpose of this activity was to scan our team GitHub repository for accidentally exposed sensitive information, such as passwords, API keys, access tokens, potential social engineering risks in the websites contact form, HTTPS communication and website certificate.
TOOL AND ENVIRONMENT
-REPOSITORY SCAN: the project repository was scanned using gitleaks an open source secret detection tool. This scan was to identify any exposed API keys, credentials, passwords or sensitive information.
RESULT: no leaks or exposed secrets were detected
-SOCIAL ENGINEERING/CONTACT FORM REVIEW: the website’s contact form was reviewed for any social engineering risk with attention given to unnecessary urgency, request for passwords or credentials, request for API keys or sensitive information and instructions that could make user disclose information.
RESULT: no red flags identified
-HTTPS AND CERTIFICATE REVIEW: the website was checked if it is being served on HTTPS and not HTTP. Here checked the website URL and confirmed it was HTTPS, trying opening the website using HTTP and the was a redirect to HTTPS showing it was served securely.
Checked the website certificate and the certificate domain matched the website domain, the certificate was valid
RESULT: no critical HTTPS or certificate issue was identified during review
OVERALL ASSESSMENT: PASS-NO CRITICAL PRE-LAUNCH SECURITY BLOCKERS IDENTIFIED
LAUNCH DECISION
​Based on the review and checks performed, no security issue was identified that should block the launch. Therefore, the website can be launched
