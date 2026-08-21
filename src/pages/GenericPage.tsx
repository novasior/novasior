import { useParams, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, FileText, RotateCcw, Mail, ArrowRight, Clock } from 'lucide-react';

interface LegalDoc {
  title: string;
  subtitle: string;
  lastUpdated: string;
  icon: typeof ShieldCheck;
  content?: string;
  sections: {
    heading: string;
    linesCount: number;
  }[];
}

const privacyPolicyContent = `Effective Date: August 20, 2026

Last Updated: August 20, 2026

Website: https://novasior.vercel.app

This Privacy Policy explains how NOVASIOR ("NOVASIOR", "we", "us", or "our") collects, uses, stores, processes, shares, and protects information relating to individuals who visit our website, purchase our products, communicate with us, create an account, or otherwise interact with NOVASIOR.

NOVASIOR is committed to handling personal information responsibly and in accordance with applicable privacy and data-protection laws.

By using the NOVASIOR website or services, you acknowledge that you have read this Privacy Policy.

1. ABOUT THIS PRIVACY POLICY

This Privacy Policy applies to information collected through:

* The NOVASIOR website.
* NOVASIOR product purchase processes.
* Customer accounts, where applicable.
* Digital-product delivery systems.
* Contact forms.
* Customer-support communications.
* Email communications.
* Social-media interactions where applicable.
* Other online services operated by NOVASIOR that link to this Privacy Policy.

This Privacy Policy does not necessarily apply to websites, applications, or services operated independently by third parties.

Those third parties may have their own privacy policies and terms.

2. INFORMATION WE MAY COLLECT

Depending on how you interact with NOVASIOR, we may collect different categories of information.

This may include:

* Name.
* Email address.
* Phone number, where provided.
* Billing information.
* Shipping information, where relevant to a particular product or service.
* Order information.
* Product purchased.
* Purchase amount.
* Transaction status.
* Order identification information.
* Account information.
* Login information, where accounts are provided.
* Customer-support communications.
* Feedback and reviews.
* Information you voluntarily provide through forms or communications.
* Device and browser information.
* IP address.
* Approximate location derived from technical information, where applicable.
* Website usage information.
* Referral information.
* Cookies and similar technologies.
* Information necessary to detect fraud, abuse, or security threats.

We only seek to collect information that is reasonably relevant to the purposes for which it is processed.

3. PAYMENT INFORMATION

When you purchase a NOVASIOR product, payments may be processed through third-party payment providers.

Depending on the payment method and provider used, NOVASIOR may receive information such as:

* Payment status.
* Transaction ID.
* Order ID.
* Payment method.
* Amount paid.
* Currency.
* Transaction date and time.
* Limited transaction-related information.

NOVASIOR does not necessarily directly receive or store complete card numbers, banking passwords, UPI PINs, or other sensitive payment credentials.

Payment information may be processed directly by the applicable payment provider according to its own terms and privacy policy.

4. INFORMATION PROVIDED DURING PURCHASE

When you purchase a NOVASIOR product, we may collect information necessary to:

* Process your order.
* Confirm payment.
* Deliver your digital product.
* Provide customer support.
* Maintain transaction records.
* Prevent fraud.
* Handle refunds or payment disputes.
* Communicate important transaction information.
* Comply with applicable legal and accounting requirements.

5. INFORMATION PROVIDED VOLUNTARILY

You may voluntarily provide information when you:

* Contact NOVASIOR.
* Submit a support request.
* Subscribe to communications.
* Submit a review.
* Submit feedback.
* Participate in a promotion.
* Complete a form.
* Create an account.
* Communicate with NOVASIOR through email or social media.
* Otherwise communicate with us.

You should avoid submitting unnecessary sensitive personal information through public forms, comments, social-media messages, or other communication channels.

6. AUTOMATICALLY COLLECTED INFORMATION

When you visit the NOVASIOR website, certain technical information may be automatically collected by NOVASIOR or its service providers.

This may include:

* IP address.
* Browser type.
* Device type.
* Operating system.
* Screen characteristics.
* Referring website.
* Pages viewed.
* Approximate time spent on pages.
* Website interaction information.
* Error information.
* Date and time of access.
* General technical information.

This information may be used to maintain security, understand website usage, diagnose technical problems, and improve the website.

7. COOKIES AND SIMILAR TECHNOLOGIES

NOVASIOR may use cookies and similar technologies to support website functionality, security, analytics, preferences, and other legitimate website operations.

Cookies may help us:

* Keep the website functioning.
* Remember certain preferences.
* Understand how visitors use the website.
* Improve website performance.
* Detect suspicious or abusive activity.
* Measure website traffic.
* Improve user experience.

Where required by applicable law, NOVASIOR will provide appropriate information, choices, or consent mechanisms for cookies and similar technologies.

You may be able to control cookies through your browser settings.

Disabling certain cookies may affect some website functionality.

8. WHY WE USE PERSONAL INFORMATION

NOVASIOR may process personal information for purposes including:

* Providing and delivering purchased products.
* Processing orders.
* Confirming payments.
* Providing customer support.
* Responding to inquiries.
* Managing customer accounts.
* Maintaining transaction records.
* Sending transactional communications.
* Sending product-related communications.
* Improving products and services.
* Improving website functionality.
* Understanding website usage.
* Detecting and preventing fraud.
* Protecting website security.
* Preventing unauthorized access.
* Enforcing our Terms of Service.
* Managing refunds and disputes.
* Complying with legal obligations.
* Maintaining business and accounting records.
* Protecting NOVASIOR's legal rights.
* Communicating important changes to services or policies.
* Sending marketing communications where permitted and appropriately authorized.

9. TRANSACTIONAL COMMUNICATIONS

NOVASIOR may send transactional communications that are necessary to complete or manage your purchase or interaction with us.

These may include:

* Order confirmations.
* Payment confirmations.
* Product-delivery emails.
* Download or access information.
* Account-related messages.
* Security notifications.
* Customer-support responses.
* Important service announcements.
* Changes affecting purchased products.
* Refund or transaction-related communications.

Because these communications may be necessary to provide the requested service, they may continue even if you opt out of optional marketing communications.

10. MARKETING COMMUNICATIONS

Where permitted by applicable law and where appropriate consent or another lawful basis is required, NOVASIOR may send promotional communications about:

* Products.
* New launches.
* Offers.
* Discounts.
* Updates.
* Educational content.
* Promotions.
* Other NOVASIOR activities.

You may unsubscribe from promotional email communications using the unsubscribe mechanism provided in the communication or by contacting NOVASIOR.

Unsubscribing from marketing communications does not necessarily stop essential transactional or service-related communications.

11. LEGAL AND BUSINESS PURPOSES

NOVASIOR may process personal information where reasonably necessary to:

* Comply with applicable laws.
* Respond to lawful requests.
* Maintain required records.
* Establish, exercise, or defend legal claims.
* Investigate suspected fraud or abuse.
* Protect the rights, property, security, and safety of NOVASIOR, users, or other persons.
* Enforce contracts and policies.
* Complete legitimate business transactions.

12. DATA MINIMIZATION

NOVASIOR aims to collect and process personal information that is reasonably relevant and necessary for the applicable purpose.

We do not intend to collect personal information merely because it is available.

Where information is not reasonably required for a legitimate purpose, NOVASIOR may avoid collecting it.

13. DATA SHARING

NOVASIOR may share or disclose personal information with third parties where reasonably necessary for legitimate business operations, contractual purposes, legal compliance, security, or other applicable lawful purposes.

Such third parties may include:

* Payment processors.
* Website hosting providers.
* Cloud-storage providers.
* Email delivery providers.
* Customer-support providers.
* Analytics providers.
* Security providers.
* Authentication providers.
* Database providers.
* Product-delivery providers.
* Automation providers.
* Professional advisers.
* Legal or regulatory authorities where required.
* Service providers assisting NOVASIOR in operating its business.

NOVASIOR does not sell personal information merely as a business practice.

14. PAYMENT AND SERVICE PROVIDERS

NOVASIOR may use third-party services to process payments, send emails, store data, host the website, provide analytics, manage products, or perform other operational functions.

Examples may include services such as:

* Razorpay.
* Resend.
* Supabase.
* Vercel.
* Make.
* Google services.
* Analytics providers.
* Other providers introduced as NOVASIOR's technology stack changes.

The actual providers used by NOVASIOR may change over time.

Each applicable third-party provider may process information according to its own terms and privacy practices.

Where required, NOVASIOR will provide appropriate disclosures regarding relevant third-party processing.

15. THIRD-PARTY WEBSITES AND SERVICES

The NOVASIOR website may contain links, integrations, payment interfaces, embedded content, or connections to third-party services.

Examples may include:

* Payment platforms.
* Social-media platforms.
* Analytics platforms.
* Cloud services.
* External websites.
* Marketing platforms.

Once you leave the NOVASIOR website or interact directly with a third-party service, the third party's own privacy practices may apply.

NOVASIOR does not control the privacy practices of independent third parties.

You should review the applicable third party's privacy policy before providing information directly to that third party.

16. DATA RETENTION

NOVASIOR may retain personal information for as long as reasonably necessary for the purposes described in this Privacy Policy.

Retention periods may depend on:

* The nature of the information.
* The purpose for which it was collected.
* Whether an active customer relationship exists.
* Legal or regulatory requirements.
* Accounting requirements.
* Tax requirements.
* Fraud-prevention requirements.
* Dispute-resolution requirements.
* Security requirements.
* Legal claims.
* Business records.

When information is no longer reasonably required, NOVASIOR may delete, anonymize, or otherwise dispose of it in accordance with applicable law and reasonable business practices.

17. DATA SECURITY

NOVASIOR takes reasonable measures designed to protect personal information against unauthorized access, misuse, alteration, disclosure, loss, or destruction.

Security measures may include:

* Access controls.
* Authentication mechanisms.
* Secure connections where appropriate.
* Restricted access to information.
* Service-provider security controls.
* Monitoring and security practices.
* Reasonable technical and organizational safeguards.

However, no internet transmission or storage system can be guaranteed to be completely secure.

Accordingly, NOVASIOR cannot guarantee absolute security of personal information.

18. DATA BREACHES AND SECURITY INCIDENTS

If NOVASIOR becomes aware of a personal-data security incident that triggers obligations under applicable law, NOVASIOR will take reasonable steps required by the applicable legal framework.

Depending on the circumstances, this may include:

* Investigating the incident.
* Taking steps to contain or mitigate the issue.
* Restoring affected systems.
* Notifying relevant authorities where legally required.
* Notifying affected individuals where legally required.
* Taking additional protective measures.

19. YOUR RESPONSIBILITY

You are responsible for taking reasonable steps to protect your own information.

This includes:

* Keeping passwords confidential.
* Using secure devices where possible.
* Avoiding sharing account credentials.
* Logging out of shared devices.
* Keeping your email account secure.
* Not voluntarily submitting unnecessary sensitive information through unsecured channels.

NOVASIOR is not responsible for security failures caused solely by a user's failure to protect their own credentials or device, except where applicable law provides otherwise.

20. CHILDREN'S PRIVACY

NOVASIOR's products and services are not intentionally designed to collect personal information from children in violation of applicable law.

If you are not legally capable of entering into a contract or providing consent required under applicable law, you should not use NOVASIOR services without appropriate involvement of a parent, guardian, or other legally authorized person.

If NOVASIOR becomes aware that personal information has been collected in a manner that violates applicable requirements concerning children, NOVASIOR may take reasonable steps to address the situation.

21. PERSONAL DATA RIGHTS

Subject to applicable law, individuals may have rights relating to their personal information.

Depending on the applicable legal framework, these may include rights concerning:

* Access to information.
* Correction or updating of inaccurate information.
* Withdrawal of consent where processing is based on consent.
* Erasure or deletion where legally applicable.
* Grievance redressal.
* Information regarding processing.
* Other rights provided by applicable law.

The availability and scope of these rights may depend on the applicable law, the type of information, and the reason for processing.

22. WITHDRAWAL OF CONSENT

Where NOVASIOR processes personal information on the basis of consent, you may withdraw that consent where permitted by applicable law.

Withdrawal of consent does not necessarily affect processing that occurred lawfully before withdrawal.

Withdrawal may also affect NOVASIOR's ability to provide certain services where the relevant information is necessary for those services.

Requests may be submitted using the contact information provided below.

23. CORRECTION OF INFORMATION

If you believe information maintained by NOVASIOR is inaccurate or incomplete, you may contact us and request correction where applicable.

To help protect customer accounts and prevent unauthorized requests, NOVASIOR may require reasonable verification before processing a request.

24. DELETION REQUESTS

Where applicable law provides a right to request deletion of personal information, you may contact NOVASIOR using the contact information below.

NOVASIOR may retain certain information where retention is reasonably necessary or legally required, including for:

* Legal compliance.
* Tax records.
* Accounting.
* Fraud prevention.
* Security.
* Dispute resolution.
* Enforcement of agreements.
* Establishment or defense of legal claims.
* Other legally permitted purposes.

25. GRIEVANCE REDRESSAL

If you have a privacy-related complaint, concern, or request, you may contact NOVASIOR using:

Privacy Contact / Grievance Contact:

Name: [NAME / DESIGNATION]

Email: [PRIVACY EMAIL]

Address: [BUSINESS ADDRESS]

NOVASIOR will take reasonable steps to review and address privacy-related concerns in accordance with applicable law.

26. IDENTITY VERIFICATION

To protect personal information and prevent unauthorized access, NOVASIOR may request reasonable information to verify the identity or authority of a person making a privacy request.

NOVASIOR will not request unnecessary information merely for verification.

27. INTERNATIONAL DATA PROCESSING

Some third-party service providers used by NOVASIOR may process or store information outside India.

Where personal information is transferred or processed across jurisdictions, NOVASIOR will take steps required by applicable law and applicable contractual or organizational safeguards.

28. BUSINESS TRANSFERS

If NOVASIOR undergoes a merger, acquisition, restructuring, sale, financing, reorganization, or other business transaction, personal information may be transferred as part of the relevant business assets where legally permitted.

Any such transfer will remain subject to applicable privacy obligations.

29. LEGAL DISCLOSURES

NOVASIOR may disclose personal information where reasonably necessary to:

* Comply with applicable law.
* Respond to lawful governmental requests.
* Respond to court orders or legal processes.
* Protect NOVASIOR's rights.
* Investigate suspected fraud.
* Prevent security threats.
* Protect users or other persons.
* Enforce applicable agreements.
* Establish, exercise, or defend legal claims.

NOVASIOR will seek to limit disclosures to what is reasonably appropriate for the relevant purpose, subject to legal requirements.

30. AGGREGATED AND ANONYMIZED INFORMATION

NOVASIOR may use aggregated, statistical, or appropriately anonymized information for purposes such as:

* Understanding website usage.
* Improving products.
* Measuring performance.
* Research and analysis.
* Business planning.
* Improving customer experience.

Where information has been appropriately anonymized so that individuals cannot reasonably be identified, it may be used for legitimate business purposes in accordance with applicable law.

31. SOCIAL MEDIA

NOVASIOR may maintain accounts on platforms such as Instagram, YouTube, Facebook, X, TikTok, or other social-media platforms.

Interactions with NOVASIOR through those platforms may be subject to the platform's own privacy policy and terms.

NOVASIOR may receive information that you voluntarily provide through such platforms, including comments, messages, profile information made available to us, or other publicly visible information.

NOVASIOR does not control the privacy practices of those platforms.

32. EMAIL COMMUNICATIONS

NOVASIOR may use third-party email service providers to send transactional or promotional communications.

Email service providers may process information such as:

* Email address.
* Delivery status.
* Open or interaction information where applicable.
* IP or technical information associated with email delivery.
* Bounce information.
* Unsubscribe information.

The specific information processed may depend on the provider and the technology used.

33. ANALYTICS

NOVASIOR may use analytics technologies to understand website traffic and user interactions.

Analytics may help us understand:

* Which pages receive traffic.
* How users navigate the website.
* General website performance.
* Technical problems.
* General audience behavior.
* Product and website performance.

Where applicable, NOVASIOR will configure analytics and consent mechanisms in accordance with applicable legal requirements.

34. MARKETING AND ADVERTISING

NOVASIOR may use marketing or advertising technologies to promote its products and services.

Where such technologies involve personal information or tracking technologies regulated by applicable law, NOVASIOR will use them in accordance with applicable requirements.

You may have choices concerning certain marketing communications or tracking technologies depending on the applicable platform and legal framework.

35. PRODUCT REVIEWS AND TESTIMONIALS

If you voluntarily submit a review, testimonial, or other feedback to NOVASIOR, NOVASIOR may use it for legitimate business and promotional purposes where permitted by applicable law and the terms under which the content was submitted.

NOVASIOR will not intentionally publish unnecessary personal information beyond what is reasonably appropriate for the intended use.

If you wish to request removal of a testimonial or review containing your personal information, you may contact NOVASIOR.

36. DATA USED FOR FRAUD PREVENTION

NOVASIOR may process transaction and technical information to detect, prevent, and investigate:

* Fraudulent purchases.
* Unauthorized transactions.
* Account abuse.
* Product piracy.
* Chargeback abuse.
* Automated attacks.
* Security threats.
* Other misuse of NOVASIOR services.

This may include reviewing transaction history, access information, device information, IP information, and other relevant signals where legally permitted.

37. NO SALE OF PERSONAL INFORMATION

NOVASIOR does not intend to sell personal information as a standalone commercial asset.

However, information may be disclosed to service providers and business partners where reasonably necessary to operate the NOVASIOR business, process transactions, deliver products, provide services, comply with law, or perform other legitimate functions.

38. DATA PROCESSING BY SERVICE PROVIDERS

Where NOVASIOR uses third-party service providers to process information on its behalf, NOVASIOR may require appropriate contractual, technical, or organizational measures consistent with applicable law.

Service providers may only have access to information reasonably necessary for the services they provide, subject to the applicable relationship and legal requirements.

39. ACCURACY OF INFORMATION

NOVASIOR relies in part on information provided by users.

You should provide accurate information and notify NOVASIOR when important information changes.

NOVASIOR may not be responsible for problems caused by materially inaccurate or incomplete information provided by the user, except where applicable law provides otherwise.

40. CHANGES TO THIS PRIVACY POLICY

NOVASIOR may update this Privacy Policy from time to time.

Changes may be made to reflect:

* Changes in law.
* Changes in technology.
* Changes in NOVASIOR's services.
* Changes in third-party service providers.
* Changes in data-processing practices.
* Security improvements.
* Business requirements.

The updated Privacy Policy will be published on this page with a revised "Last Updated" date.

Where applicable law requires additional notice or consent for a material change, NOVASIOR will take the required steps.

41. EFFECTIVE DATE

This Privacy Policy is effective from:

August 20, 2026

Last Updated:

August 20, 2026

42. CONTACT NOVASIOR

For privacy questions, data requests, complaints, or concerns, contact:

NOVASIOR

Privacy / Data Contact:

NOVASIOR

Email: novasior@gmail.com

Website: https://novasior.vercel.app

43. GOVERNING FRAMEWORK

This Privacy Policy is intended to operate in accordance with applicable laws and regulations governing personal information and data protection.

Where a mandatory legal requirement provides a greater protection or a different requirement than this Privacy Policy, the applicable legal requirement will prevail.

44. ACKNOWLEDGEMENT

By using the NOVASIOR website, purchasing NOVASIOR products, creating an account, communicating with NOVASIOR, or otherwise interacting with NOVASIOR services, you acknowledge that you have had an opportunity to review this Privacy Policy.

Where applicable law requires consent for a particular processing activity, NOVASIOR will seek consent through an appropriate mechanism.

END OF PRIVACY POLICY
`;

