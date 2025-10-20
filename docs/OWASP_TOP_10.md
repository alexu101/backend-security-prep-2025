# OWASP(Open Web Application Security Project) TOP 10 - NOTES


## Definition
OWASP stands for Open Web Application Security Project.
Its a non profit foundation that works to improve the security of the software, especially web applications, through open-source projects, tools, documentation and community education.


## A01 Broken Access Control
   - What: Broken Access Control is a security risk that apps have if there are not enforced policies for users access.
   - Examples:
        - Violation of the least privilege principle - access should be granted only for particular capabilities, roles, actions
        - Bypassing access control by modifying parameters used in the URL
        - Accessing API without using its intended control for POST, PUT, DELETE
        - Metadata manipulation such as replaying with a JWT or a cookie.
        - Using someone else's private artifacts(key, access codes etc.) in order to access/act as him
   - Prevention:
        - Except for public resources, deny by default
        - Enforce record ownership
        - Log access control failures
        - Least privilage implementation
        - Short lived JWT
   - Real scenario: Let's say we have a broker invest web application and for example the least privilage principle is not applied. If the "broker" can perform buy and sell ops, but the lets say that his client only allows him to sell stocks, if this is not enforced by least privilage principle and the right policies, the broker can violate client's word and buy stocks.

# A02 Cryptogtaphic failures
   - What: Security risk that expose sensitive data
   - Example: The password database uses unsalted or simple hashes to store everyone's passwords. They can easily be cracked
   - Prevention:
        - Encrypt all sensitive data
        - Ensure up to date encryption algorithms are used
        - Don't store sensitive data unnecessarily
        - Identify what data is sensitive according to laws, privacy, regulatory requirements etc.
        - Avoid deprecated cryptographic functions
   - Real scenario: The broker invest web platform encrypts the credit card numbers in a database using automatic database encryption. However, this data is automatically decrypted when retrieved and this will allow an SQL injection. The solution is not to rely on the automatic encryption

# A03 Injection
   - What: Security risk that happens when user input is mixed with code and the system can't tell where data ends and commands begin
   - Example: User include hidden commands where programs expect data, and the program run by mistaken the command.
   - Prevention:
        - Always sanitize user input
        - Use '?' placeholders, and ORMs
        - Escape special characters
   - Real scenario: The broker invest web platform implementation does not use an ORM and sends plain SQL interogations to the DB. This let users exploit this weakness.

# A04 Insecure design
   - What: Security risk that happens due to weak architecure and software design.
   - Example: A cinema chain allows group booking discounts and has a maximum 6 attendees before requesting a deposit. Attackers could threat the model and spam hundreds of requests for a number of people lower than 6 and this will get massive loss for the cinema.
   - Prevention:
        - Limit resource usage by user and services
        - Write unit and integration tests to validate all critiacl flaws
        - Use well known and secure design patterns
        - Use specialists
   - Real scenario: The broker invest web platform takes smaller fee for orders lower than 100$. An user could spam hundreds of requests with amounts lower than 100$ and this will produce massive losses for the company.

# A05