describe('Direct Login Endpoint Testing (CRUD Validation)', () => {
  
  beforeEach(function () {
    // Loads your Master Data block file containing all user datasets
    cy.fixture('example').then((data) => {
      this.data = data;
    });
  });

  // Replicates Scenario 1: Real Validation at the Backend Level
  it('1. POST /api/verifyLogin — Direct Validation with Valid Credentials', function () {
    cy.request({
      method: 'POST',
      url: '/api/verifyLogin',
      form: true, // Matches standard x-www-form-urlencoded server layout
      failOnStatusCode: false
    , body: {
        email: this.data.loginUser.email,
        password: this.data.loginUser.password
      }
    }).then((response) => {
      // Assert HTTP Layer Handshake
      expect(response.status).to.eq(200);

      // Parse the real database payload response
      const bodyParsed = JSON.parse(response.body);

      // Verify server contract properties
      expect(bodyParsed).to.have.property('responseCode', 200);
      expect(bodyParsed).to.have.property('message', 'User exists!');
    });
  });

  // Replicates Scenario 2: Verification of Failed Credentials Logic
  it('2. POST /api/verifyLogin — Direct Validation with Invalid Credentials', function () {
    cy.request({
      method: 'POST',
      url: '/api/verifyLogin',
      form: true,
      failOnStatusCode: false,
      body: {
        email: this.data.invalidLoginUser.email,
        password: this.data.invalidLoginUser.password
      }
    }).then((response) => {
      expect(response.status).to.eq(200);

      const bodyParsed = JSON.parse(response.body);

      // Instead of relying on a mock, we verify the real backend engine rejects the data
      expect(bodyParsed).to.have.property('responseCode', 404);
      expect(bodyParsed).to.have.property('message', 'User not found!');
    });
  });

  // Replicates Scenario 3: Testing Missing Key Parameters (System Boundary Check)
  it('3. POST /api/verifyLogin — Negative Validation (Missing Password Field)', function () {
    cy.request({
      method: 'POST',
      url: '/api/verifyLogin',
      form: true,
      failOnStatusCode: false,
      body: {
        email: this.data.loginUser.email
        // Password parameter intentionally dropped to check server response boundaries
      }
    }).then((response) => {
      expect(response.status).to.eq(200);

      const bodyParsed = JSON.parse(response.body);
      
      // Verifies how your backend handles incomplete data objects
      expect(bodyParsed).to.have.property('responseCode', 400);
    });
  });
});