function renderPrivacyContent(content: string) {
  return content.split(/\n\n+/).map((block, index) => {
    const lines = block.split('\n');
    const isHeading = /^\d+\.\s/.test(lines[0]);
    const isBulletList = lines.every((line) => line.startsWith('* ') || line.startsWith('- '));

    if (isHeading) {
      return <h2 key={index} className="pt-6 text-base md:text-lg font-serif font-bold uppercase tracking-wide text-brand-text">{lines[0]}</h2>;
    }

    if (isBulletList) {
      return <ul key={index} className="list-disc space-y-2 pl-5 text-sm md:text-base leading-7 text-brand-text-muted">{lines.map((line) => <li key={line}>{line.slice(2)}</li>)}</ul>;
    }

    return <p key={index} className="whitespace-pre-line text-sm md:text-base leading-7 text-brand-text-muted">{block}</p>;
  });
}

const termsOfServiceContent = `Effective Date: August 20, 2026

Last Updated: August 20, 2026

Website: https://novasior.vercel.app

These Terms of Service ("Terms", "Terms of Service", or "Agreement") govern your access to and use of the NOVASIOR website, digital products, content, services, and related online platforms.

By accessing, browsing, purchasing from, downloading from, or otherwise using the NOVASIOR website or any NOVASIOR product or service, you acknowledge that you have read, understood, and agree to be legally bound by these Terms.

If you do not agree with these Terms, you must not access or use the website or purchase or use NOVASIOR products or services.

1. ABOUT NOVASIOR

NOVASIOR ("NOVASIOR", "we", "us", "our", or "Company") operates an online business providing digital products, educational material, productivity resources, self-improvement resources, lifestyle resources, creative content, and related digital services.

NOVASIOR may offer products including, but not limited to:

- Digital planners
- Habit trackers
- Wallpapers
- Guides
- E-books
- Templates
- Checklists
- Workbooks
- Educational material
- Productivity resources
- Digital files
- Downloadable resources
- Other digital products introduced from time to time

NOVASIOR may modify, add, remove, replace, discontinue, or update products, features, services, content, pricing, or website functionality at its discretion, subject to applicable law and any rights already acquired by customers.

2. ACCEPTANCE OF THESE TERMS

By using the website or purchasing any NOVASIOR product, you confirm that:

- You have read and understood these Terms.
- You agree to comply with these Terms.
- You are legally capable of entering into a binding agreement under applicable law.
- The information you provide to NOVASIOR is accurate and complete.
- You will use NOVASIOR products and services only for lawful purposes.
- You will not use NOVASIOR products, content, website, or intellectual property in a manner prohibited by these Terms.

If you are accessing NOVASIOR on behalf of another person or entity, you represent that you have authority to bind that person or entity to these Terms.

3. CHANGES TO THESE TERMS

NOVASIOR may update or modify these Terms from time to time.

The updated version will be published on this page with an updated "Last Updated" or "Effective Date". Unless otherwise required by applicable law, the updated Terms will apply to future use of the website and future purchases from the date they become effective.

4. WEBSITE USE

You may access and use the NOVASIOR website for lawful personal purposes and in accordance with these Terms.

You must not:

- Use the website for unlawful purposes.
- Attempt to gain unauthorized access to the website, servers, databases, systems, or accounts.
- Attempt to bypass or interfere with website security.
- Introduce malware, viruses, malicious code, or harmful material.
- Conduct automated scraping, crawling, data extraction, or systematic downloading without prior written authorization.
- Interfere with the operation or availability of the website.
- Attempt to reverse engineer, decompile, or disassemble website software except where prohibited by applicable law.
- Impersonate NOVASIOR or another person.
- Use NOVASIOR's name, identity, or content to create confusion regarding affiliation, sponsorship, or authorization.
- Engage in fraudulent, deceptive, abusive, or malicious activity.

NOVASIOR reserves the right to restrict or terminate access where reasonably necessary to protect the website, users, business, systems, intellectual property, or legal interests of NOVASIOR, subject to applicable law.

5. DIGITAL PRODUCTS

NOVASIOR primarily provides digital products that may be delivered electronically. Customers are responsible for providing accurate contact information and maintaining access to the email address, account, device, software, and internet connection required to receive and use the purchased product.

Products may be provided through:

- Direct download
- Email delivery
- Customer account access
- Cloud-based access
- Third-party platforms
- Secure links
- Other electronic delivery methods selected by NOVASIOR

The exact delivery method may vary between products.

6. PRODUCT DESCRIPTIONS

NOVASIOR makes reasonable efforts to describe its products accurately. Product previews, screenshots, demonstrations, mockups, examples, or promotional images may not represent the exact appearance of every file or device.

Digital products may differ in appearance depending on the device, operating system, software, screen resolution, application, browser, or other technical environment. Features may change where reasonably necessary for product improvement, compatibility, security, or technical reasons.

NOVASIOR does not guarantee that every product will be compatible with every device, operating system, software application, browser, or third-party platform unless such compatibility is expressly stated.

7. PURCHASES AND ORDERS

When you place an order through the NOVASIOR website, you are making a request to purchase the selected product under the applicable purchase terms.

NOVASIOR may reject, cancel, or restrict an order where reasonably necessary, including for suspected fraud, unauthorized payment activity, duplicate orders, technical errors, incorrect pricing caused by an obvious error, product availability issues, abuse of promotional offers, violation of these Terms, or legal and regulatory requirements.

Where a payment has already been received and NOVASIOR cancels an order for a reason requiring repayment, NOVASIOR will process the applicable refund in accordance with the Refund Policy and applicable law.

8. PRICES AND PAYMENTS

Prices displayed on the website are subject to change. The price applicable to an order will generally be the price displayed at the time the order is submitted, except where an obvious pricing or technical error has occurred or where applicable law provides otherwise.

Payments may be processed through third-party payment providers. NOVASIOR does not necessarily directly process or store all payment-card or banking information. You agree to provide accurate payment and billing information and authorize the applicable payment provider to process the transaction.

9. PAYMENT FRAUD AND CHARGEBACKS

You must not:

- Use another person's payment method without authorization.
- Use stolen or fraudulent payment information.
- Make fraudulent claims regarding a transaction.
- Initiate an unjustified payment reversal or chargeback after legitimately receiving and using a product.

If a payment dispute or chargeback occurs, NOVASIOR may provide relevant transaction, delivery, access, and purchase information to the applicable payment processor, bank, platform, or competent authority as reasonably necessary to respond to the dispute.

10. DIGITAL PRODUCT DELIVERY

NOVASIOR will use reasonable efforts to deliver or provide access to purchased digital products after successful payment and completion of the applicable order process.

Delivery may be delayed by payment verification, incorrect customer information, email delivery problems, spam filtering, third-party service interruptions, technical problems, internet or network failures, security checks, or circumstances outside NOVASIOR's reasonable control.

If you do not receive a purchased digital product within the stated delivery period, contact NOVASIOR through the official support/contact channel.

11. CUSTOMER RESPONSIBILITY FOR DELIVERY

Customers are responsible for:

- Providing a correct email address.
- Checking spam, junk, promotions, and other email folders.
- Maintaining access to their email account.
- Maintaining compatible software and devices where required.
- Keeping downloaded files secure.
- Notifying NOVASIOR of genuine delivery problems promptly.

NOVASIOR may reasonably request information necessary to verify a purchase before providing replacement access.

12. DIGITAL PRODUCT LICENSE

Unless expressly stated otherwise, purchasing a NOVASIOR digital product grants the purchaser a limited, personal, non-exclusive, non-transferable, non-sublicensable license to use the purchased product for personal, lawful use.

The purchase of a digital product does not transfer ownership of NOVASIOR's copyright, intellectual property, brand, source files, designs, templates, or other proprietary rights to the purchaser. You are purchasing a limited right to use the product, not ownership of the underlying intellectual property.

13. STRICTLY PROHIBITED DIGITAL PRODUCT USE

Unless NOVASIOR gives prior written permission, you must not:

- Resell or redistribute a NOVASIOR digital product.
- Share purchased files with other people.
- Upload purchased files to public websites or file-sharing platforms.
- Give purchased files to friends, family, clients, employees, students, or other third parties where such sharing is not expressly authorized.
- Make the product available through torrents or peer-to-peer networks.
- Repackage NOVASIOR products and sell them as your own.
- Claim that NOVASIOR products were created by you.
- Remove copyright notices, ownership notices, watermarks, or other proprietary markings.
- Reproduce substantial portions of the product for distribution.
- Create competing products substantially based on protected NOVASIOR materials.
- Use NOVASIOR products for unauthorized commercial distribution.
- Sell access to NOVASIOR products.
- Grant sublicenses or commercial rights to third parties.
- Circumvent technical access controls intended to protect purchased products.

These restrictions apply regardless of whether the unauthorized distribution is free or paid.

14. PERSONAL USE ONLY

Unless a particular product expressly states otherwise, NOVASIOR digital products are licensed for personal use. Commercial use, distribution to employees or customers, incorporation into a commercial service, or other use outside personal use requires prior written authorization from NOVASIOR.

15. INTELLECTUAL PROPERTY

All NOVASIOR intellectual property remains the property of NOVASIOR or its respective licensors unless expressly stated otherwise. This may include the NOVASIOR name and logo, brand identity, trademarks, website design and layout, graphics, illustrations, photographs, videos, animations, product designs, templates, digital files, written content, educational material, guides, e-books, planners, trackers, wallpapers, icons, original artwork, product descriptions, marketing material, social-media content, original creative concepts, and website code and software where owned or licensed by NOVASIOR.

Nothing in these Terms transfers intellectual-property ownership to you.

16. NOVASIOR BRAND AND IDENTITY

The NOVASIOR name, logo, visual identity, designs, branding elements, slogans, graphics, and related materials may be protected by applicable intellectual-property laws.

You may not use NOVASIOR branding in a manner that suggests unauthorized affiliation, endorsement, sponsorship, or a false connection with NOVASIOR, damages the NOVASIOR brand, or reproduces its brand identity as your own.

17. WEBSITE AND CONTENT OWNERSHIP

Unless expressly stated otherwise, all original website content belongs to NOVASIOR or is used under an appropriate license. You may view website content for personal and lawful purposes, but may not systematically reproduce, copy, republish, distribute, modify, sell, license, or commercially exploit it without prior written authorization.

18. SOCIAL MEDIA AND PUBLIC CONTENT

NOVASIOR may operate social-media accounts and publish videos, images, graphics, captions, educational content, quotes, original concepts, product promotions, brand announcements, and other creative material. Unless otherwise indicated, NOVASIOR retains ownership of its original content and intellectual property.

19. COPYRIGHT INFRINGEMENT

NOVASIOR respects intellectual-property rights and expects users to do the same. If you believe that content appearing on the NOVASIOR website infringes your intellectual-property rights, contact NOVASIOR at novasior@gmail.com. Your notice should provide sufficient information to allow NOVASIOR to understand and investigate the alleged infringement.

20. USER CONTENT

If NOVASIOR permits users to submit reviews, comments, testimonials, images, feedback, or other content ("User Content"), you remain responsible for the content you submit.

You must not submit content that is unlawful, infringes another person's rights, contains malware, is defamatory or fraudulent, contains confidential information you are not authorized to disclose, or violates applicable law or the rights of another person or entity.

Where you voluntarily submit content to NOVASIOR for publication, you grant NOVASIOR the permissions reasonably necessary to host, display, reproduce, and use that content for the purpose for which it was submitted, subject to applicable law.

21. THIRD-PARTY SERVICES

NOVASIOR may use third-party services for payment processing, website hosting, email delivery, analytics, cloud storage, customer support, authentication, product delivery, security, marketing, and other operational functions.

Third-party services may have their own terms, policies, and privacy practices. NOVASIOR is not responsible for independent actions, failures, policies, or availability of third-party services, except to the extent responsibility cannot lawfully be excluded.

22. EXTERNAL LINKS

The NOVASIOR website may contain links to third-party websites or services. NOVASIOR does not necessarily control or endorse third-party websites and is not responsible for their content, security, availability, products, services, or privacy practices.

23. EDUCATIONAL AND INFORMATIONAL DISCLAIMER

Certain NOVASIOR products or content may provide educational, motivational, productivity, lifestyle, self-improvement, organizational, or informational material. Such content is provided for general informational and educational purposes.

NOVASIOR does not represent that any particular product will produce a specific personal, professional, financial, business, productivity, lifestyle, or other outcome. Individual results may vary substantially. NOVASIOR products should not be treated as individualized professional advice unless expressly stated otherwise.

24. NO GUARANTEE OF RESULTS

NOVASIOR does not guarantee a specific level of income, business success, career advancement, productivity improvement, personal-development outcome, goal achievement, financial result, health or lifestyle outcome, or any other particular result. Testimonials, examples, demonstrations, or statements concerning potential outcomes are not guarantees of future results.

25. WEBSITE AVAILABILITY

NOVASIOR aims to keep its website and services available but does not guarantee uninterrupted or error-free availability. The website may occasionally be unavailable due to maintenance, updates, security measures, technical failures, hosting problems, internet outages, third-party service failures, cybersecurity incidents, force majeure events, or other circumstances outside NOVASIOR's reasonable control.

26. TECHNICAL PROBLEMS

NOVASIOR will use reasonable efforts to address genuine technical problems affecting purchased products. However, NOVASIOR is not responsible for technical problems caused primarily by the customer's device, internet connection, email provider, browser, operating system, third-party software, incorrect configuration, failure to follow reasonable instructions, or unauthorized modification of the product.

27. REFUNDS

Purchases are subject to the NOVASIOR Refund Policy, which forms part of these Terms. Nothing in these Terms is intended to exclude, restrict, or waive any consumer right or legal remedy that cannot lawfully be excluded, restricted, or waived.

28. CANCELLATIONS

Where cancellation rights apply to a particular purchase, they will be handled in accordance with the Refund Policy and applicable law. The availability and effect of cancellation or refund rights may depend on applicable law, the nature of the product, and whether the digital product has already been supplied or accessed.

29. ACCOUNTS AND ACCESS CREDENTIALS

If NOVASIOR provides customer accounts or login credentials, you are responsible for maintaining their confidentiality. You must not share credentials with unauthorized persons, sell account access, transfer an account without authorization, allow unauthorized individuals to use an account, or attempt to access another person's account.

30. ACCESS RESTRICTIONS AND TERMINATION

NOVASIOR may suspend or terminate access to an account, product-access system, or service where reasonably necessary because of fraud, unauthorized access, product piracy, unauthorized redistribution, copyright infringement, abuse, security threats, material violation of these Terms, illegal activity, payment fraud, or circumvention of access controls.

Termination or suspension does not automatically eliminate rights or obligations that accrued before termination. Where applicable law requires notice, refund, restoration, or another remedy, NOVASIOR will comply with that requirement.

31. CONFIDENTIALITY OF PROPRIETARY MATERIAL

You must not disclose confidential or non-public NOVASIOR information provided under circumstances where confidentiality is reasonably expected. This does not apply to information publicly available through no breach, lawfully known before disclosure, publicly available without wrongdoing, or required to be disclosed by law or valid legal process.

32. SECURITY

You must not attempt to compromise the security of NOVASIOR's website, systems, servers, databases, payment processes, accounts, or digital products. Prohibited activities include hacking, unauthorized penetration testing, credential attacks, exploiting vulnerabilities without authorization, circumventing access controls, distributing malicious software, denial-of-service attacks, and unauthorized system access.

33. FRAUDULENT OR ABUSIVE CONDUCT

NOVASIOR may take appropriate action against users who engage in fraudulent, deceptive, abusive, or malicious activity. This may include restricting access, cancelling transactions where legally permissible, preserving relevant records, reporting suspected unlawful conduct, and pursuing appropriate remedies.

34. LIMITATION OF LIABILITY

To the maximum extent permitted by applicable law, NOVASIOR and its owners, operators, employees, contractors, affiliates, licensors, and service providers will not be liable for indirect, incidental, special, consequential, exemplary, or punitive losses arising from or relating to the use of the website or products.

Where liability cannot legally be excluded, it will be limited to the maximum extent permitted by law. Nothing in these Terms excludes or limits liability that cannot lawfully be excluded or limited.

35. PRODUCT AND WEBSITE WARRANTIES

Except where expressly provided or required by applicable law, the website and digital products are provided on an "as available" and "as reasonably provided" basis.

NOVASIOR does not guarantee that the website will always be available, be completely error-free, work in every technical environment, or that third-party services will always function. Nothing in this section limits any statutory consumer protection or mandatory legal warranty that applies.

36. INDEMNIFICATION

To the maximum extent permitted by applicable law, you agree to indemnify and hold harmless NOVASIOR and its owners, operators, employees, contractors, affiliates, licensors, and service providers from claims, losses, liabilities, damages, costs, and reasonable expenses arising from your material violation of these Terms, unlawful use of the website or products, unauthorized use or redistribution of NOVASIOR intellectual property, infringement of another person's rights, fraudulent or abusive conduct, violation of applicable law, or unauthorized use of another person's account or payment information.

37. FORCE MAJEURE

NOVASIOR will not be responsible for delay or failure caused by circumstances beyond its reasonable control, including natural disasters, acts of government, war, terrorism, civil unrest, power failures, internet or telecommunications failures, cyberattacks, epidemics or pandemics, third-party infrastructure failures, payment-provider failures, hosting-provider failures, or other events beyond reasonable control.

38. PRIVACY

NOVASIOR's collection and processing of personal data is governed by the NOVASIOR Privacy Policy. The Privacy Policy forms part of the overall legal framework governing use of the website, and NOVASIOR will handle personal data in accordance with applicable data-protection and privacy laws.

39. THIRD-PARTY RIGHTS

Except where expressly stated otherwise, these Terms create rights and obligations between you and NOVASIOR. No person who is not a party to these Terms is intended to obtain enforceable rights under these Terms except where applicable law provides otherwise.

40. SEVERABILITY

If any provision of these Terms is determined to be unlawful, invalid, or unenforceable, that provision will be interpreted or modified to the minimum extent necessary to make it lawful and enforceable where legally possible. If modification is not possible, the affected provision will be severed to the extent necessary. The remaining provisions will continue in effect.

41. WAIVER

Failure by NOVASIOR to enforce any provision of these Terms does not constitute a waiver of NOVASIOR's right to enforce that provision later. A waiver is effective only where expressly provided by an authorized representative of NOVASIOR.

42. ENTIRE AGREEMENT

These Terms, together with the NOVASIOR Privacy Policy, Refund Policy, applicable product-specific terms, and any other expressly incorporated policies or agreements, constitute the agreement governing your use of the NOVASIOR website and purchase or use of NOVASIOR products, subject to applicable law.

43. ORDER OF PRECEDENCE

If there is a conflict between these Terms and a specific written agreement or product-specific terms expressly accepted by NOVASIOR and the customer, the specific agreement will govern only to the extent of the conflict. Mandatory provisions of applicable law will prevail over conflicting contractual provisions.

44. ASSIGNMENT

You may not transfer or assign your rights or obligations under these Terms without NOVASIOR's prior written consent, except where such restriction is prohibited by applicable law. NOVASIOR may transfer or assign its rights and obligations as part of a merger, restructuring, sale, acquisition, business transfer, or similar transaction, subject to applicable law.

45. GOVERNING LAW

These Terms shall be governed by and interpreted in accordance with the laws of India, subject to applicable mandatory consumer-protection and other applicable laws.

46. DISPUTE RESOLUTION

NOVASIOR encourages customers to contact NOVASIOR first to attempt to resolve genuine complaints or disputes informally.

For customer support or complaint resolution, contact:

Email: novasior@gmail.com

Where a dispute cannot be resolved informally, it may be addressed through the courts, consumer commissions, authorities, or other dispute-resolution mechanisms having jurisdiction under applicable Indian law.

Nothing in these Terms is intended to prevent a consumer from exercising a mandatory statutory right to approach an appropriate consumer forum, commission, authority, or court.

47. NOTICES AND COMMUNICATIONS

NOVASIOR may communicate with customers using the contact information provided during purchase or account registration. You are responsible for ensuring that your contact information remains accurate. Notices may be provided by email, website publication, account notification, or another legally appropriate method.

48. RECORDS AND ELECTRONIC COMMUNICATIONS

You agree that electronic records, communications, order confirmations, invoices, payment records, delivery records, access records, and other electronically maintained records may be used as evidence of transactions and communications, subject to applicable law.

49. POLICY AND BUSINESS CHANGES

NOVASIOR may modify its website, product catalogue, product formats, pricing, features, delivery mechanisms, branding, services, and business operations from time to time. Such changes will not automatically affect completed purchases except where reasonably necessary for security, legal compliance, technical compatibility, or other circumstances permitted by applicable law.

50. NO UNAUTHORIZED REPRESENTATION

You must not represent that you are an employee, agent, representative, partner, affiliate, distributor, or authorized representative of NOVASIOR unless NOVASIOR has expressly authorized you in writing. You must not create websites, social-media accounts, advertisements, products, or communications that falsely suggest an official NOVASIOR connection.

51. COMMERCIAL EXPLOITATION

Unless expressly authorized in writing, you may not use NOVASIOR's products, website content, brand identity, intellectual property, or proprietary materials to build a competing commercial product, create a competing digital-product library, provide paid services using NOVASIOR materials as the primary underlying content, sell derivative versions, create commercial training based substantially on proprietary materials, create commercial bundles, or license NOVASIOR content to third parties.

52. ENFORCEMENT OF INTELLECTUAL-PROPERTY RIGHTS

NOVASIOR reserves all rights and remedies available under applicable law in relation to unauthorized copying, distribution, reproduction, commercial exploitation, infringement, piracy, or misuse of its intellectual property. Where appropriate, NOVASIOR may seek removal of infringing material, account or access restrictions, injunctive relief, monetary remedies, legal costs where recoverable, and other remedies available under applicable law.

53. NO TRANSFER OF OWNERSHIP

Except where expressly stated in writing, purchasing a NOVASIOR product does not give the purchaser ownership of the original source files, NOVASIOR copyrights, trademarks, brand assets, proprietary designs, underlying templates, website content, original artwork, or proprietary educational material. The purchaser receives only the applicable license or access rights expressly granted.

54. SURVIVAL

Provisions that by their nature should continue after termination or completion of a transaction will survive termination, including provisions relating to intellectual property, unauthorized use, confidentiality, disclaimers, limitation of liability, indemnification, dispute resolution, governing law, and other provisions intended to survive.

55. EFFECTIVE DATE

These Terms are effective from:

August 20, 2026

The "Last Updated" date shown on this page identifies the latest revision of these Terms.

56. CONTACT NOVASIOR

For questions regarding these Terms, purchases, products, intellectual property, complaints, or other legal matters, contact:

NOVASIOR

Email: novasior@gmail.com

Website: https://novasior.vercel.app

57. ACKNOWLEDGEMENT

By accessing the NOVASIOR website, purchasing a NOVASIOR product, creating an account, downloading a NOVASIOR product, or otherwise using NOVASIOR services, you acknowledge that you have had an opportunity to review these Terms and agree to be bound by them to the extent permitted by applicable law.

If you do not agree to these Terms, do not use the NOVASIOR website or purchase or use NOVASIOR products.

END OF TERMS OF SERVICE`;

