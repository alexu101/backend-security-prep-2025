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

### A01 Deep Dive
- Common Attack Scenarios:
- Horizontal Privilege Escalation:
     - User A access User B's data
     - Example: Change userId in URL from 123 to 134
- Vertical Privilage Escalation:
     - Regular user access admin function
     - Example: Regular user access /admin panel
IDOR (Insecure Direct Object Reference)
     - Direct access to objects without permission check
     - Example /api/invoices/12345 - change ID, see others invoices

- How to prevent ( Implementation Level):
```ts
//BAD EXAMPLE - No access control check
app.get('/api/deals/:id', async(req, res) => {
     const deal = await db.deal.findById(req.params.id)
     res.json(deal) //ANYONE CAN SEE EVERY DEAL!
})

//GOOD EXAMPLE - Check ownership
app.get('/api/deals/:id', async(req, res) => {
     const deal = await db.deal.findById(req.params.id)
     if (deal.brokerId !=== req.params.id && !req.user.isAdmin){
          return res.status(403).json(error: 'Forbidden')
     }

     res.json(deal)
})
```
- Never trust user input
- Implement RBAC



## A02 Cryptogtaphic failures
   - What: Security risk that expose sensitive data
   - Example: The password database uses unsalted or simple hashes to store everyone's passwords. They can easily be cracked
   - Prevention:
        - Encrypt all sensitive data
        - Ensure up to date encryption algorithms are used
        - Don't store sensitive data unnecessarily
        - Identify what data is sensitive according to laws, privacy, regulatory requirements etc.
        - Avoid deprecated cryptographic functions
   - Real scenario: The broker invest web platform encrypts the credit card numbers in a database using automatic database encryption. However, this data is automatically decrypted when retrieved and this will allow an SQL injection. The solution is not to rely on the automatic encryption

## A03 Injection
   - What: Security risk that happens when user input is mixed with code and the system can't tell where data ends and commands begin
   - Example: User include hidden commands where programs expect data, and the program run by mistaken the command.
   - Prevention:
        - Always sanitize user input
        - Use '?' placeholders, and ORMs
        - Escape special characters
   - Real scenario: The broker invest web platform implementation does not use an ORM and sends plain SQL interogations to the DB. This let users exploit this weakness.

### A03 Deep Dive:
- Types of injection:
     - SQL Injection (most common)
     ```ts
     // BAD - Vulnerable
     const query = `SELECT * FROM users WHERE email = '${userInput}'`
     // User inputs: ' OR '1'='1'
     // Query becomes: Select * FROM users WHERE email = '' OR '1'='1'
     // Returns ALL users!

     //GOOD - Parametrized
     const query = 'SELECT * FROM users WHERE email = ?'
     db.query(query,[userInput])
     // User input is escaped automatically
     ```
     - NoSQL Injection (MongoDB)
     ```ts
     //BAD
     db.users.find({username: req.body.username})
     // User sends: {"$ne": null}
     // Matches ALL users!

     //GOOD - Validate input type
     if(typeof req.body.username !== 'string'){
          return res.status(400).json({error: 'Invalid input'})
     }
     ```
     - Command Injection
     ```ts
     // BAD
     exec(`ping ${userInput}`)
     // User inputs: 4.4.4.4 rm -rf /

     // GOOD - Don't use exec with user input at all
     // Or use allowlist validation
     ```