const refundPolicyContent = `Effective Date: August 20, 2026

Last Updated: August 20, 2026

Website: https://novasior.vercel.app

This Refund & Cancellation Policy ("Refund Policy") explains the rules applicable to purchases made through the NOVASIOR website.

NOVASIOR primarily sells digital products, including digital planners, habit trackers, wallpapers, guides, e-books, templates, checklists, workbooks, productivity resources, educational material, and other downloadable or digitally accessible products.

Because NOVASIOR products may be delivered electronically and may be accessed or downloaded immediately after purchase, refunds are generally limited.

By purchasing a NOVASIOR product, you acknowledge that you have reviewed the product description, pricing, applicable terms, and this Refund Policy before completing your purchase.

This Refund Policy forms part of the NOVASIOR Terms of Service.

1. GENERAL REFUND POLICY

NOVASIOR generally does not offer refunds for digital products once the product has been successfully delivered, made available, downloaded, or accessed, except where a refund is required under applicable law or where NOVASIOR expressly approves an exception under this Policy.

Digital products are fundamentally different from physical products because they can be delivered and accessed electronically without requiring physical return. Customers should carefully review the product description and included features before completing a purchase.

2. DIGITAL PRODUCTS

NOVASIOR products may include:

- Digital planners
- Habit trackers
- Wallpapers
- E-books
- Guides
- Templates
- Checklists
- Workbooks
- Educational resources
- Productivity systems
- Downloadable files
- Digital bundles
- Other electronically delivered products

Once a digital product has been delivered or access has been provided, NOVASIOR generally cannot treat the product as physically returned.

3. NO CHANGE-OF-MIND REFUNDS

Subject to applicable law, NOVASIOR generally does not provide refunds simply because a customer changed their mind, no longer wants the product, decided not to use it, purchased it accidentally, did not read the description, expected it to be different, found another product they prefer, decided it was unsuitable after purchase, did not achieve expected personal results, did not have sufficient time to use it, or changed personal or business circumstances after purchase.

Customers are encouraged to review all available product information before purchasing.

4. NO REFUND BASED ON EXPECTED RESULTS

NOVASIOR does not guarantee that its products will produce a particular personal, financial, professional, productivity, business, lifestyle, or other result.

Accordingly, a customer is generally not entitled to a refund merely because the customer did not achieve a desired result, did not use the product consistently, did not implement the information provided, expected faster results, expected a particular outcome, or could not use the product effectively because of their circumstances. Individual results vary and depend on factors outside NOVASIOR's control.

5. PRODUCT PREVIEWS AND DESCRIPTIONS

Customers are responsible for reviewing product descriptions, previews, screenshots, demonstrations, included features, file formats, compatibility information, dimensions or specifications where applicable, pricing, and stated requirements before purchasing.

NOVASIOR makes reasonable efforts to describe products accurately. A customer is not generally entitled to a refund solely because subjective expectations differ from the product description.

6. TECHNICAL DELIVERY PROBLEMS

If you have successfully completed a purchase but genuinely cannot receive or access the purchased digital product because of a technical problem attributable to NOVASIOR's delivery system, contact us.

NOVASIOR may investigate and, where reasonably appropriate, provide:

- A replacement download link.
- Replacement access.
- A corrected product file.
- Technical assistance.
- Another reasonable solution.
- A refund where appropriate or legally required.

Customers should contact NOVASIOR before initiating a payment dispute where the issue can reasonably be resolved through customer support.

7. NON-DELIVERY

If you have completed payment but have not received your purchased product, first check your primary inbox, spam or junk folders, promotions folders, the email address entered during checkout, any customer account, and any download or access page provided after payment.

If the product still cannot be located, contact NOVASIOR at:

Email: novasior@gmail.com

Please provide sufficient information to help us locate the transaction, including the name and email address used during purchase, Order ID, Transaction ID, product purchased, and approximate purchase date. NOVASIOR may verify the transaction before providing replacement access or other assistance.

8. INCORRECT EMAIL ADDRESS

Customers are responsible for providing accurate contact information during checkout. If a product cannot be delivered because the customer entered an incorrect email address, NOVASIOR may request reasonable verification and may provide replacement access where appropriate.

NOVASIOR is not automatically responsible for delivery failures caused solely by incorrect information provided by the customer.

9. SPAM AND EMAIL FILTERING

NOVASIOR cannot guarantee that every delivery email will appear in the customer's primary inbox. Email providers may classify legitimate emails as spam, junk, promotions, social, or other filtered categories.

Before contacting NOVASIOR regarding a missing delivery email, customers should check relevant folders. If the product still cannot be accessed, NOVASIOR will make reasonable efforts to assist.

10. DUPLICATE PURCHASES

If you accidentally purchase the same digital product more than once, contact NOVASIOR as soon as possible. NOVASIOR may review the transaction history and, where appropriate, provide a refund or another reasonable solution for a genuine duplicate transaction.

11. UNAUTHORIZED TRANSACTIONS

If you believe a purchase was made without your authorization, contact NOVASIOR promptly. NOVASIOR may investigate and request information reasonably necessary to verify the claim. You should also contact your bank or payment provider where appropriate.

NOVASIOR reserves the right to cooperate with payment providers, financial institutions, and relevant authorities when investigating suspected unauthorized or fraudulent transactions.

12. FRAUDULENT REFUND CLAIMS

NOVASIOR may investigate refund requests that appear fraudulent, abusive, misleading, or inconsistent with transaction records, including false non-delivery claims, repeated refund claims, false functionality claims, manipulation of payment information, attempts to obtain a product without paying, attempts to receive both a refund and continued access, or abuse of customer-support or payment-dispute systems.

Where legally permitted, NOVASIOR may restrict access, preserve relevant records, challenge fraudulent payment disputes, and take other appropriate action.

13. CHARGEBACKS AND PAYMENT DISPUTES

A chargeback should not be used as a substitute for contacting NOVASIOR about a genuine delivery or technical issue that can reasonably be resolved through customer support.

If a customer initiates a chargeback, payment dispute, or similar reversal, NOVASIOR may provide relevant order, transaction, payment-status, delivery, download, access, communication, and refund-history information to the applicable payment provider, bank, card network, or other authorized entity.

NOVASIOR reserves the right to dispute fraudulent or unjustified chargebacks to the extent permitted by applicable law and payment-provider rules.

14. PRODUCT ACCESS AFTER REFUND

Where a refund is approved and processed for a digital product, NOVASIOR may revoke or disable access to the refunded product where technically possible and legally appropriate.

Customers who receive a refund must not continue using, distributing, copying, or sharing the refunded product unless NOVASIOR expressly permits such use.

15. PARTIAL REFUNDS

NOVASIOR may, at its discretion and where legally permitted, provide a partial refund in appropriate circumstances. A partial refund is not an admission that NOVASIOR was legally required to provide a refund. The amount and conditions will depend on the specific circumstances.

16. EXCEPTIONS

Although NOVASIOR generally does not offer refunds for delivered digital products, NOVASIOR may consider exceptions such as:

- A duplicate transaction.
- A verified technical failure attributable to NOVASIOR that cannot reasonably be resolved.
- A verified non-delivery issue.
- A material error in the transaction caused by NOVASIOR.
- A refund required under applicable law.
- Other exceptional circumstances determined by NOVASIOR.

Approval of an exception in one case does not create an automatic entitlement to a refund in future cases.

17. LEGALLY REQUIRED REFUNDS AND CONSUMER RIGHTS

Nothing in this Refund Policy is intended to exclude, restrict, or waive any consumer right, statutory remedy, refund entitlement, warranty, cancellation right, or other legal protection that cannot lawfully be excluded or waived.

Where applicable law requires NOVASIOR to provide a refund, replacement, correction, cancellation, or other remedy, NOVASIOR will comply. If a provision conflicts with a mandatory legal requirement, the mandatory legal requirement will prevail.

18. REFUND REQUEST PROCESS

To request consideration for a refund or other resolution, contact:

NOVASIOR

Email: novasior@gmail.com

Subject: Refund Request - [ORDER ID]

Your request should include:

- Full name.
- Email address used for purchase.
- Order ID.
- Transaction ID, if available.
- Product purchased.
- Date of purchase.
- Reason for the request.
- Description of any technical or delivery issue.
- Relevant screenshots or supporting information where appropriate.

NOVASIOR may request additional information where reasonably necessary to investigate the request.

19. REFUND REQUEST DEADLINE

Customers should contact NOVASIOR as soon as reasonably possible after discovering a delivery, technical, billing, or transaction issue. Where applicable law establishes a specific period for exercising a legal right, that statutory period will apply.

For discretionary refund requests not required by law, NOVASIOR may consider whether the request was made within a reasonable period after purchase or discovery of the relevant issue.

20. REFUND REVIEW

A refund request does not automatically guarantee a refund. NOVASIOR may review purchase, payment, delivery, product-access, download, customer-communication, and technical records; the reason for the request; whether the product was delivered or accessed; whether the issue can be resolved; applicable law; and other relevant circumstances.

NOVASIOR will make the final determination on discretionary refund requests in accordance with this Policy and applicable law.

21. REFUND PROCESSING

Where a refund is approved, NOVASIOR will generally process it through the original payment method or another appropriate method supported by the payment provider.

The time required for the refunded amount to appear may depend on the payment provider, bank processing times, card-network processing, payment method, weekends or holidays, and technical processing delays. NOVASIOR does not control the processing time of a customer's bank or external payment provider.

22. REFUND AMOUNT

Where a refund is legally required or approved, the amount refunded will depend on the circumstances and applicable law. Where permitted by law, third-party processing charges or other amounts may be treated in accordance with the applicable transaction terms. NOVASIOR will not make deductions prohibited by applicable law.

23. PROMOTIONAL OFFERS AND DISCOUNTS

Products purchased using coupons, discount codes, promotional pricing, launch offers, special bundles, or limited-time offers remain subject to this Refund Policy. A discount or promotional offer does not automatically create a separate refund entitlement.

Where a refund is approved, the calculation may take into account the actual amount paid for the transaction, subject to applicable law.

24. BUNDLES AND MULTI-PRODUCT PURCHASES

Where multiple products are sold together as a bundle, refund eligibility may depend on the specific circumstances and applicable offer terms. If a bundle has already been delivered or accessed, NOVASIOR may consider it a combined digital purchase where legally permitted. Where applicable law requires different treatment, the legal requirement will prevail.

25. FREE PRODUCTS AND BONUSES

Free products, bonuses, promotional downloads, samples, or complimentary materials generally have no monetary refund value. If a free bonus is provided with a paid product, the existence of the bonus does not independently create a refund entitlement.

26. PRODUCT UPDATES

NOVASIOR may update digital products to improve functionality, design, compatibility, accuracy, security, usability, or content. A product update does not automatically create a refund entitlement. Where a material issue affects functionality, NOVASIOR may provide an updated or corrected version where reasonably appropriate.

27. PRODUCT COMPATIBILITY

Customers are responsible for reviewing stated compatibility requirements before purchasing. NOVASIOR cannot guarantee compatibility with every device, operating system, browser, software application, screen size, third-party platform, or file-management system.

Where compatibility requirements are clearly disclosed before purchase, incompatibility caused by a customer's unsupported technical environment will generally not qualify for a discretionary refund. Nothing in this section limits mandatory consumer rights.

28. CUSTOMER MISUSE

NOVASIOR may deny discretionary refund requests where the customer has materially violated the Terms of Service, including through unauthorized redistribution, product piracy, account sharing, fraud, unauthorized commercial use, copyright infringement, circumvention of access controls, or other serious misuse.

This does not affect any refund or legal remedy that cannot lawfully be excluded.

29. REFUNDS DO NOT AUTHORIZE PRODUCT USE

Receiving a refund does not give a customer permission to retain, reproduce, distribute, resell, or commercially exploit NOVASIOR intellectual property. Any refunded digital product must cease to be used unless NOVASIOR expressly provides otherwise.

30. CUSTOMER SUPPORT BEFORE PAYMENT DISPUTE

If you experience a genuine problem with a NOVASIOR purchase, contact NOVASIOR before initiating a payment dispute where reasonably possible. NOVASIOR will make reasonable efforts to resolve genuine delivery, access, technical, duplicate-transaction, and billing issues. This does not restrict statutory rights or rights provided by a payment provider.

31. POLICY AGAINST ABUSE

NOVASIOR may monitor refund and transaction activity for patterns indicating abuse, fraud, or misuse. Where appropriate and legally permitted, NOVASIOR may request additional verification, restrict purchasing or account access, investigate suspicious activity, challenge fraudulent payment disputes, and report suspected fraud to relevant providers or authorities.

32. NO WAIVER OF LEGAL RIGHTS

This Refund Policy does not waive any legal right that cannot lawfully be waived. Nothing in this Policy prevents a customer from exercising a valid statutory right under applicable Indian law.

33. RELATIONSHIP WITH TERMS OF SERVICE

This Refund Policy forms part of the NOVASIOR Terms of Service. If there is a conflict between this Refund Policy and the Terms of Service, this Refund Policy will govern specifically with respect to refunds and cancellations, subject to mandatory applicable law.

34. RELATIONSHIP WITH PRIVACY POLICY

Personal information provided during a refund request may be processed in accordance with the NOVASIOR Privacy Policy and may be used to verify the transaction, investigate the request, process the refund, communicate with the customer, prevent fraud, maintain financial and legal records, and comply with applicable law.

35. CHANGES TO THIS REFUND POLICY

NOVASIOR may update this Refund Policy from time to time to reflect changes in products, payment systems, delivery systems, business practices, applicable law, consumer-protection requirements, or operations.

The latest version will be published on the NOVASIOR website with an updated "Last Updated" date. Changes will not be used to unlawfully remove rights that have already accrued to a customer.

36. EFFECTIVE DATE

This Refund & Cancellation Policy is effective from:

August 20, 2026

Last Updated:

August 20, 2026

37. CONTACT NOVASIOR

For refund, cancellation, payment, delivery, or transaction-related questions, contact:

NOVASIOR

Email: novasior@gmail.com

Website: https://novasior.vercel.app

38. GOVERNING LAW

This Refund Policy shall be interpreted in accordance with the laws of India, subject to mandatory consumer-protection laws and other applicable legal requirements.

Nothing in this Policy is intended to prevent a consumer from exercising a mandatory legal right or remedy.

39. ACKNOWLEDGEMENT

By completing a purchase through the NOVASIOR website, you acknowledge that you have had an opportunity to review this Refund & Cancellation Policy before completing the transaction.

You understand that NOVASIOR primarily sells digital products and that refunds for successfully delivered or accessed digital products are generally limited, subject to applicable law and the specific circumstances described in this Policy.

END OF REFUND & CANCELLATION POLICY`;