- Use ORMs
- Use Parametrized queries (never string concat)
- Input validation (Zod)
- Escape special characters
- Least privilege for DB users (don't use root)

## A04 Insecure design
   - What: Security risk that happens due to weak architecure and software design.
   - Example: A cinema chain allows group booking discounts and has a maximum 6 attendees before requesting a deposit. Attackers could threat the model and spam hundreds of requests for a number of people lower than 6 and this will get massive loss for the cinema.
   - Prevention:
        - Limit resource usage by user and services
        - Write unit and integration tests to validate all critiacl flaws
        - Use well known and secure design patterns
        - Use specialists
   - Real scenario: The broker invest web platform takes smaller fee for orders lower than 100$. An user could spam hundreds of requests with amounts lower than 100$ and this will produce massive losses for the company.

## A05 Security Misconfiguration
   - What: Security risk that happens when the application is missing appropiate security policies/configurations, unnecessary features are enabled, error handling offers too much details.
   - Example: Directory listing is not disabled on the server. An attacker discovers this and downloads all compiled JAVA classes. With reverse engineering he can discover severe access control flaw.
   - Prevention:
        - A minimal platform without unused features
        - An automatied process to verify the effectivenes of the configurations
        - Review all permissions and policies
   - Real scenario: Broker investment application implementation sends too descriptive error traces and messages. This exposes underlying info.

## A06 Vulnerable Imports
   - What: Security risk that appears when you are using outdated and vulnerable dependencies, software etc. and when you do not scan for vulnerabilites regularly.
   - Example: Attackers found bugs in libraries and then exploit apps that are using those libraries
   - Prevention:
        - Remove unused dependencies, unnecessary features, files and documentation.
        - Only use components from official sources.
        - Monitor list of dependencies/components used versions
   - Real scenario: Let's say the Broker Invest is using an library that contain a bug that let attackers run code remotely on the server.

## A07 Identification and Authentication Failures
   - What: Security risk that appears when the application fails authenticating users action and permits automated attacks, brute force attacks, permits weak passwords, has missing or ineffective mfa, exposes session identifier in URL, reuse session identifiers, etc.
   - Example: Application has not enabled MFA and if the users are using simple passwords (even if they are needed to be changed, users will use just 2 or 3 passwords and the rotation will be the same), and in that way the attacker can exploit this
   - Prevention:
        - Enforce MFA
        - Use strong password complexity and rotation policies
   - Real scenario: User's simple passwords can be guessed by attackers and access their investment accounts

### A07 Identification and Authentication Failures Deep Dive
- Common Authentication Issues:
     - Weak Password Policy:
          - No complexity requirements
          - No length requirements
          - Common passwords allowed
     - Session Management Issues:
          - Session never expires
          - Session ID stored in URL
          - No session invalidation or logout
          - Sesion fixation attacks
     - Missing MFA
     - Credential Stuffing
          - Attackers use leaked passwords from other sites
          - No rate limiting = can try millions
     - Insecure Password Recovery
          - Security questions too easy
          - Password reset links don't expire
          - No verification

- Industry Best Practices:
     - Password requirements:
          - Minimum 8 characters
          - Uppercase, lowercase, number, special char all present
          - Block common passwords
          - Password history (cant reuse last 5)
     - Session/Token Management:
          - short-lived access tokens(15-30min)
          - Long lived refresh token
          - Store refresh tokens securely
     - Brute force prevention:
          - Rate limiting (max 5 login attempts, block 15 min)
          - Account lockout (after 10 failed attempts, lock 15 min)
          - CAPTCHA after 3 failed attempts
     - MFA
          - Something you know (password)
          - Something you have (phone, auth app)
          - Something you are (biometrics)



## A08 - Software and Data Integrity Failures
   - What: Security risk that happens when relying on untrusted and unsafe plugins and libraries. App trust external code without checking if its safe or authentic.
   - Example: Attackers compromise a trusted dependency you install or update it, unkowingly importing malicious code
   - Prevention: Verify integrity, use trusted resources
   - Real scenario: Broker invest app uses a library from an unsafe source.

## A09 - Security Logging and Monitoring Features
   - What: Security risk that happends due to insufficient security logging so you will not know when or if you're being attacked or if you already been breached.
   - Example: Login brute force not logged, logs stored locally can be easily deleted etc.
   - Prevention:
        - Store logs remotely
        - Log security events, acess attempts, input validation, failed ops etc.
        - Good Retention Policy
        - Don't log sensitive data
   - Real scenario: The broker invest app logging mechanism is not well made so an attacker can brute force the login mechanism.

## A10 - Server-Side Request Forgery (SSRF)
   - What: Security risk that happens when the app fetches an URL provided by the user and the attacker tricks the server into making requests to internal or protected systems instead of external ones
   - Example: Attacker sends requests to internal data/metadata
   - Prevention:
        - Input validation
        - Metadata protection
        - Restrict outbound traffic from servers that don't need it
        - Block private IPs
        - Allowlist only
   - Real scenario: Broker app is open to everyone