const legalDocs: Record<string, LegalDoc> = {
  privacy: {
    title: 'Privacy Policy',
    subtitle: 'How NOVASIOR collects, uses, and protects personal information.',
    lastUpdated: 'August 20, 2026',
    icon: ShieldCheck,
    content: privacyPolicyContent,
    sections: [
      {
        heading: '1. Information Collection',
        linesCount: 4
      },
      {
        heading: '2. Data Usage & Processing',
        linesCount: 4
      },
      {
        heading: '3. Data Security & Storage',
        linesCount: 3
      },
      {
        heading: '4. Cookies & Local Storage',
        linesCount: 3
      },
      {
        heading: '5. User Rights & Contact',
        linesCount: 3
      }
    ]
  },
  terms: {
    title: 'Terms of Service',
    subtitle: 'The terms governing NOVASIOR products, services, and website use.',
    lastUpdated: 'August 20, 2026',
    icon: FileText,
    content: termsOfServiceContent,
    sections: [
      {
        heading: '1. Acceptance of Terms',
        linesCount: 3
      },
      {
        heading: '2. Digital Product Fulfillment',
        linesCount: 4
      },
      {
        heading: '3. Intellectual Property Rights',
        linesCount: 3
      },
      {
        heading: '4. Prohibited Activities',
        linesCount: 4
      },
      {
        heading: '5. Limitation of Liability',
        linesCount: 3
      }
    ]
  },
  refund: {
    title: 'Refund Policy',
    subtitle: 'Refund and cancellation terms for NOVASIOR digital products.',
    lastUpdated: 'August 20, 2026',
    icon: RotateCcw,
    content: refundPolicyContent,
    sections: [
      {
        heading: '1. Digital Goods Return Terms',
        linesCount: 3
      },
      {
        heading: '2. Technical Resolution & File Delivery',
        linesCount: 3
      },
      {
        heading: '3. Duplicate Order Adjustments',
        linesCount: 3
      },
      {
        heading: '4. Billing Inquiries',
        linesCount: 3
      }
    ]
  }
};

export default function GenericPage() {
  const { page } = useParams<{ page: string }>();
  const location = useLocation();
  const pathKey = page || location.pathname.replace(/^\//, '');
  const activeKey = legalDocs[pathKey] ? pathKey : 'privacy';
  const doc = legalDocs[activeKey];
  const Icon = doc.icon;

  const tabs = [
    { key: 'privacy', label: 'Privacy Policy' },
    { key: 'terms', label: 'Terms of Service' },
    { key: 'refund', label: 'Refund Policy' }
  ];

  return (
    <div className="w-full bg-transparent text-brand-text min-h-screen pt-32 pb-24 font-sans">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-center gap-2 md:gap-3 flex-wrap mb-12">
          {tabs.map((tab) => {
            const isActive = tab.key === activeKey;
            return (
              <Link
                key={tab.key}
                to={`/${tab.key}`}
                className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-bold tracking-wider uppercase transition-all duration-200 border ${
                  isActive
                    ? 'bg-brand-text text-white border-brand-text shadow-sm'
                    : 'bg-white/80 backdrop-blur-sm text-brand-text-muted border-brand-border hover:border-brand-text hover:text-brand-text'
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeKey}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="bg-white/80 backdrop-blur-sm border border-brand-border rounded-3xl p-8 md:p-12 mb-10 shadow-sm"
          >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-brand-border mb-10">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/90 border border-brand-border rounded-2xl text-brand-text shrink-0">
                <Icon size={28} />
              </div>
              <div>
                <h1 className="text-3xl md:text-5xl font-serif font-bold uppercase tracking-tight text-brand-text mb-2">
                  {doc.title}
                </h1>
                <p className="text-brand-text-muted text-sm md:text-base font-normal">
                  {doc.subtitle}
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 border border-brand-border rounded-full text-xs font-semibold text-brand-text-muted shrink-0 self-start md:self-auto">
              <Clock size={14} className="text-brand-accent" />
              <span>Last Updated: {doc.lastUpdated}</span>
            </div>
          </div>

          {doc.content ? (
            <div className="space-y-4">
              {renderPrivacyContent(doc.content)}
            </div>
          ) : (
            <div className="space-y-10">
              {doc.sections?.map((section, idx) => (
                <div key={idx} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-base md:text-lg font-serif font-bold text-brand-text uppercase tracking-wide shrink-0">
                      {idx + 1}.
                    </span>
                    <div className="grow border-b-2 border-neutral-800 h-6"></div>
                  </div>

                  <div className="space-y-3 pt-1">
                    {Array.from({ length: section.linesCount }).map((_, lineIdx) => (
                      <div
                        key={lineIdx}
                        className="w-full border-b border-neutral-300 h-6 transition-colors hover:border-neutral-500"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Contact Help Bar */}
          <div className="mt-14 pt-8 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/60 border border-brand-border/60 rounded-2xl p-6">
            <div>
              <h3 className="font-bold text-sm uppercase text-brand-text mb-1">Need help with {doc.title}?</h3>
              <p className="text-xs text-brand-text-muted">Our support team is available to assist you with any questions.</p>
            </div>
            <Link
              to="/support"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-text text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-neutral-800 transition-colors shrink-0"
            >
              <Mail size={14} />
              <span>Contact Support</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>
      </div>
    </div>
  );
}

